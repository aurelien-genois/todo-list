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
        let allTasks = manageProjects.getAllTasks();
        appendTasks(allTasks);                  
    };

    const _appendGeneralTabsTasks = (e) => {
        let allTasks =  manageProjects.getAllTasks();
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
    const newProjectForm = doc.querySelector('#new-project-form');

    const newTaskBtn = doc.querySelector('#new-task-btn');
    const newTaskPopup = doc.querySelector('#new-task-popup');
    const newTaskCloseBtn = doc.querySelector('#new-task-close-btn')
    const newTaskForm = doc.querySelector('#new-task-form');

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
        const data = new FormData(newProjectForm);
        for (const entry of data) { // get values
            switch(entry[0]) {
                case 'new-project-title':
                    var titleValue = entry[1];
                    break;
                case 'new-project-desc':
                    var descValue = entry[1];
                    break;
            };
        };
        newProjectForm.reset(); // reset form
        manageProjects.createProject(titleValue, descValue); // create project
        e.preventDefault();
        closePopup(newProjectPopup);
    });

    newTaskBtn.addEventListener('click',openPopup.bind(this,newTaskPopup));

    newTaskCloseBtn.addEventListener('click',closePopup.bind(this, newTaskPopup));

    newTaskForm.addEventListener('submit', (e) => {
        const data = new FormData(newTaskForm);
        for (const entry of data) { // get values
            switch(entry[0]) {
                case 'new-task-title':
                    var titleValue = entry[1];
                    break;
                case 'new-task-duedate':
                    var dueDateValue = entry[1];
                    break;
                case 'new-task-priority':
                    var priorityValue = entry[1];
                    break;
                case 'new-task-desc':
                    var descValue = entry[1];
                    break;
            };
        };
        newTaskForm.reset(); // reset form
        const thisProjectId = doc.querySelector('#project-detail').dataset.projectId;
        // create task with default value for priority if undefined
        manageProjects.getProject(thisProjectId).createTask(titleValue, dueDateValue, priorityValue || 3, descValue); 
        e.preventDefault();
        closePopup(newTaskPopup);
    })

})(document);



export {
    dom
}