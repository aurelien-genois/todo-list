import {manageProjects} from './projects-manager.js'

const dom = ((doc) => {
    const _projectsUl = doc.querySelector('#projects-tabs');
    const _tasksUl = doc.querySelector('#tasks-list');
    const _projectH2 = doc.querySelector('#project-title');
    const _generalTabsLis = [...doc.querySelector('#general-tabs').children];

    // integrate the list of tasks (li) #tasks-list
    const appendTasks = (projectTasks) => {
        const tasksLi = projectTasks.map(task => {
            const li = doc.createElement('li');
            li.classList.add('tasks');
            // Todo add the content to the li(with helper function)
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

    // integrate the list of general tabs (li) to #general-tabs
    // but no necessary because they never change
    // only add an eventListener for diplay the task filtered list
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
        }
        _projectH2.textContent = e.target.textContent;
        // append all task filtered
        // todo DATE: order by date (more recent)
        appendTasks(allTasksFiltered)
        console.log(e)        
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
    


    return {appendProjectsTabs, appendTasks};
})(document);

export {
    dom
}