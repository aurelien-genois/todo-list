import { manageProjects } from '../projects-manager.js';
import { manageTasks } from '../tasks-manager.js';
import { domForm } from './dom-elements.js';
import { format, isToday, isPast } from 'date-fns';

const domRenderTasks = ((doc) => {
  const _tasksUl = doc.querySelector('#tasks-list');
  const _projectDetail = doc.querySelector('#project-detail');

  const _renderEditTaskForm = (
    thisProject,
    thisTask,
    taskLi,
    mainInfosDiv,
    expandDiv,
  ) => {
    if (doc.querySelector('#edit-task-form') != null) {
      alert('You can edit only one task at a time!');
      return;
    }
    // create inputs
    // mainInfos fieldset
    const editMainInfos = doc.createElement('fieldset');
    editMainInfos.setAttribute('id', 'edit-task-main-infos');
    // Title
    const editTitleInput = domForm.createTextInput(
      '',
      [],
      'edit-task-title',
      'edit-task-title',
      15,
      [],
    );
    editTitleInput.querySelector('input').value = thisTask.getTitle();
    // DateState fieldset
    const editDateState = doc.createElement('fieldset');
    editDateState.classList.add('edit-task-date-state-fs');
    // Date
    const editDateInput = domForm.createDateInput(
      '',
      ['edit-task-duedate-label'],
      'edit-task-duedate',
      'edit-task-duedate',
      [],
    );
    editDateInput.querySelector('input').value = format(
      thisTask.getDueDate(),
      'yyyy-MM-dd',
    );
    // States
    const editStateDoneOption = domForm.createSelectOption(0, 'Done', []);
    const editStateWipOption = domForm.createSelectOption(1, 'WIP', []);
    const editStateTodoOpion = domForm.createSelectOption(2, 'Todo', []);
    const editStateAbandonedOpion = domForm.createSelectOption(
      3,
      'Abandoned',
      [],
    );
    const stateOptions = [
      editStateDoneOption,
      editStateWipOption,
      editStateTodoOpion,
      editStateAbandonedOpion,
    ];
    stateOptions.map((option) => {
      if (option.textContent === thisTask.getState()) {
        option.selected = true;
      }
    });
    const editStateSelect = domForm.createSelect(
      '',
      ['edit-task-state-label'],
      'edit-task-state',
      'edit-task-state',
      stateOptions,
      [],
    );
    // mainInfos hierachy
    editDateState.append(editDateInput, editStateSelect);
    editMainInfos.append(editTitleInput, editDateState);
    // expand div
    const editExpandDiv = doc.createElement('div');
    editExpandDiv.setAttribute('id', 'edit-task-expand');
    // details fieldset
    const editDetails = doc.createElement('fieldset');
    editDetails.setAttribute('id', 'edit-task-details');
    // PriorityRadios
    const priority3Input = domForm.createRadio(
      'Low',
      [],
      'edit-task-priority3',
      'temp',
      3,
      ['edit-inputs-radio'],
    );
    const priority2Input = domForm.createRadio(
      'Medium',
      [],
      'edit-task-priority2',
      'temp',
      2,
      ['edit-inputs-radio'],
    );
    const priority1Input = domForm.createRadio(
      'High',
      [],
      'edit-task-priority1',
      'temp',
      1,
      ['edit-inputs-radio'],
    );
    const priorityRadios = [priority3Input, priority2Input, priority1Input];
    priorityRadios.map((radio) => {
      if (radio.textContent === thisTask.getPriority()) {
        radio.querySelector('input').checked = true;
      }
    });
    const prioritiesFieldset = domForm.createRadioFieldset(
      'Priority:',
      ['edit-task-priority-labels'],
      'edit-task-priority',
      'edit-task-priority',
      priorityRadios,
      ['edit-inputs'],
    );
    // desc
    const editDescTextarea = domForm.createTextarea(
      '',
      ['edit-task-desc-label'],
      'edit-task-desc',
      'edit-task-desc',
      100,
      [],
    );
    editDescTextarea.querySelector('textarea').value = thisTask.getDesc();
    // expand div hierachy
    editDetails.append(prioritiesFieldset, editDescTextarea);
    editExpandDiv.append(editDetails);
    // create form
    const editForm = domForm.createForm(
      'edit-task-form',
      [],
      '',
      ['round-btn', 'fa', 'fa-check'],
      [editMainInfos, editExpandDiv],
    );
    editForm.addEventListener('submit', (e) => {
      const thisTabId = _projectDetail.dataset.projectId;
      manageTasks.editTaskFormSubmit(e, thisTask, thisProject, thisTabId);
    });

    // replace current infos
    taskLi.removeChild(mainInfosDiv);
    taskLi.removeChild(expandDiv);
    taskLi.append(editForm);
  };

  const _toggleExpandDetails = (thisBtn, li, expandDiv, task) => {
    if (task.isExpand()) {
      task.setIsExpand(false);
      li.classList.remove('expanded');
      li.removeChild(expandDiv);
      thisBtn.classList.add('fa-arrow-circle-down');
      thisBtn.classList.remove('fa-arrow-circle-up');
    } else {
      task.setIsExpand(true);
      li.classList.add('expanded');
      setTimeout(() => {
        li.append(expandDiv);
      }, 500);
      thisBtn.classList.add('fa-arrow-circle-up');
      thisBtn.classList.remove('fa-arrow-circle-down');
    }
  };

  const _createTaskLi = (
    title,
    dueDate,
    priority,
    state,
    desc,
    projId,
    taskId,
    isExpand,
  ) => {
    const thisProject = manageProjects.getProject(projId);
    const thisTask = thisProject.getTask(taskId);

    const li = doc.createElement('li');
    li.classList.add('tasks');
    li.setAttribute('data-task-id', taskId);
    li.setAttribute('data-project-id', projId);
    const checkState = doc.createElement('input');
    checkState.type = 'checkbox';
    checkState.classList.add('task-check-state');
    if (thisTask.getState() === 'Done') {
      checkState.checked = true;
    }
    checkState.addEventListener(
      'change',
      manageTasks.toggleStateDoneTodo.bind(
        this,
        thisTask,
        thisProject,
        _projectDetail.dataset.projectId,
      ),
    );

    const titleH4 = doc.createElement('h3');
    titleH4.textContent = title;
    titleH4.classList.add('task-title');
    const spanExclamation = doc.createElement('span');
    spanExclamation.classList.add(
      'task-exclamation',
      'fa',
      'fa-exclamation-circle',
    );
    titleH4.append(spanExclamation);

    const infoDiv = doc.createElement('div');
    infoDiv.classList.add('task-infos');
    const dueDateP = doc.createElement('p');
    dueDateP.classList.add('task-duedate');
    dueDateP.textContent = dueDate;
    const stateP = doc.createElement('p');
    stateP.classList.add('task-state');
    stateP.textContent = state;
    const expandBtn = doc.createElement('button');
    expandBtn.classList.add('task-expand-btn');
    expandBtn.classList.add('fa', 'fa-arrow-circle-down');
    infoDiv.append(dueDateP, stateP, expandBtn);

    const mainInfosDiv = doc.createElement('div');
    mainInfosDiv.classList.add('task-main-infos');
    mainInfosDiv.append(checkState, titleH4, infoDiv);

    const expandDiv = doc.createElement('div');
    expandDiv.classList.add('task-expand');

    expandBtn.addEventListener('click', (e) => {
      _toggleExpandDetails(e.target, li, expandDiv, thisTask);
    });

    const detailsDiv = doc.createElement('div');
    detailsDiv.classList.add('task-details');
    const priorityP = doc.createElement('p');
    priorityP.classList.add('task-priority');
    priorityP.textContent = `Priority: ${priority}`;
    const descP = doc.createElement('p');
    descP.classList.add('task-desc');
    descP.textContent = desc;
    detailsDiv.append(priorityP, descP);
    // NTH show the task's project name

    const actionsDiv = doc.createElement('div');
    actionsDiv.classList.add('task-actions');
    const editTaskBtn = doc.createElement('button');
    editTaskBtn.classList.add('edit-task-btn', 'round-btn', 'fa', 'fa-pen');
    editTaskBtn.addEventListener('click', () => {
      _renderEditTaskForm(thisProject, thisTask, li, mainInfosDiv, expandDiv);
    });
    const deleteBtn = doc.createElement('button');
    deleteBtn.classList.add('round-btn', 'delete-task-btn', 'fa', 'fa-trash');
    deleteBtn.addEventListener(
      'click',
      manageTasks.deleteThisTask.bind(
        this,
        taskId,
        thisProject,
        _projectDetail.dataset.projectId,
      ),
    );
    actionsDiv.append(editTaskBtn, deleteBtn);

    expandDiv.append(detailsDiv, actionsDiv);

    li.append(mainInfosDiv);
    // if was expand before, keep it expand
    if (isExpand) {
      li.append(expandDiv);
      li.classList.add('expanded');
      expandBtn.classList.add('fa-arrow-circle-up');
      expandBtn.classList.remove('fa-arrow-circle-down');
    }

    return li;
  };

  const renderTasks = (projectTasks) => {
    const sortedByDateTasks = projectTasks.sort(
      (a, b) => b.getDueDate() - a.getDueDate(),
    );
    const tasksLis = sortedByDateTasks.map((task) => {
      const taskProject = manageProjects.getProject(task.getProjectId());
      // get the id of the task in its project
      const taskIdInProject = taskProject.getTaskId(task);
      const taskLi = _createTaskLi(
        task.getTitle(),
        task.getDueDateFormat(),
        task.getPriority(),
        task.getState(),
        task.getDesc(),
        task.getProjectId(),
        taskIdInProject,
        task.isExpand(),
      );

      task.getState() === 'Abandoned'
        ? taskLi.classList.add('abandoned-tasks')
        : task.getState() === 'Done'
        ? taskLi.classList.add('done-tasks')
        : isToday(task.getDueDate())
        ? taskLi.classList.add('today-tasks')
        : isPast(task.getDueDate())
        ? taskLi.classList.add('late-tasks')
        : '';

      return taskLi;
    });
    while (_tasksUl.firstChild) {
      _tasksUl.removeChild(_tasksUl.firstChild);
    }
    tasksLis.map((taskLi) => {
      _tasksUl.appendChild(taskLi);
    });
  };

  return { renderTasks };
})(document);

export { domRenderTasks };
