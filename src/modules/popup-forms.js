import {manageProjects} from './projects-manager.js'
import {domRenderTasks, domRenderProjects, domRenderGeneralTabs} from './dom-integration.js'
import {dom} from './dom-elements.js'

// popupUX
const popupsManager = ((doc) => {
    const createFormInput = (labelText,inputId,inputType, inputChilds) => {
        const label = doc.createElement('label');
        label.classList.add('popup-labels');
        label.setAttribute('for', inputId);
        switch(inputType) {
            case 'text':
                label.textContent = labelText;
                const titleInput = dom.createTextInput(inputId, inputId, 25, ['popup-inputs', 'popup-inputs-text'])
                label.appendChild(titleInput);
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
                const descTextarea = dom.createTextarea(inputId, inputId, 100, ['popup-inputs', 'popup-textareas']);
                label.append(span, descTextarea);
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
        const formSubmit = dom.createSubmit(submitValue, ['popup-submits']);
        form.appendChild(formSubmit);
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

    return { createFormInput, createForm, createPopup, openPopup, closePopup}
})(document);

    // new project popup

const newProjectPopup = () => {
    let inputs = [];
    const titleInput = popupsManager.createFormInput('Project title:', 'new-project-title', 'text');
    const descTextarea = popupsManager.createFormInput('Project description:','new-project-desc', 'textarea');
    inputs.push(titleInput, descTextarea);
    const newProjectForm = popupsManager.createForm('new-project-form', 'Create a new project', inputs); 
    const popup = popupsManager.createPopup('new-project-popup', 'New project', 'new-project-close-btn', newProjectForm);
    newProjectForm.addEventListener('submit', (e) => {
        manageProjects.createNewProjectFormSubmit(e, popup)
    });
    const newProjectCloseBtn = popup.querySelector('#new-project-close-btn');
    newProjectCloseBtn.addEventListener('click', popupsManager.closePopup.bind(this, popup));
    return popup;
};

const newProjectBtn = document.querySelector('#new-project-btn');
newProjectBtn.addEventListener('click', popupsManager.openPopup.bind(this,newProjectPopup()));

    
// new task popup
const newTaskPopup = () => {
    let inputs = [];
    const titleInput = popupsManager.createFormInput('Task title:', 'new-task-title', 'text');
    const dueDateInput = popupsManager.createFormInput('Due date:', 'new-task-duedate', 'date');
    let priorityRadios = [];
    const priority3Input = popupsManager.createFormInput('Low', 'new-task-priority3', 'radio');
    const priority2Input = popupsManager.createFormInput('Medium', 'new-task-priority2', 'radio');
    const priority1Input = popupsManager.createFormInput('High', 'new-task-priority1', 'radio');
    priorityRadios.push(priority3Input, priority2Input, priority1Input);
    const prioritiesFieldset = popupsManager.createFormInput('Priority:', 'new-task-priority', 'fieldset', priorityRadios);
    const descTextarea = popupsManager.createFormInput('Task description:', 'new-task-desc', 'textarea');
    inputs.push(titleInput, dueDateInput, prioritiesFieldset, descTextarea);
    const newTaskForm = popupsManager.createForm('new-task-form','Create a new task', inputs);
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
        const thisProjectId = document.querySelector('#project-detail').dataset.projectId;
        // create task with default value for priority if undefined
        manageProjects.getProject(thisProjectId).createTask(titleValue, dueDateValue, priorityValue || 3, descValue); 
        e.preventDefault();
        popupsManager.closePopup(popup);
    });
    const popup = popupsManager.createPopup('new-task-popup', 'New task', 'new-task-close-btn', newTaskForm);
    const newTaskCloseBtn = popup.querySelector('#new-task-close-btn');
    newTaskCloseBtn.addEventListener('click',popupsManager.closePopup.bind(this, newTaskPopup));
    return popup;
};

const newTaskBtn = document.querySelector('#new-task-btn');
newTaskBtn.addEventListener('click',popupsManager.openPopup.bind(this,newTaskPopup()));

export {
    popupsManager
}