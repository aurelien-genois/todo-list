import { project } from './projects-class.js';
import { popupsManager } from './popup-forms.js';
import {
  domRenderTasks,
  domRenderProjects,
  domRenderGeneralTabs,
} from './dom-integration.js';

const manageProjects = (() => {
  let _projects = [];

  const createProject = (title, desc) => {
    const newProject = project(title, desc);
    _projects.push(newProject);
    domRenderProjects.renderProjectsTabs(_projects);
    domRenderProjects.updateLocalStorage();
    return newProject;
  };

  const setProjects = (projects) => {
    _projects = [...projects];
  };

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
    domRenderTasks.renderTasks(project.getTasks());
    e.preventDefault();
    domRenderProjects.updateLocalStorage();
    popupsManager.closePopup(popup);
  };
  const editProjectFormSubmit = (e, project) => {
    const { titleValue, descValue } = _getNewProjectValues(e.target);
    project.setTitle(titleValue);
    project.setDesc(descValue);
    domRenderProjects.renderProjectDetails(project);
    domRenderProjects.renderProjectsTabs(_projects);
    e.preventDefault();
    domRenderProjects.updateLocalStorage();
  };

  // Task Forms Submit
  const _getNewTaskValues = (form) => {
    const data = new FormData(form);
    let titleValue, dueDateValue, priorityValue, descValue, stateValue;
    for (const entry of data) {
      // get values
      switch (entry[0]) {
        case 'new-task-title':
        case 'edit-task-title':
          titleValue = entry[1];
          break;
        case 'new-task-duedate':
        case 'edit-task-duedate':
          dueDateValue = entry[1];
          break;
        case 'new-task-priority':
        case 'edit-task-priority':
          priorityValue = entry[1];
          break;
        case 'new-task-desc':
        case 'edit-task-desc':
          descValue = entry[1];
          break;
        case 'edit-task-state':
          stateValue = entry[1];
          break;
      }
    }
    form.reset(); // reset form
    return { titleValue, dueDateValue, priorityValue, descValue, stateValue };
  };
  const createNewTaskFormSubmit = (e, popup, thisProjectId) => {
    const {
      titleValue,
      dueDateValue,
      priorityValue,
      descValue,
    } = _getNewTaskValues(e.target);
    manageProjects
      .getProject(thisProjectId)
      .createTask(
        titleValue,
        new Date(dueDateValue),
        priorityValue || 3,
        descValue,
        thisProjectId,
      );
    e.preventDefault();
    domRenderProjects.updateLocalStorage();
    popupsManager.closePopup(popup);
  };
  const editTaskFormSubmit = (e, task, project, tabId) => {
    const {
      titleValue,
      dueDateValue,
      priorityValue,
      descValue,
      stateValue,
    } = _getNewTaskValues(e.target);
    task.setTitle(titleValue);
    task.setDesc(descValue);
    task.setDueDate(new Date(dueDateValue));
    task.setPriority(priorityValue);
    task.setState(stateValue);
    if (isNaN(Number(tabId))) {
      // if thisTabId is a general tab
      domRenderGeneralTabs.renderGeneralTabsTasks(tabId); // for re-filter the task-list
    } else {
      domRenderTasks.renderTasks(project.getTasks());
    }
    e.preventDefault();
    domRenderProjects.updateLocalStorage();
  };
  // (NTH: prevent edit several tasks at the same time)

  const deleteProject = (projectSelected) => {
    const projectId = _projects.indexOf(projectSelected);
    _projects.splice(projectId, 1);
    // update the tasks' projectId for project greater than the project deleted
    const greaterProjects = _projects.filter((project, id) => id >= projectId);
    greaterProjects.map((project) => {
      project.getTasks().map((task) => {
        task.setProjectId(task.getProjectId() - 1);
      });
    });
    domRenderProjects.renderProjectsTabs(_projects);
    domRenderGeneralTabs.initPageLoadTasks();
    domRenderProjects.renderProjectDetails('all-tasks', 'All tasks');
    domRenderProjects.updateLocalStorage();
    return projectSelected;
  };

  // getters
  const getProjects = () => _projects;
  const getProject = (projectId) => {
    return _projects[projectId];
  };
  const getProjectId = (project) => {
    return _projects.indexOf(project);
  };
  const getAllTasks = () =>
    _projects.reduce((tasks, proj) => {
      return tasks.concat(proj.getTasks());
    }, []);

  return {
    createProject,
    setProjects,
    createNewProjectFormSubmit,
    editProjectFormSubmit,
    deleteProject,
    createNewTaskFormSubmit,
    editTaskFormSubmit,
    getProjects,
    getProject,
    getAllTasks,
    getProjectId,
  };
})();

export { manageProjects };