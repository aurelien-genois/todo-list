import {manageProjects} from './projects-manager.js'
import {domForm} from './dom-elements.js'
import {popupsManager, createPopup} from './popup-forms.js'
import { format, isToday, isThisWeek, isPast} from 'date-fns'

const domRenderTasks = ((doc) => {
    const _tasksUl = doc.querySelector('#tasks-list');
    const _projectDetail = doc.querySelector('#project-detail');

    const _renderEditTaskForm = (thisProject, thisTask, taskLi, mainInfosDiv, expandDiv) => {
        // create inputs
        // mainInfos fieldset
        const editMainInfos = doc.createElement('fieldset');
        editMainInfos.setAttribute('id','edit-task-main-infos');
        // Title
        const editTitleInput = domForm.createTextInput('',[],'edit-task-title', 'edit-task-title', 15,  []);
        editTitleInput.querySelector('input').value = thisTask.getTitle();
        // DateState fieldset
        const editDateState = doc.createElement('fieldset');
        editDateState.setAttribute('id','edit-task-date-state');
        // Date
        const editDateInput = domForm.createDateInput('',[],'edit-task-duedate', 'edit-task-duedate',[]);
        editDateInput.querySelector('input').value = format(thisTask.getDueDate(), 'yyyy-MM-dd');
        // States
        const editStateDoneOption = domForm.createSelectOption(0, 'Done',[]);
        const editStateWipOption = domForm.createSelectOption(1, 'WIP', []);
        const editStateTodoOpion = domForm.createSelectOption(2,'Todo',[]);
        const editStateAbandonedOpion = domForm.createSelectOption(3,'Abandoned', []);
        const stateOptions = [editStateDoneOption,editStateWipOption,editStateTodoOpion,editStateAbandonedOpion];
        stateOptions.map(option =>{ 
            if (option.textContent === thisTask.getState()) {
                option.selected = true;
            }
        });
        const editStateSelect = domForm.createSelect('',[],'edit-task-state','edit-task-state',stateOptions, []);
        // mainInfos hierachy
        editDateState.append(editDateInput, editStateSelect)
        editMainInfos.append(editTitleInput, editDateState);
        // expand div
        const editExpandDiv = doc.createElement('div');
        editExpandDiv.setAttribute('id','edit-task-expand');
        // details fieldset
        const editDetails = doc.createElement('fieldset');
        editDetails.setAttribute('id','edit-task-details');
        // PriorityRadios
        const priority3Input = domForm.createRadio('Low', [], 'edit-task-priority3', 'temp',3, ['edit-inputs-radio']);
        const priority2Input = domForm.createRadio('Medium', [], 'edit-task-priority2', 'temp',2, ['edit-inputs-radio']);
        const priority1Input = domForm.createRadio('High', [], 'edit-task-priority1', 'temp', 1, ['edit-inputs-radio']);
        const priorityRadios = [priority3Input, priority2Input, priority1Input];
        priorityRadios.map(radio =>{ 
            if (radio.textContent === thisTask.getPriority()) {
                radio.querySelector
                ('input').checked = true;
            };
        });
        const prioritiesFieldset = domForm.createRadioFieldset('Priority:',['edit-labels'],'edit-task-priority','edit-task-priority',priorityRadios, ['edit-inputs']);
        // desc
        const editDescTextarea = domForm.createTextInput('',[],'edit-task-desc','edit-task-desc',25, []);
        editDescTextarea.querySelector('input').value = thisTask.getDesc();
        // expand div hierachy
        editDetails.append(prioritiesFieldset,editDescTextarea);
        editExpandDiv.append(editDetails);
        // create form
        const editForm = domForm.createForm('edit-task-form',[],'OK',['round-btn'],[editMainInfos,editExpandDiv]);
        editForm.addEventListener('submit', (e) => {
            const thisTabId = _projectDetail.dataset.projectId;
            manageProjects.editTaskFormSubmit(e, thisTask, thisProject, thisTabId);
        });
        
        // replace current infos
        taskLi.removeChild(mainInfosDiv);
        taskLi.removeChild(expandDiv);
        taskLi.append(editForm);
    }

    // ! move this function out of dom-integration
    const _toggleStateDoneTodo = (thisTask, thisProject) => {
        const thisTabId = _projectDetail.dataset.projectId;
        if (thisTask.getState() !== 'Done') {
            thisTask.setState(0); //set Done
        } else {
            thisTask.setState(2); // set Todo
        };
        domRenderProjects.updateLocalStorage();
        if (isNaN(Number(thisTabId))) { // if thisTabId is a general tab
            domRenderGeneralTabs.renderGeneralTabsTasks(thisTabId); // for re-filter the task-list
        } else {
            renderTasks(thisProject.getTasks());
        }

    };

        // ! move this function out of dom-integration
    const _deleteThisTask = (taskId, thisProject) => {
        const thisTabId = _projectDetail.dataset.projectId;
        thisProject.deleteTask(taskId);

        if (isNaN(Number(thisTabId))) { // if thisTabId is a general tab
            domRenderGeneralTabs.renderGeneralTabsTasks(thisTabId); // for re-filter the task-list
        } else {
            domRenderTasks.renderTasks(thisProject.getTasks());
        }
        domRenderProjects.updateLocalStorage();
    }

    const _toggleExpandDetails = (thisBtn,li, expandDiv) => {
        if(li.querySelector('.task-expand')) {
            li.removeChild(expandDiv);
            thisBtn.textContent = 'V';
        } else {
            li.append(expandDiv);
            thisBtn.textContent = 'A';
        }
    }

    const _createTaskLi = (title, dueDate, priority, state, desc, projId,taskId) => {
        const thisProject = manageProjects.getProject(projId);
        const thisTask = thisProject.getTask(taskId);

        const li = doc.createElement('li');
        li.classList.add('tasks');
        li.setAttribute('data-task-id', taskId);        
        li.setAttribute('data-project-id', projId);        
        const checkState = doc.createElement('input');
        checkState.type = 'checkbox';
        checkState.id = 'task-check-state';
        if(thisTask.getState() === 'Done') {
            checkState.checked = true;
        }
        checkState.addEventListener('change', _toggleStateDoneTodo.bind(this, thisTask, thisProject));

        const titleH4 = doc.createElement('h3');
        titleH4.textContent = title;
        titleH4.classList.add('task-title');
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
        expandBtn.textContent = 'V';
        infoDiv.append(dueDateP, stateP, expandBtn);

        const mainInfosDiv = doc.createElement('div');
        mainInfosDiv.classList.add('task-main-infos');
        mainInfosDiv.append(checkState, titleH4, infoDiv);
        
        const expandDiv = doc.createElement('div');
        expandDiv.classList.add('task-expand');

        expandBtn.addEventListener('click', (e) => {
            _toggleExpandDetails(e.target, li, expandDiv)
        });
        
        const detailsDiv = doc.createElement('div');
        detailsDiv.classList.add('task-details');
        const priorityP = doc.createElement('p');
        priorityP.classList.add('task-priority');
        priorityP.textContent = priority;
        const descP = doc.createElement('p');
        descP.classList.add('task-desc');
        descP.textContent = desc;
        detailsDiv.append(priorityP, descP);
        // NTH show the task's project name

        const actionsDiv = doc.createElement('div');
        actionsDiv.classList.add('task-actions');
        const editTaskBtn = doc.createElement('button');
        editTaskBtn.classList.add('edit-task-btn', 'round-btn');
        editTaskBtn.textContent = '/';
        editTaskBtn.addEventListener('click', () => {
            _renderEditTaskForm(thisProject, thisTask, li,mainInfosDiv, expandDiv);
        });
        const deleteBtn = doc.createElement('button');
        deleteBtn.classList.add('round-btn', 'delete-task-btn');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', _deleteThisTask.bind(this,taskId, thisProject));
        actionsDiv.append(editTaskBtn, deleteBtn);

        expandDiv.append(detailsDiv, actionsDiv);

        li.append(mainInfosDiv);
        
        return li;
    }
    
    const renderTasks = (projectTasks) => {
        // DATE: sort projectTasks by date (more recent)
        const sortedByDateTasks = projectTasks.sort((a,b) => b.getDueDate() - a.getDueDate());
        const tasksLis = sortedByDateTasks.map(task => {
            const taskProject = manageProjects.getProject(task.getProjectId());
            // get the id of the task in its project
            const taskIdInProject = taskProject.getTaskId(task);
            const taskLi = _createTaskLi(task.getTitle(), task.getDueDateFormat(), task.getPriority(), task.getState(), task.getDesc(),task.getProjectId(),taskIdInProject);

            if (isToday(task.getDueDate()) && task.getState() !== 'Done') {
                taskLi.classList.add('today-tasks');
            }
            if(isPast(task.getDueDate()) && task.getState() !== 'Done') {
                taskLi.classList.add('late-tasks');
            }
            if (task.getState() === 'Abandoned') {
                taskLi.classList.add('abandoned-tasks');
            }
            if (task.getState() === 'Done') {
                taskLi.classList.add('done-tasks');
            }

            return taskLi;
        });
        while(_tasksUl.firstChild) {
            _tasksUl.removeChild(_tasksUl.firstChild);
        };
        tasksLis.map(taskLi => {
            _tasksUl.appendChild(taskLi);
        }); 
    }

    return {renderTasks};
})(document);

