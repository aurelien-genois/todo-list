import {project} from './projects-class.js'
import {popupsManager} from './popup-forms.js'
import {domRenderTasks, domRenderProjects, domRenderGeneralTabs} from './dom-integration.js'

const manageProjects = (() => {
    let _projects = [];
    const createProject = (title,desc) => {
        const newProject = project(title, desc);
        _projects.push(newProject)
        domRenderProjects.renderProjectsTabs(_projects);
        return newProject;
    };

    const getNewProjectValues = (form) => {
        const data = new FormData(form);
        for (const entry of data) { //  return {titleValue, descValue}; get values
            switch(entry[0]) {
                case 'new-project-title':
                    var titleValue = entry[1];
                    break;
                case 'new-project-desc':
                    var descValue = entry[1];
                    break;
                case 'edit-project-title':
                    var titleValue = entry[1];
                    break;
                case 'edit-project-desc':
                    var descValue = entry[1];
                    break;

            };
        };
        form.reset(); // reset form 
        return {titleValue, descValue};
    };
    const createNewProjectFormSubmit = (e, popup) => {
        const {titleValue, descValue} = getNewProjectValues(e.target);
        const project  = createProject(titleValue, descValue);
        domRenderProjects.renderProjectDetails(project);
        domRenderTasks.renderTasks(project.getTasks());
        e.preventDefault();
        popupsManager.closePopup(popup);
    }   
    const editProjectFormSubmit = (e, project) => {
        const {titleValue, descValue} = getNewProjectValues(e.target);
        project.setTitle(titleValue);
        project.setDesc(descValue);
        domRenderProjects.renderProjectDetails(project);
        e.preventDefault();
    }
    
    const getNewTaskValues = (form) => {
        const data = new FormData(form);
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
                // todo create the renderEditTaskForm in dom-integration.js
                case 'edit-task-title':
                    var titleValue = entry[1];
                    break;
                case 'edit-task-duedate':
                    var dueDateValue = entry[1];
                    break;
                case 'edit-task-priority':
                    var priorityValue = entry[1];
                    break;
                case 'edit-task-desc':
                    var descValue = entry[1];
                    break;
                case 'edit-task-state':
                    var stateValue = entry[1];
                    break;
            };
        };
        form.reset(); // reset form
        return {titleValue, dueDateValue, priorityValue, descValue, stateValue};
    };
    const createNewTaskFormSubmit = (e, popup) => {
        const {titleValue, dueDateValue, priorityValue, descValue} = getNewTaskValues(e.target); 
        const thisProjectId = document.querySelector('#project-detail').dataset.projectId;
        // create task with default value for priority if undefined
        manageProjects.getProject(thisProjectId).createTask(titleValue, dueDateValue, priorityValue || 3, descValue, thisProjectId); 
        e.preventDefault();
        popupsManager.closePopup(popup);
    }
    // editTaskFormSubmit

    const deleteProject = (projectSelected) => {
        // ! to Fixe delete project other than the last
        const projectId = _projects.indexOf(projectSelected);
        _projects.splice(projectId, 1);
        domRenderProjects.renderProjectsTabs(_projects);
        domRenderGeneralTabs.initPageLoadTasks();
        domRenderProjects.renderProjectDetails('all-tasks', 'All tasks');
        return projectSelected;
    };

    // getters
    const getProjects = () => _projects;
    const getProject = (projectId) => {
        return _projects[projectId];
    }
    const getProjectId = (project) => {
        return _projects.indexOf(project)
    }
    const getAllTasks = () => _projects.reduce((tasks, proj) => {
            return tasks.concat(proj.getTasks());
        }, []);

    return {createProject, createNewProjectFormSubmit, editProjectFormSubmit, deleteProject,
        createNewTaskFormSubmit,
         getProjects, getProject, getAllTasks, getProjectId};
})();

export {
    manageProjects
}