import {manageProjects} from './projects-manager.js'

// rename dom to 'projectsViews' 'taskViews' ?
const dom = ((doc) => {

    // TASKS
    const newTaskBtn = doc.querySelector('#new-task-btn');
    const _tasksUl = doc.querySelector('#tasks-list');

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
        editProjectBtn.style.visibility = "hidden";
        // append all task filtered
        appendTasks(allTasksFiltered);       
    }

    // PROJECTS
    const _projectsUl = doc.querySelector('#projects-tabs');
    const projectDetail = doc.querySelector('#project-detail');
    const _projectH2 = doc.querySelector('#project-title');
    const _projectDesc = doc.querySelector('#project-desc');
    const editProjectBtn = doc.querySelector('#edit-project-btn')

    const updateProjectDetail = (project, projectId) => {
        appendTasks(project.getTasks()); 
        _projectH2.textContent = project.getTitle();
        _projectDesc.textContent = project.getDesc();
        projectDetail.setAttribute('data-project-id', projectId);
        newTaskBtn.style.visibility = "visible";
        editProjectBtn.style.visibility = "visible";
    }
    const appendProjectsTabs = (projects) => { 
        const projectsLi = projects.map(project => {
            const li = doc.createElement('li');
            li.classList.add('tabs', 'project-tab');
            li.textContent = project.getTitle();
            return li;
        });
        projectsLi.map((projLi, projId) => projLi.addEventListener('click',updateProjectDetail.bind(this,projects[projId], projId)));
        while(_projectsUl.firstChild) {
            _projectsUl.removeChild(_projectsUl.firstChild);
        };
        projectsLi.map(projLi => {
            _projectsUl.appendChild(projLi);
        }); 
    }
    editProjectBtn.addEventListener('click', () => {
        // todo open a popup with form or expend the form
    })
    

    // GENERAL TABS
    const _generalTabsLis = [...doc.querySelector('#general-tabs').children];
    _generalTabsLis.map(genTab => genTab.addEventListener('click', _appendGeneralTabsTasks.bind(this)));

        
    return {appendProjectsTabs, appendTasks, initPageLoadTasks, updateProjectDetail};
})(document);


