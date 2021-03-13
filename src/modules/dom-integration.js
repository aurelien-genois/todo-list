import {manageProjects} from './projects-manager.js'

const popupsUX = ((doc) => {
        const newProjectBtn = doc.querySelector('#new-project-btn');
        const newProjectPopup = doc.querySelector('#new-project-popup');
        const newProjectCloseBtn = doc.querySelector('#new-project-close-btn')
        const newProjectSubmit = doc.querySelector('#new-project-submit');
        const newTaskBtn = doc.querySelector('#new-task-btn');
        const newTaskPopup = doc.querySelector('#new-task-popup');
        const newTaskCloseBtn = doc.querySelector('#new-task-close-btn')
        const newTaskSubmit = doc.querySelector('#new-task-submit');
        
        newProjectBtn.addEventListener('click', () => {
            newProjectPopup.style.opacity = 1;
            newProjectPopup.style.visibility = 'visible';
        });
        newProjectCloseBtn.addEventListener('click', () => { 
            newProjectPopup.style.opacity = 0;
            setTimeout(() => {
                newProjectPopup.style.visibility = 'hidden';
            }, 500);
        })
        newProjectSubmit.addEventListener('submit', (e) => {
            e.preventDefault();
            // todo get the inputs value Title (Desc optional)
            // create new project with values
        })
        newTaskBtn.addEventListener('click', () => {
            newTaskPopup.style.opacity = 1;
            newTaskPopup.style.visibility = 'visible';
        })
        newTaskCloseBtn.addEventListener('click', () => {
            newTaskPopup.style.opacity = 0;
            setTimeout(() => {
                newTaskPopup.style.visibility = 'hidden';
            }, 500);
        })
        newTaskSubmit.addEventListener('submit', (e) => {
            e.preventDefault();
            // todo get the inputs value Title, DueDate (Desc, Priority optionals)
            // create new project with values
        })
    
})(document);

// rename dom to 'projectsViews' 'taskViews' ?
const dom = ((doc) => {
    const _projectsUl = doc.querySelector('#projects-tabs');
    const _tasksUl = doc.querySelector('#tasks-list');
    const _projectH2 = doc.querySelector('#project-title');
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
        // append all task filtered
        appendTasks(allTasksFiltered);       
    }

    _generalTabsLis.map(genTab => genTab.addEventListener('click', _appendGeneralTabsTasks.bind(this)));

    const _updateProjectDetail = (project) => {
        appendTasks(project.getTasks()); 
        _projectH2.textContent = project.getTitle();
    }

    const appendProjectsTabs = (projects) => { 
        const projectsLi = projects.map(project => {
            const li = doc.createElement('li');
            li.classList.add('tabs', 'project-tab');
            li.textContent = project.getTitle();
            return li;
        });
        projectsLi.map((projLi, projId) => projLi.addEventListener('click',_updateProjectDetail.bind(this,projects[projId])));
        while(_projectsUl.firstChild) {
            _projectsUl.removeChild(_projectsUl.firstChild);
        };
        projectsLi.map(projLi => {
            _projectsUl.appendChild(projLi);
        }); 
    }

    return {appendProjectsTabs, appendTasks, initPageLoadTasks};
})(document);

export {
    dom
}