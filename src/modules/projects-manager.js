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

    const getNewProjectsValues = (form) => {
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
        const {titleValue, descValue} = getNewProjectsValues(e.target);
        const project  = createProject(titleValue, descValue);
        domRenderProjects.renderProjectDetails(project);
        domRenderTasks.renderTasks(project.getTasks());
        e.preventDefault();
        popupsManager.closePopup(popup);
    }   
    const editProjectFormSubmit = (e, project) => {
        const {titleValue, descValue} = getNewProjectsValues(e.target);
        project.setTitle(titleValue);
        project.setDesc(descValue);
        domRenderProjects.renderProjectDetails(project);
        e.preventDefault();
    }

    const deleteProject = (projectSelected) => {
        const projectId = _projects.indexOf(projectSelected);
        _projects.splice(projectId, 1);
        domRenderProjects.renderProjectsTabs(_projects);
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
         getProjects, getProject, getAllTasks, getProjectId};
})();

export {
    manageProjects
}