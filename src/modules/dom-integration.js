import {manageProjects} from './projects-manager.js'
import {dom} from './dom-elements.js'


const domRenderTasks = ((doc) => {
    // Render TASKS
    const _tasksUl = doc.querySelector('#tasks-list');

    const _toggleTaskDetails = () => {
        if(li.querySelector('.task-expand')) {
            li.removeChild(expandDiv);
            expandBtn.textContent = 'V';
        } else {
            li.append(expandDiv);
            expandBtn.textContent = 'A';
        }
    };

    const _createTaskLi = (title, dueDate, priority, state, desc) => {
        const li = doc.createElement('li');
        li.classList.add('tasks');
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

        expandBtn.addEventListener('click', _toggleTaskDetails);

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

        const actionsDiv = doc.createElement('div');
        actionsDiv.classList.add('task-actions');
        const editBtn = doc.createElement('button');
        editBtn.classList.add('edit-task-btn', 'round-btn');
        editBtn.textContent = '/';
        editBtn.addEventListener('click', () => {
            // todo edit task function (PUB/SUB)
        });
        const deleteBtn = doc.createElement('button');
        deleteBtn.classList.add('round-btn', 'delete-task-btn');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => {
            // todo delete task function (PUB/SUB)
            // get thisProject
            // get thisTask
            // thisProject.deleteTask(thisTask)
        });
        actionsDiv.append(editBtn, deleteBtn);

        expandDiv.append(detailsDiv, actionsDiv);

        li.append(mainInfosDiv);
        
        return li;
    }
    
    const renderTasks = (projectTasks) => {
        // todo DATE: order projectTasks by date (more recent)
        const tasksLis = projectTasks.map(task => {
            return _createTaskLi(task.getTitle(), task.getDueDate(), task.getPriority(), task.getState(), task.getDesc());
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
        const newTaskBtn = doc.querySelector('#new-task-btn');
        const editProjectBtn = doc.querySelector('#edit-project-btn');
        const deleteProjectBtn = doc.querySelector('#delete-project-btn');
        newTaskBtn.style.visibility = "hidden";
        editProjectBtn.style.visibility = "hidden";
        const projectInfos = doc.querySelector('#project-infos');
        deleteProjectBtn.style.visibility = "hidden";
        
        const renderProjectDetails = (project, generalTabName) => {
            if(doc.querySelector('#edit-project-form')) {
                doc.querySelector('#edit-project-form').replaceWith(projectInfos);
            } 
            if (project === 'general') {
                _projectH2.textContent = generalTabName;
                _projectDesc.textContent = '';
                projectDetail.removeAttribute('data-project-id');
                newTaskBtn.style.visibility = "hidden";
                editProjectBtn.style.visibility = "hidden";
                deleteProjectBtn.style.visibility = "hidden";    
            } else {
                _projectH2.textContent = project.getTitle();
                _projectDesc.textContent = project.getDesc();
                const projId = manageProjects.getProjectId(project);
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
            const thisProjectTitle = thisProject.getTitle(); 
            const thisProjectDesc = thisProject.getDesc(); 
            // create edit form
            const editForm = doc.createElement('form');
            editForm.setAttribute('id', 'edit-project-form');
            const editFormInputs = doc.createElement('fieldset');
            editFormInputs.setAttribute('id', 'edit-project-inputs');
            const editTitleInput = dom.createTextInput('edit-project-title', 'edit-project-title',25, []);
            editTitleInput.value = thisProjectTitle;
            const editDescTextarea = dom.createTextarea('edit-project-desc','edit-project-desc', 100, []);
            editDescTextarea.value = thisProjectDesc;
            editFormInputs.append(editTitleInput, editDescTextarea);
            // create submit and append
            const editSubmit = dom.createSubmit('OK', ['round-btn']);
            editForm.addEventListener('submit', (e) => {
                manageProjects.editProjectFormSubmit(e, thisProject);
            });
            editForm.append(editFormInputs, editSubmit);
            // replace current infos
            projectInfos.replaceWith(editForm);
        };
    
        editProjectBtn.addEventListener('click', renderEditProjectForm);

        deleteProjectBtn.addEventListener('click', () => {
            const thisProject = manageProjects.getProject(projectDetail.dataset.projectId);
            console.log(projectDetail.dataset.projectId)
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
    
    const renderGeneralTabsTasks = (e) => {
        let allTasks =  manageProjects.getAllTasks();
        const whichTab = e.target.dataset.tab;
        let allTasksFiltered = [];
        switch(whichTab) {
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
        domRenderProjects.renderProjectDetails('general', e.target.textContent);
    }

    const _generalTabsLis = [...doc.querySelector('#general-tabs').children];
    _generalTabsLis.map(genTab => genTab.addEventListener('click', renderGeneralTabsTasks));

        
    return {initPageLoadTasks};
})(document);

export {
    domRenderTasks,
    domRenderProjects,
    domRenderGeneralTabs
}