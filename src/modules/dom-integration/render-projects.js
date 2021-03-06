import { manageProjects } from '../projects-manager.js';
import { domForm } from './dom-elements.js';
import { domRenderTasks } from './render-tasks.js';
import { popupsManager, createPopup } from './popup-forms.js';
import { domRenderGeneralTabs } from './render-general-tabs';

const domRenderProjects = ((doc) => {
  const _projectsUl = doc.querySelector('#projects-tabs');
  const projectDetail = doc.querySelector('#project-detail');
  const _projectH2 = doc.querySelector('#project-title');
  const _projectDesc = doc.querySelector('#project-desc');
  const _newProjectBtn = document.querySelector('#new-project-btn');
  const _newTaskBtn = doc.querySelector('#new-task-btn');
  const _editProjectBtn = doc.querySelector('#edit-project-btn');
  const _deleteProjectBtn = doc.querySelector('#delete-project-btn');
  _newTaskBtn.style.visibility = 'hidden';
  _editProjectBtn.style.visibility = 'hidden';
  const _projectInfos = doc.querySelector('#project-infos');
  _deleteProjectBtn.style.visibility = 'hidden';

  _newProjectBtn.addEventListener('click', () => {
    const popup = createPopup.newProjectPopup();
    popupsManager.openPopup(popup);
  });

  _newTaskBtn.addEventListener('click', () => {
    const thisProjectId = projectDetail.dataset.projectId;
    const popup = createPopup.newTaskPopup(thisProjectId);
    popupsManager.openPopup(popup);
  });

  _deleteProjectBtn.addEventListener('click', () => {
    // todo add confirm alert before delete
    manageProjects.deleteProject(projectDetail.dataset.projectId);
  });

  const _renderEditProjectForm = () => {
    const thisProject = manageProjects.getProject(
      projectDetail.dataset.projectId,
    );
    // create inputs
    const editFormInputs = doc.createElement('fieldset');
    editFormInputs.setAttribute('id', 'edit-project-inputs');
    const editTitleInput = domForm.createTextInput(
      '',
      ['edit-project-title-label'],
      'edit-project-title',
      'edit-project-title',
      15,
      [],
    );
    editTitleInput.querySelector('input').value = thisProject.getTitle();
    const editDescTextarea = domForm.createTextarea(
      '',
      ['edit-project-desc-label'],
      'edit-project-desc',
      'edit-project-desc',
      100,
      [],
    );
    editDescTextarea.querySelector('textarea').value = thisProject.getDesc();
    editFormInputs.append(editTitleInput, editDescTextarea);
    // create form
    const editForm = domForm.createForm(
      'edit-project-form',
      [],
      '',
      ['round-btn', 'fa', 'fa-check'],
      editFormInputs,
    );
    editForm.addEventListener('submit', (e) => {
      manageProjects.editProjectFormSubmit(e, thisProject);
    });
    // replace current infos
    _projectInfos.replaceWith(editForm);
  };

  _editProjectBtn.addEventListener('click', _renderEditProjectForm);

  const renderProjectDetails = (projectOrGeneralTab, generalTabName) => {
    if (doc.querySelector('#edit-project-form')) {
      doc.querySelector('#edit-project-form').replaceWith(_projectInfos);
    }
    if (typeof projectOrGeneralTab === 'string') {
      let desc = '';
      switch (projectOrGeneralTab) {
        case 'all-tasks':
          desc =
            'All tasks whichever their date or state. Past and soon tasks are on top.';
          break;
        case 'today':
          desc = 'All tasks that need to be done today.';
          break;
        case 'this-week':
          desc = 'All tasks that need to be done this week.';
          break;
        case 'late':
          desc = 'All tasks that are not done and their due date is past.';
          break;
        case 'high-priority':
          desc =
            'All tasks that has a high priority. Past and soon tasks are on top.';
          break;
        case 'medium-priority':
          desc =
            'All tasks that has a medium priority. Past and soon tasks are on top.';
          break;
        case 'low-priority':
          desc =
            'All tasks that has a low priority. Past and soon tasks are on top.';
          break;
        case 'done':
          desc = 'All tasks that are done. Past and soon tasks are on top.';
          break;
        case 'wip':
          desc =
            'All tasks that are in progress. Past and soon tasks are on top.';
          break;
        case 'abandoned':
          desc =
            'All tasks that are abandoned. Past and soon tasks are on top.';
          break;
      }
      _projectH2.textContent = generalTabName;
      _projectDesc.textContent = desc;
      projectDetail.setAttribute('data-project-id', projectOrGeneralTab);
      _newTaskBtn.style.visibility = 'hidden';
      _editProjectBtn.style.visibility = 'hidden';
      _deleteProjectBtn.style.visibility = 'hidden';
    } else {
      _projectH2.textContent = projectOrGeneralTab.getTitle();
      _projectDesc.textContent = projectOrGeneralTab.getDesc();
      const projId = manageProjects.getProjectId(projectOrGeneralTab);
      projectDetail.setAttribute('data-project-id', projId);
      _newTaskBtn.style.visibility = 'visible';
      _editProjectBtn.style.visibility = 'visible';
      _deleteProjectBtn.style.visibility = 'visible';
    }
  };

  const renderProjectsTabs = (projects) => {
    const projectsLi = projects.map((project) => {
      const li = doc.createElement('li');
      li.classList.add('tabs', 'project-tab');
      li.textContent = project.getTitle();
      return li;
    });
    projectsLi.map((projLi, projId) =>
      projLi.addEventListener('click', (e) => {
        const thisProject = projects[projId];
        domRenderGeneralTabs.removeTabsSelectState();
        e.target.classList.add('selected');
        const thisProjectTasks = thisProject.getTasks();
        // close all tasks for this project
        thisProjectTasks.forEach((task) => task.setIsExpand(false));
        renderProjectDetails(thisProject);
        domRenderTasks.renderTasks(thisProject.getTasks());
      }),
    );
    while (_projectsUl.firstChild) {
      _projectsUl.removeChild(_projectsUl.firstChild);
    }
    projectsLi.map((projLi) => {
      _projectsUl.appendChild(projLi);
    });
  };

  return { renderProjectsTabs, renderProjectDetails };
})(document);

export { domRenderProjects };
