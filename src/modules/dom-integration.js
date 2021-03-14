import {manageProjects} from './projects-manager.js'

// rename dom to 'projectsViews' 'taskViews' ?
const dom = ((doc) => {
    const _projectsUl = doc.querySelector('#projects-tabs');
    const newTaskBtn = doc.querySelector('#new-task-btn');
    newTaskBtn.style.visibility = "hidden";
    const _tasksUl = doc.querySelector('#tasks-list');
    const _projectH2 = doc.querySelector('#project-title');
    const projectDetail = doc.querySelector('#project-detail');
    const _generalTabsLis = [...doc.querySelector('#general-tabs').children];

    const appendTasks = (projectTasks) => {
         // todo DATE: order projectTasks by date (more recent)
        const tasksLi = projectTasks.map(task => {
            const li = doc.createElement('li');
            li.classList.add('tasks');
            // Todo add the content to the li (with helper function)
            li.textContent = task.getTitle();
            return li;
        });
        while(_tasksUl.firstChild) {
            _tasksUl.removeChild(_tasksUl.firstChild);
        };
        tasksLi.map(taskLi => {
            _tasksUl.appendChild(taskLi);
        }); 
    }

    const initPageLoadTasks = () => {
        let allTasks =  manageProjects.getProjects().reduce((tasks, proj) => {
            return tasks.concat(proj.getTasks());
        }, []);
        appendTasks(allTasks);                  
    };

    const _appendGeneralTabsTasks = (e) => {
        let allTasks =  manageProjects.getProjects().reduce((tasks, proj) => {
            return tasks.concat(proj.getTasks());
        }, []);
        const whichTab = e.target.dataset.tab;
        // filter allTasks according to which tab clicked
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
        _projectH2.textContent = e.target.textContent;
        projectDetail.removeAttribute('data-project-id');
        newTaskBtn.style.visibility = "hidden";
        // append all task filtered
        appendTasks(allTasksFiltered);       
    }

    _generalTabsLis.map(genTab => genTab.addEventListener('click', _appendGeneralTabsTasks.bind(this)));

    const _updateProjectDetail = (project, projectId) => {
        appendTasks(project.getTasks()); 
        _projectH2.textContent = project.getTitle();
        projectDetail.setAttribute('data-project-id', projectId);
        newTaskBtn.style.visibility = "visible";

    }

    const appendProjectsTabs = (projects) => { 
        const projectsLi = projects.map(project => {
            const li = doc.createElement('li');
            li.classList.add('tabs', 'project-tab');
            li.textContent = project.getTitle();
            return li;
        });
        projectsLi.map((projLi, projId) => projLi.addEventListener('click',_updateProjectDetail.bind(this,projects[projId], projId)));
        while(_projectsUl.firstChild) {
            _projectsUl.removeChild(_projectsUl.firstChild);
        };
        projectsLi.map(projLi => {
            _projectsUl.appendChild(projLi);
        }); 
    }

    return {appendProjectsTabs, appendTasks, initPageLoadTasks};
})(document);

// popupUX
const popupsUX = ((doc) => {
    const newProjectBtn = doc.querySelector('#new-project-btn');
    const newProjectPopup = doc.querySelector('#new-project-popup');
    const newProjectCloseBtn = doc.querySelector('#new-project-close-btn')
    const newTaskBtn = doc.querySelector('#new-task-btn');
    const newTaskPopup = doc.querySelector('#new-task-popup');
    const newTaskCloseBtn = doc.querySelector('#new-task-close-btn')
    const newTaskForm = doc.querySelector('#new-task-form');
    const newProjectForm = doc.querySelector('#new-project-form');

    const openPopup = (popup) => {
        popup.style.opacity = 1;
        popup.style.visibility = 'visible';
    };
    const closePopup = (popup) => {
        popup.style.opacity = 0;
        setTimeout(() => {
            popup.style.visibility = 'hidden';
        }, 500);
    };
    
    newProjectBtn.addEventListener('click', openPopup.bind(this,newProjectPopup));
    newProjectCloseBtn.addEventListener('click', closePopup.bind(this, newProjectPopup));
    newProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const titleInput = newProjectForm.querySelector('#new-project-title');
        const descTextarea = newProjectForm.querySelector('#new-project-desc');
        const titleValue = titleInput.value;
        const descValue = descTextarea.value;
        titleInput.value = '';
        descTextarea.value = '';
        manageProjects.createProject(titleValue, descValue);
        closePopup(newProjectPopup)
    });

    newTaskBtn.addEventListener('click',openPopup.bind(this,newTaskPopup));
    newTaskCloseBtn.addEventListener('click',closePopup.bind(this, newTaskPopup));
    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // get inputs
        const titleInput = newTaskForm.querySelector('#new-task-title');
        const dueDateInput = newTaskForm.querySelector('#new-task-duedate');
        const priorityRadioChecked = [...newTaskForm.querySelector('#new-task-priority').querySelectorAll("input[type='radio'")].find(radio => radio.checked);
        const descTextarea = newTaskForm.querySelector('#new-task-desc');
        // get values
        const titleValue = titleInput.value;
        const dueDateValue = dueDateInput.value;
        const priorityValue = (priorityRadioChecked !== undefined) ?priorityRadioChecked.value : 3;
        const descValue = descTextarea.value;
        // reset inputs
        titleInput.value = '';
        dueDateInput.value = '';
        (priorityRadioChecked !== undefined) ?priorityRadioChecked.checked = false : '';
        descTextarea.value = '';

        const thisProjectId = doc.querySelector('#project-detail').dataset.projectId;
        manageProjects.getProject(thisProjectId).createTask(titleValue, dueDateValue, priorityValue, descValue);
        closePopup(newTaskPopup);
    })

})(document);



export {
    dom
}