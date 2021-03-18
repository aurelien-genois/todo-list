import {manageProjects} from './projects-manager.js'
import {dom} from './dom-elements.js'
import {popupsManager, createPopup} from './popup-forms.js'


const domRenderTasks = ((doc) => {
    // Render TASKS
    const _tasksUl = doc.querySelector('#tasks-list');
    const projectDetail = doc.querySelector('#project-detail');

    const _createTaskLi = (title, dueDate, priority, state, desc, projId,taskId) => {
        const li = doc.createElement('li');
        li.classList.add('tasks');
        li.setAttribute('data-task-id', taskId);        
        li.setAttribute('data-project-id', projId);        

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

        expandBtn.addEventListener('click', () => {
            if(li.querySelector('.task-expand')) {
                li.removeChild(expandDiv);
                expandBtn.textContent = 'V';
            } else {
                li.append(expandDiv);
                expandBtn.textContent = 'A';
            }
    
        });

        const mainInfosDiv = doc.createElement('div');
        mainInfosDiv.classList.add('task-main-infos');
        mainInfosDiv.append(titleH4, infoDiv);

        const expandDiv = doc.createElement('div');
        expandDiv.classList.add('task-expand');

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
            renderEditTaskForm(projId, taskId, li,mainInfosDiv, expandDiv);
        });
        const deleteBtn = doc.createElement('button');
        deleteBtn.classList.add('round-btn', 'delete-task-btn');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => {
            const thisTabId = projectDetail.dataset.projectId;
            const thisProject = manageProjects.getProject(projId);
            thisProject.deleteTask(taskId, thisTabId)
        });
        actionsDiv.append(editTaskBtn, deleteBtn);

        expandDiv.append(detailsDiv, actionsDiv);

        li.append(mainInfosDiv);
        
        return li;
    }

    const renderEditTaskForm = (projId, taskId, taskLi, mainInfosDiv, expandDiv) => {
        const thisProject = manageProjects.getProject(projId);
        const thisTask = thisProject.getTask(taskId);
        // create inputs
        // mainInfos fieldset
        const editMainInfos = doc.createElement('fieldset');
        editMainInfos.setAttribute('id','edit-task-main-infos');
        // Title
        const editTitleInput = dom.createTextInput('',[],'edit-task-title', 'edit-task-title', 25,  []);
        editTitleInput.querySelector('input').value = thisTask.getTitle();
        // DateState fieldset
        const editDateState = doc.createElement('fieldset');
        editDateState.setAttribute('id','edit-task-date-state');
        // Date
        const editDateInput = dom.createDateInput('',[],'edit-task-duedate', 'edit-task-duedate',[]);
        editDateInput.querySelector('input').value = thisTask.getDueDate();
        // States
        const editStateDoneOption = dom.createSelectOption(0, 'Done',[]);
        const editStateWipOption = dom.createSelectOption(1, 'WIP', []);
        const editStateTodoOpion = dom.createSelectOption(2,'Todo',[]);
        const editStateAbandonedOpion = dom.createSelectOption(3,'Abandoned', []);
        const stateOptions = [editStateDoneOption,editStateWipOption,editStateTodoOpion,editStateAbandonedOpion];
        stateOptions.map(option =>{ 
            if (option.textContent === thisTask.getState()) {
                option.selected = true;
            }
        });
        const editStateSelect = dom.createSelect('',[],'edit-task-state','edit-task-state',stateOptions, []);
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
        const priorities = {
            Low: 3,
            Medium: 2,
            High: 1
        };
        const priority3Input = dom.createRadio('Low', [], 'edit-task-priority3', 'temp', priorities['Low'], ['edit-inputs-radio']);
        const priority2Input = dom.createRadio('Medium', [], 'edit-task-priority2', 'temp', priorities['Medium'], ['edit-inputs-radio']);
        const priority1Input = dom.createRadio('High', [], 'edit-task-priority1', 'temp', priorities['High'], ['edit-inputs-radio']);
        const priorityRadios = [priority3Input, priority2Input, priority1Input];
        priorityRadios.map(radio =>{ 
            if (radio.textContent === thisTask.getPriority()) {
                radio.querySelector
                ('input').checked = true;
            };
        });
        const prioritiesFieldset = dom.createRadioFieldset('Priority:',['edit-labels'],'edit-task-priority','edit-task-priority',priorityRadios, ['edit-inputs']);
        // desc
        const editDescTextarea = dom.createTextInput('',[],'edit-task-desc','edit-task-desc',25, []);
        editDescTextarea.querySelector('input').value = thisTask.getDesc();
        // expand div hierachy
        editDetails.append(prioritiesFieldset,editDescTextarea);
        editExpandDiv.append(editDetails);
        // create form
        const editForm = dom.createForm('edit-task-form',[],'OK',['round-btn'],[editMainInfos,editExpandDiv]);
        editForm.addEventListener('submit', (e) => {
            const thisTabId = projectDetail.dataset.projectId;
            manageProjects.editTaskFormSubmit(e, thisTask, thisProject, thisTabId);
        });
        
        // replace current infos
        taskLi.removeChild(mainInfosDiv);
        taskLi.removeChild(expandDiv);
        taskLi.append(editForm);
    }
    
    
    const renderTasks = (projectTasks) => {
        // todo DATE: order projectTasks by date (more recent)
        const tasksLis = projectTasks.map((task, id) => {
            const taskProject = manageProjects.getProject(task.getProjectId());
            // ! to Fixe delete project other than the last
            // semble chercher un id de project qui n'existe plus (les tâches du projet supprimer sont-elles bien supprimer ?)
            console.log(task.getProjectId(), task.getTitle())
            // get the id of the task in its project
            const taskIdInProject = taskProject.getTaskId(task);
            const taskLi = _createTaskLi(task.getTitle(), task.getDueDate(), task.getPriority(), task.getState(), task.getDesc(),task.getProjectId(),taskIdInProject);
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
        // Render PROJECTS
        const _projectsUl = doc.querySelector('#projects-tabs');
        const projectDetail = doc.querySelector('#project-detail');
        const _projectH2 = doc.querySelector('#project-title');
        const _projectDesc = doc.querySelector('#project-desc');
        const newProjectBtn = document.querySelector('#new-project-btn');
        const newTaskBtn = doc.querySelector('#new-task-btn');
        const editProjectBtn = doc.querySelector('#edit-project-btn');
        const deleteProjectBtn = doc.querySelector('#delete-project-btn');
        newTaskBtn.style.visibility = "hidden";
        editProjectBtn.style.visibility = "hidden";
        const projectInfos = doc.querySelector('#project-infos');
        deleteProjectBtn.style.visibility = "hidden";

        newProjectBtn.addEventListener('click', popupsManager.openPopup.bind(this,createPopup.newProjectPopup()));

        newTaskBtn.addEventListener('click',popupsManager.openPopup.bind(this,createPopup.newTaskPopup()));

        
        const renderProjectDetails = (projectOrGeneralTab, generalTabName) => {
            if(doc.querySelector('#edit-project-form')) {
                doc.querySelector('#edit-project-form').replaceWith(projectInfos);
            } 
            if (typeof projectOrGeneralTab === 'string') {
                _projectH2.textContent = generalTabName;
                _projectDesc.textContent = '';
                projectDetail.setAttribute('data-project-id', projectOrGeneralTab);
                newTaskBtn.style.visibility = "hidden";
                editProjectBtn.style.visibility = "hidden";
                deleteProjectBtn.style.visibility = "hidden";    
            } else {
                _projectH2.textContent = projectOrGeneralTab.getTitle();
                _projectDesc.textContent = projectOrGeneralTab.getDesc();
                const projId = manageProjects.getProjectId(projectOrGeneralTab);
                projectDetail.setAttribute('data-project-id', projId);
                newTaskBtn.style.visibility = "visible";
                editProjectBtn.style.visibility = "visible";
                deleteProjectBtn.style.visibility = "visible";
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
    
        const renderEditProjectForm = () => {
            const thisProject = manageProjects.getProject(projectDetail.dataset.projectId);
            // create inputs
            const editFormInputs = doc.createElement('fieldset');
            editFormInputs.setAttribute('id', 'edit-project-inputs');
            const editTitleInput = dom.createTextInput('',[],'edit-project-title', 'edit-project-title',25, []);
            editTitleInput.querySelector('input').value =thisProject.getTitle();
            const editDescTextarea = dom.createTextarea('',[],'edit-project-desc','edit-project-desc', 100, []);
            editDescTextarea.querySelector('textarea').value = thisProject.getDesc();
            editFormInputs.append(editTitleInput, editDescTextarea);
            // create form
            const editForm = dom.createForm('edit-project-form',[],'OK',['round-btn'],editFormInputs);
            editForm.addEventListener('submit', (e) => {
                manageProjects.editProjectFormSubmit(e, thisProject);
            });
            // replace current infos
            projectInfos.replaceWith(editForm);
        };
            
        editProjectBtn.addEventListener('click', renderEditProjectForm);

        deleteProjectBtn.addEventListener('click', () => {
            const thisProject = manageProjects.getProject(projectDetail.dataset.projectId);
            manageProjects.deleteProject(thisProject);
        });
            
        return {renderProjectsTabs,renderProjectDetails};
})(document)

const domRenderGeneralTabs = ((doc) => {
    // GENERAL TABS
    const initPageLoadTasks = () => {
        let allTasks = manageProjects.getAllTasks();
        domRenderTasks.renderTasks(allTasks);                  
    };
    
    const renderGeneralTabsTasks = (tabId) => {
        let allTasks =  manageProjects.getAllTasks();
        let allTasksFiltered = [];
        switch(tabId) {
            case 'today':
                // todo DATE: select task where date = today
                allTasksFiltered = allTasks.filter(task => task.getDueDate() === 1);
                break;
            case 'this-week':
                // todo DATE: select task where date = this week
                allTasksFiltered = allTasks.filter(task => task.getDueDate() > 0);
                break;
            case 'high-priority':
                    allTasksFiltered = allTasks.filter(task => task.getPriority() === 'High');
                break;
            case 'all-tasks':
                allTasksFiltered = [...allTasks];
        }
        domRenderTasks.renderTasks(allTasksFiltered);       
        // 'project' details for general tabs
    }

    const _generalTabsLis = [...doc.querySelector('#general-tabs').children];
    _generalTabsLis.map(genTab => genTab.addEventListener('click', (e) => {
        const whichTab = e.target.dataset.tab;
        const tabTitle = e.target.textContent;
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