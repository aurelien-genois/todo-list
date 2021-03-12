const dom = ((doc) => {
    const _projectsUl = doc.querySelector('#projects-tabs');
    const _tasksList = doc.querySelector('#tasks-list')


    // integrate the list of tasks (li) #tasks-list
    const appendTasks = (projectTasks) => {
        const tasksLi = projectTasks.map(task => {
            const li = doc.createElement('li');
            li.classList.add('tasks');
            // Todo add the content to the li(with helper function)
            li.textContent = task.getTitle();
            return li;
        });
        while(_tasksList.firstChild) {
            _tasksList.removeChild(_tasksList.firstChild);
        };
        tasksLi.map(taskLi => {
            _tasksList.appendChild(taskLi);
        }); 
    }

    // integrate the list of projects (li) to #projects-tabs
    const appendProjectsTabs = (projects) => { 
        const projectsLi = projects.map(project => {
            const li = doc.createElement('li');
            li.classList.add('tabs', 'project-tab');
            li.textContent = project.getTitle();
            return li;
        });
        projectsLi.map((projLi, projId) => projLi.addEventListener('click', () => {
            appendTasks(projects[projId].getTasks()); 
            // on click, display current project's tasks
        }));
        while(_projectsUl.firstChild) {
            _projectsUl.removeChild(_projectsUl.firstChild);
        };
        projectsLi.map(projLi => {
            _projectsUl.appendChild(projLi);
        }); 
    }
    
    // integrate the list of general tabs (li) to #general-tabs

    return {appendProjectsTabs, appendTasks};
})(document);

export {
    dom
}