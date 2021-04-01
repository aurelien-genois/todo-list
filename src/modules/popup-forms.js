import { manageProjects } from "./projects-manager.js";
import { domForm, domElements } from "./dom-elements.js";
import { format } from "date-fns";

// popupUX
const popupsManager = (() => {
  const createPopupSection = (popupId, popupTitle, closeBtnId, popupForm) => {
    const popupTitleH3 = domElements.createH(
      "",
      ["popup-titles"],
      popupTitle,
      3
    );
    const popupCloseBtn = domElements.createButton(
      closeBtnId,
      ["popup-close-btns"],
      "X"
    );
    const popupContainer = domElements.createDiv(
      "",
      ["popup-containers"],
      [popupTitleH3, popupCloseBtn, popupForm]
    );
    const popup = domElements.createSection(
      popupId,
      ["popups"],
      [popupContainer]
    );
    return popup;
  };

  const openPopup = (popup) => {
    domElements.body.appendChild(popup);
    popup.style.opacity = 0;
    setTimeout(() => {
      popup.style.opacity = 1;
    }, 500);
  };
  const closePopup = (popup) => {
    popup.style.opacity = 0;
    setTimeout(() => {
      domElements.body.removeChild(popup);
    }, 500);
  };

  return { createPopupSection, openPopup, closePopup };
})();

const createPopup = (() => {
  const newProjectPopup = () => {
    let inputs = [];
    const titleInput = domForm.createTextInput(
      "Project title:",
      ["popup-labels"],
      "new-project-title",
      "new-project-title",
      20,
      ["popup-inputs", "popup-inputs-text"]
    );
    const descTextarea = domForm.createTextarea(
      "Project description:",
      ["popup-labels", "popup-labels-textarea"],
      "new-project-desc",
      "new-project-desc",
      100,
      ["popup-inputs", "popup-textareas"]
    );
    inputs.push(titleInput, descTextarea);
    const newProjectForm = domForm.createForm(
      "new-project-form",
      ["popup-forms"],
      "Create a new project",
      ["popup-submits"],
      inputs
    );
    newProjectForm.addEventListener("submit", (e) => {
      manageProjects.createNewProjectFormSubmit(e, popup);
    });
    const popup = popupsManager.createPopupSection(
      "new-project-popup",
      "New project",
      "new-project-close-btn",
      newProjectForm
    );
    const newProjectCloseBtn = popup.querySelector("#new-project-close-btn");
    newProjectCloseBtn.addEventListener(
      "click",
      popupsManager.closePopup.bind(this, popup)
    );
    return popup;
  };

  const newTaskPopup = (projId) => {
    let inputs = [];
    const titleInput = domForm.createTextInput(
      "Task title:",
      ["popup-labels"],
      "new-task-title",
      "new-task-title",
      15,
      ["popup-inputs", "popup-inputs-text"]
    );
    const dueDateInput = domForm.createDateInput(
      "Due date:",
      ["popup-labels"],
      "new-task-duedate",
      "new-task-duedate",
      ["popup-inputs", "popup-inputs-date"]
    );
    dueDateInput.querySelector("input").value = format(
      new Date(),
      "yyyy-MM-dd"
    );
    // PriorityRadios
    const priority3Input = domForm.createRadio(
      "Low",
      [],
      "new-task-priority3",
      "temp",
      3,
      ["popup-inputs-radio"]
    );
    const priority2Input = domForm.createRadio(
      "Medium",
      [],
      "new-task-priority2",
      "temp",
      2,
      ["popup-inputs-radio"]
    );
    const priority1Input = domForm.createRadio(
      "High",
      [],
      "new-task-priority1",
      "temp",
      1,
      ["popup-inputs-radio"]
    );
    const priorityRadios = [priority3Input, priority2Input, priority1Input];
    const prioritiesFieldset = domForm.createRadioFieldset(
      "Priority:",
      ["popup-labels"],
      "new-task-priority",
      "new-task-priority",
      priorityRadios,
      ["popup-inputs"]
    );
    const descTextarea = domForm.createTextarea(
      "Task description:",
      ["popup-labels", "popup-labels-textarea"],
      "new-task-desc",
      "new-task-desc",
      100,
      ["popup-inputs", "popup-textareas"]
    );
    inputs.push(titleInput, dueDateInput, prioritiesFieldset, descTextarea);
    const newTaskForm = domForm.createForm(
      "new-task-form",
      ["popup-forms"],
      "Create a new task",
      ["popup-submits"],
      inputs
    );
    newTaskForm.addEventListener("submit", (e) => {
      manageProjects.createNewTaskFormSubmit(e, popup, projId);
    });
    const popup = popupsManager.createPopupSection(
      "new-task-popup",
      "New task",
      "new-task-close-btn",
      newTaskForm
    );
    const newTaskCloseBtn = popup.querySelector("#new-task-close-btn");
    newTaskCloseBtn.addEventListener(
      "click",
      popupsManager.closePopup.bind(this, popup)
    );
    return popup;
  };

  return { newProjectPopup, newTaskPopup };
})();

export { popupsManager, createPopup };