// popupUX
const popupsManager = ((doc) => {
    const createFormInput = (labelText,inputId,inputType, inputChilds) => {
        const label = doc.createElement('label');
        label.classList.add('popup-labels');
        label.setAttribute('for', inputId);
        switch(inputType) {
            case 'text':
                label.textContent = labelText;
                const inputText = doc.createElement('input');
                inputText.setAttribute('type', 'text');
                inputText.setAttribute('maxlength', 25);
                inputText.setAttribute('name', inputId);
                inputText.setAttribute('id', inputId);
                inputText.classList.add('popup-inputs', 'popup-inputs-text');
                inputText.setAttribute('required', true);
                label.appendChild(inputText);
                break;
            case 'date':
                label.textContent = labelText;
                const inputDate = doc.createElement('input');
                inputDate.setAttribute('type', 'date');
                inputDate.setAttribute('name', inputId);
                inputDate.setAttribute('id', inputId);
                inputDate.classList.add('popup-inputs', 'popup-inputs-date');
                inputDate.setAttribute('required', true);
                label.appendChild(inputDate);
                break;
            case 'textarea':
                label.classList.add('popup-labels-textarea');
                const span = doc.createElement('span');
                span.textContent = labelText;
                const parenthesis = doc.createElement('span');
                parenthesis.classList.add('parenthesis');
                parenthesis.textContent = ' (up to 100 characters)';
                span.appendChild(parenthesis);
                const textarea = doc.createElement('textarea');
                textarea.setAttribute('maxlength', 100);
                textarea.setAttribute('name', inputId);
                textarea.setAttribute('id', inputId);
                textarea.classList.add('popup-inputs', 'popup-textarea');
                label.append(span, textarea);
                break;
            case 'fieldset':
                label.textContent = labelText;
                const fieldset = doc.createElement('fieldset');
                fieldset.setAttribute('id', inputId);
                fieldset.classList.add('popup-inputs');
                inputChilds.map(input => {
                    input.firstElementChild.setAttribute('name', inputId);
                    fieldset.appendChild(input);
                });
                label.appendChild(fieldset);
                break;
            case 'radio':
                label.classList.remove('popup-labels');
                const values = {
                    Low: 3,
                    Medium: 2,
                    High: 1
                }
                const inputRadio = doc.createElement('input');
                inputRadio.setAttribute('type', 'radio');
                inputRadio.setAttribute('id', inputId);
                inputRadio.classList.add('popup-inputs-radio');
                inputRadio.setAttribute('value', values[labelText]);
                label.appendChild(inputRadio);
                label.append(labelText);
        }
        return label;
    }

    const createForm = (formId, submitValue, inputs) => {
        const form = doc.createElement('form');
        form.setAttribute('id', formId);
        form.classList.add('popup-forms');
        inputs.map(input => {
            form.appendChild(input);
        });
        const submit = doc.createElement('input');
        submit.setAttribute('type', 'submit');
        submit.classList.add('popup-submits');
        submit.setAttribute('value', submitValue);
        form.appendChild(submit);
        return form;
    }

    const createPopup = (popupId, popupTitle, closeBtnId, popupForm) => {
        const popup = doc.createElement('section');
        popup.setAttribute('id', popupId);
        popup.classList.add('popups');
        const popupContainer = doc.createElement('div');
        popupContainer.classList.add('popup-containers');
        popup.appendChild(popupContainer);
        const popupTitleH3 = doc.createElement('h3');
        popupTitleH3.textContent = popupTitle;
        popupTitleH3.classList.add('popup-titles');
        const popupCloseBtn = doc.createElement('button');
        popupCloseBtn.textContent = 'X';
        popupCloseBtn.setAttribute('id', closeBtnId);
        popupCloseBtn.classList.add('popup-close-btns');
        popupContainer.append(popupTitleH3, popupCloseBtn, popupForm);
        return popup;
    }

    const body = doc.querySelector('#body');
    const openPopup = (popup) => {
        body.appendChild(popup);
        popup.style.opacity = 0;
        setTimeout(() => {
            popup.style.opacity = 1;
        }, 500);

    };
    const closePopup = (popup) => {
        popup.style.opacity = 0;
        setTimeout(() => {
            body.removeChild(popup);
        }, 500);
    };

    // new project popup
    const newProjectPopup = () => {
        let inputs = [];
        const titleInput = createFormInput('Project title:', 'new-project-title', 'text');
        const descTextarea = createFormInput('Project description:','new-project-desc', 'textarea');
        inputs.push(titleInput, descTextarea);
        const newProjectForm = createForm('new-project-form', 'Create a new project', inputs); 
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
                const project  = manageProjects.getProjectByTitle(titleValue);
                let projId = 0;
                manageProjects.getProjects().map((project, id) => {
                    if (project.getTitle() === titleValue) {
                        projId = id;
                    };
                });
                dom.updateProjectDetail(project,projId);
                e.preventDefault();
                closePopup(popup);
            });
        const popup = createPopup('new-project-popup', 'New project', 'new-project-close-btn', newProjectForm);
        const newProjectCloseBtn = popup.querySelector('#new-project-close-btn');
        newProjectCloseBtn.addEventListener('click', closePopup.bind(this, popup));
        return popup;
    };


    const newProjectBtn = doc.querySelector('#new-project-btn');
    newProjectBtn.addEventListener('click', openPopup.bind(this,newProjectPopup()));
 
        
    // new task popup
    const newTaskPopup = () => {
        let inputs = [];
        const titleInput = createFormInput('Task title:', 'new-task-title', 'text');
        const dueDateInput = createFormInput('Due date:', 'new-task-duedate', 'date');
        let priorityRadios = [];
        const priority3Input = createFormInput('Low', 'new-task-priority3', 'radio');
        const priority2Input = createFormInput('Medium', 'new-task-priority2', 'radio');
        const priority1Input = createFormInput('High', 'new-task-priority1', 'radio');
        priorityRadios.push(priority3Input, priority2Input, priority1Input);
        const prioritiesFieldset = createFormInput('Priority:', 'new-task-priority', 'fieldset', priorityRadios);
        const descTextarea = createFormInput('Task description:', 'new-task-desc', 'textarea');
        inputs.push(titleInput, dueDateInput, prioritiesFieldset, descTextarea);
        const newTaskForm = createForm('new-task-form','Create a new task', inputs);
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
            closePopup(popup);
        });
        const popup = createPopup('new-task-popup', 'New task', 'new-task-close-btn', newTaskForm);
        const newTaskCloseBtn = popup.querySelector('#new-task-close-btn');
        newTaskCloseBtn.addEventListener('click',closePopup.bind(this, newTaskPopup));
        return popup;
    };

    const newTaskBtn = doc.querySelector('#new-task-btn');
    newTaskBtn.addEventListener('click',openPopup.bind(this,newTaskPopup()));
})(document);



export {
    dom
}