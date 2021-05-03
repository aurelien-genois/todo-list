import { project } from './projects-class.js';
import { popupsManager } from './dom-integration/popup-forms.js';
import { domRenderTasks } from './dom-integration/render-tasks.js';
import { domRenderProjects } from './dom-integration/render-projects.js';
import { domRenderGeneralTabs } from './dom-integration/render-general-tabs.js';

const manageProjects = (() => {
  let _projects = [];

  const createProject = (title, desc) => {
    const newProject = project(title, desc);
    _projects.push(newProject);
    return newProject;
  };
  const deleteProject = (projectId) => {
    let confirmRemove = confirm(
      `Are you sure you want to remove the project "${getProject(
        projectId,
      ).getTitle()}"?\nThis will remove all its tasks too.`,
    );
    if (confirmRemove) {
      _projects.splice(projectId, 1);
      // update the tasks' projectId for project greater than the project deleted
      const greaterProjects = _projects.filter(
        (project, id) => id >= projectId,
      );
      greaterProjects.map((project) => {
        project.getTasks().map((task) => {
          task.setProjectId(task.getProjectId() - 1);
        });
      });
      domRenderProjects.renderProjectsTabs(_projects);
      domRenderGeneralTabs.initPageLoadTasks();
      domRenderProjects.renderProjectDetails('all-tasks', 'All tasks');
      updateLocalStorage();
      return getProject(projectId);
    }
  };
  const setProjects = (projects) => {
    _projects = [...projects];
  };

  // getters
  const getProjects = () => _projects;
  const getProject = (projectId) => {
    return _projects[projectId];
  };
  const getProjectId = (project) => {
    return _projects.indexOf(project);
  };
  const getAllProjectsTasks = () =>
    _projects.reduce((tasks, proj) => {
      return tasks.concat(proj.getTasks());
    }, []);

  // Project Forms Submit
  const _getNewProjectValues = (form) => {
    const data = new FormData(form);
    let titleValue, descValue;
    for (const entry of data) {
      switch (entry[0]) {
        case 'new-project-title':
        case 'edit-project-title':
          titleValue = entry[1];
          break;
        case 'new-project-desc':
        case 'edit-project-desc':
          descValue = entry[1];
          break;
      }
    }
    form.reset(); // reset form
    return { titleValue, descValue };
  };
  const createNewProjectFormSubmit = (e, popup) => {
    const { titleValue, descValue } = _getNewProjectValues(e.target);
    const project = createProject(titleValue, descValue);
    domRenderProjects.renderProjectDetails(project);
    domRenderProjects.renderProjectsTabs(_projects);
    domRenderTasks.renderTasks(project.getTasks());
    e.preventDefault();
    updateLocalStorage();
    popupsManager.closePopup(popup);
  };
  const editProjectFormSubmit = (e, project) => {
    const { titleValue, descValue } = _getNewProjectValues(e.target);
    project.setTitle(titleValue);
    project.setDesc(descValue);
    domRenderProjects.renderProjectDetails(project);
    domRenderProjects.renderProjectsTabs(_projects);
    e.preventDefault();
    updateLocalStorage();
  };

  // LocalStorage
  const updateLocalStorage = () => {
    localStorage.setItem(
      'projects',
      JSON.stringify(manageProjects.getProjects()),
    );
  };

  return {
    createProject,
    deleteProject,
    setProjects,
    getProjects,
    getProject,
    getProjectId,
    getAllProjectsTasks,
    createNewProjectFormSubmit,
    editProjectFormSubmit,
    updateLocalStorage,
  };
})();

export { manageProjects };