const domRenderProjects = ((doc) => {
        const _projectsUl = doc.querySelector('#projects-tabs');
        const projectDetail = doc.querySelector('#project-detail');
        const _projectH2 = doc.querySelector('#project-title');
        const _projectDesc = doc.querySelector('#project-desc');
        const _newProjectBtn = document.querySelector('#new-project-btn');
        const _newTaskBtn = doc.querySelector('#new-task-btn');
        const _editProjectBtn = doc.querySelector('#edit-project-btn');
        const _deleteProjectBtn = doc.querySelector('#delete-project-btn');
        _newTaskBtn.style.visibility = "hidden";
        _editProjectBtn.style.visibility = "hidden";
        const _projectInfos = doc.querySelector('#project-infos');
        _deleteProjectBtn.style.visibility = "hidden";

        _newProjectBtn.addEventListener('click', popupsManager.openPopup.bind(this,createPopup.newProjectPopup()));

        _newTaskBtn.addEventListener('click', () => {
            const thisProjectId = projectDetail.dataset.projectId;
            const popup = createPopup.newTaskPopup(thisProjectId);
            popupsManager.openPopup(popup);
        });

        const renderProjectDetails = (projectOrGeneralTab, generalTabName) => {
            if(doc.querySelector('#edit-project-form')) {
                doc.querySelector('#edit-project-form').replaceWith(_projectInfos);
            } 
            if (typeof projectOrGeneralTab === 'string') {
                _projectH2.textContent = generalTabName;
                _projectDesc.textContent = '';
                projectDetail.setAttribute('data-project-id', projectOrGeneralTab);
                _newTaskBtn.style.visibility = "hidden";
                _editProjectBtn.style.visibility = "hidden";
                _deleteProjectBtn.style.visibility = "hidden";    
            } else {
                _projectH2.textContent = projectOrGeneralTab.getTitle();
                _projectDesc.textContent = projectOrGeneralTab.getDesc();
                const projId = manageProjects.getProjectId(projectOrGeneralTab);
                projectDetail.setAttribute('data-project-id', projId);
                _newTaskBtn.style.visibility = "visible";
                _editProjectBtn.style.visibility = "visible";
                _deleteProjectBtn.style.visibility = "visible";
            }
        }
        const renderProjectsTabs = (projects) => { 
            const projectsLi = projects.map(project => {
                const li = doc.createElement('li');
                li.classList.add('tabs', 'project-tab');
                li.textContent = project.getTitle();
                return li;
            });
            projectsLi.map((projLi, projId) => projLi.addEventListener('click', () => {
                    const thisProject = projects[projId];
                    domRenderTasks.renderTasks(thisProject.getTasks());
                    renderProjectDetails(thisProject);
                }));     
            while(_projectsUl.firstChild) {
                _projectsUl.removeChild(_projectsUl.firstChild);
            };
            projectsLi.map(projLi => {
                _projectsUl.appendChild(projLi);
            }); 
        }
    
        const _renderEditProjectForm = () => {
            const thisProject = manageProjects.getProject(projectDetail.dataset.projectId);
            // create inputs
            const editFormInputs = doc.createElement('fieldset');
            editFormInputs.setAttribute('id', 'edit-project-inputs');
            const editTitleInput = domForm.createTextInput('',[],'edit-project-title', 'edit-project-title',20, []);
            editTitleInput.querySelector('input').value =thisProject.getTitle();
            const editDescTextarea = domForm.createTextarea('',[],'edit-project-desc','edit-project-desc', 100, []);
            editDescTextarea.querySelector('textarea').value = thisProject.getDesc();
            editFormInputs.append(editTitleInput, editDescTextarea);
            // create form
            const editForm = domForm.createForm('edit-project-form',[],'OK',['round-btn'],editFormInputs);
            editForm.addEventListener('submit', (e) => {
                manageProjects.editProjectFormSubmit(e, thisProject);
            });
            // replace current infos
            _projectInfos.replaceWith(editForm);
        };
            
        _editProjectBtn.addEventListener('click', _renderEditProjectForm);

        _deleteProjectBtn.addEventListener('click', () => {
            const thisProject = manageProjects.getProject(projectDetail.dataset.projectId);
            manageProjects.deleteProject(thisProject);
        });

        const updateLocalStorage = () => {
            localStorage.setItem('projects', JSON.stringify(manageProjects.getProjects()));
        }
            
        return {renderProjectsTabs,renderProjectDetails, updateLocalStorage};
})(document)

