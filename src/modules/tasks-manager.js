import { manageProjects } from './projects-manager.js';
import { popupsManager } from './dom-integration/popup-forms.js';
import { domRenderTasks } from './dom-integration/render-tasks.js';
import { domRenderGeneralTabs } from './dom-integration/render-general-tabs.js';

const manageTasks = (() => {
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
    domRenderTasks.renderTasks(
      manageProjects.getProject(thisProjectId).getTasks(),
    );
    manageProjects.updateLocalStorage();
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
    manageProjects.updateLocalStorage();
  };
  // ! (NTH: prevent edit several tasks at the same time)
  // check if there is already a #edit-task-form id

  const toggleStateDoneTodo = (thisTask, thisProject, thisTabId) => {
    if (thisTask.getState() !== 'Done') {
      thisTask.setState(0); //set Done
    } else {
      thisTask.setState(2); // set Todo
    }
    manageProjects.updateLocalStorage();
    if (isNaN(Number(thisTabId))) {
      // if thisTabId is a general tab
      domRenderGeneralTabs.renderGeneralTabsTasks(thisTabId); // for re-filter the task-list
    } else {
      domRenderTasks.renderTasks(thisProject.getTasks());
    }
  };

  const deleteThisTask = (taskId, thisProject, thisTabId) => {
    // todo add confirm alert before delete
    thisProject.deleteTask(taskId);

    if (isNaN(Number(thisTabId))) {
      // if thisTabId is a general tab
      domRenderGeneralTabs.renderGeneralTabsTasks(thisTabId); // for re-filter the task-list
    } else {
      domRenderTasks.renderTasks(thisProject.getTasks());
    }
    manageProjects.updateLocalStorage();
  };

  return {
    createNewTaskFormSubmit,
    editTaskFormSubmit,
    toggleStateDoneTodo,
    deleteThisTask,
  };
})();

export { manageTasks };
