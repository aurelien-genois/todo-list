import {manageProjects} from './projects-manager.js'
import {domRenderTasks, domRenderProjects, domRenderGeneralTabs} from './dom-integration.js'
import {dom} from './dom-elements.js'

// popupUX
const popupsManager = ((doc) => {
    const createPopupSection = (popupId, popupTitle, closeBtnId, popupForm) => {
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

    return {createPopupSection, openPopup, closePopup}
})(document);
    
const createPopup = ((doc) => {
    const newProjectPopup = () => {
        let inputs = [];
        const titleInput = dom.createTextInput('Project title:',['popup-labels'],'new-project-title', 'new-project-title', 25, ['popup-inputs', 'popup-inputs-text']);
        const descTextarea = dom.createTextarea('Project description:',['popup-labels','popup-labels-textarea'],'new-project-desc', 'new-project-desc', 100, ['popup-inputs', 'popup-textareas']);
        inputs.push(titleInput, descTextarea);
        const newProjectForm = dom.createForm('new-project-form', ['popup-forms'], 'Create a new project', ['popup-submits'], inputs); 
        const popup = popupsManager.createPopupSection('new-project-popup', 'New project', 'new-project-close-btn', newProjectForm);
        newProjectForm.addEventListener('submit', (e) => {
            manageProjects.createNewProjectFormSubmit(e, popup)
        });
        const newProjectCloseBtn = popup.querySelector('#new-project-close-btn');
        newProjectCloseBtn.addEventListener('click', popupsManager.closePopup.bind(this, popup));
        return popup;
    };

    const newTaskPopup = () => {
        let inputs = [];
        const titleInput = dom.createTextInput('Task title:',['popup-labels'],'new-task-title', 'new-task-title', 25, ['popup-inputs', 'popup-inputs-text']);
        const dueDateInput = dom.createDateInput('Due date:',['popup-labels'],'new-task-duedate', 'new-task-duedate', ['popup-inputs', 'popup-inputs-date']);
        // PriorityRadios
        const priorities = {
            Low: 3,
            Medium: 2,
            High: 1
        };
        const priority3Input = dom.createRadio('Low', [], 'new-task-priority3', 'temp', priorities['Low'], ['popup-inputs-radio']);
        const priority2Input = dom.createRadio('Medium', [], 'new-task-priority2', 'temp', priorities['Medium'], ['popup-inputs-radio']);
        const priority1Input = dom.createRadio('High', [], 'new-task-priority1', 'temp', priorities['High'], ['popup-inputs-radio']);
        const priorityRadios = [priority3Input, priority2Input, priority1Input];
        const prioritiesFieldset = dom.createRadioFieldset('Priority:',['popup-labels'],'new-task-priority','new-task-priority',priorityRadios, ['popup-inputs']);
        const descTextarea = dom.createTextarea('Task description:',['popup-labels','popup-labels-textarea'], 'new-task-desc',  'new-task-desc', 100, ['popup-inputs', 'popup-textareas']);
        inputs.push(titleInput, dueDateInput, prioritiesFieldset, descTextarea);
        const newTaskForm = dom.createForm('new-task-form', ['popup-forms'], 'Create a new task', ['popup-submits'], inputs);
        newTaskForm.addEventListener('submit', (e) => {
            manageProjects.createNewTaskFormSubmit(e, popup);
        });
        const popup = popupsManager.createPopupSection('new-task-popup', 'New task', 'new-task-close-btn', newTaskForm);
        const newTaskCloseBtn = popup.querySelector('#new-task-close-btn');
        newTaskCloseBtn.addEventListener('click',popupsManager.closePopup.bind(this, popup));
        return popup;
    };

    return {newProjectPopup, newTaskPopup};
})(document);

export {
    popupsManager,
    createPopup
}