const domRenderGeneralTabs = ((doc) => {
    const initPageLoadTasks = () => {
        let allTasks = manageProjects.getAllTasks();
        domRenderTasks.renderTasks(allTasks);                  
    };
    
    const renderGeneralTabsTasks = (tabId) => {
        let allTasks =  manageProjects.getAllTasks();
        let allTasksFiltered = [];
        switch(tabId) {
            case 'today':
                // DATE: select task where date = today
                allTasksFiltered = allTasks.filter(task => isToday(task.getDueDate()));
                break;
            case 'this-week':
                // DATE: select task where date = this week
                allTasksFiltered = allTasks.filter(task => isThisWeek(task.getDueDate()));
                break;
            case 'high-priority':
                    allTasksFiltered = allTasks.filter(task => task.getPriority() === 'High');
                break;
            case 'all-tasks':
                allTasksFiltered = [...allTasks];
        }
        domRenderTasks.renderTasks(allTasksFiltered);       
    }
    
    const _generalTabsLis = [...doc.querySelector('#general-tabs').children];
    _generalTabsLis.map(genTab => genTab.addEventListener('click', (e) => {
        const whichTab = e.target.dataset.tab;
        const tabTitle = e.target.textContent;
        //NTH project desc for general tabs
        renderGeneralTabsTasks(whichTab);
        domRenderProjects.renderProjectDetails(whichTab, tabTitle);
    }));
           
    return {initPageLoadTasks, renderGeneralTabsTasks};
})(document);

export {
    domRenderTasks,
    domRenderProjects,
    domRenderGeneralTabs
}