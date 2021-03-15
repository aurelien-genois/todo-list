import {task} from './tasks-manager.js'
import {domRender} from './dom-integration.js'


const project = (title, desc) => {
    let tasks = [];
    const proto = {
        getTitle: () => title,
        setTitle: (newTitle) => title = newTitle,
        getDesc: () => desc,
        setDesc: (newDesc) => desc = newDesc,
        getTasks() {
            return this.tasks;
        },
        getTask(taskId) {
            return this.tasks[taskId];
        },
        createTask(title, dueDate, priorityLevel, desc) { 
            // create and keep a task in project tasks[]
            this.tasks.push(task(title, dueDate, priorityLevel, desc));
            domRender.renderTasks(this.tasks);
        },
        deleteTask(taskSelected) { 
            // can be optimize with unique function for both deleteTask and deleteProject with deleteItem(array, item)
            const taskId = tasks.indexOf(taskSelected);
            tasks.splice(taskId, 1);
            domRender.renderTasks(this.tasks);
        }
    };
    return Object.assign(Object.create(proto), {tasks});
}
// (NTH function setProject for change the project for one task)

// to be moved in right place or condense in one module 'manageProjects'
const manageProjects = (() => {
    let _projects = [];
    const createProject = (title,desc) => {
        const newProject = project(title, desc);
        _projects.push(newProject)
        domRender.renderProjectsTabs(_projects);
        return newProject;
    };
    const deleteProject = (projectSelected) => {
        const projectId = _projects.indexOf(projectSelected);
        _projects.splice(projectId, 1);
        domRender.renderProjectsTabs(_projects);
        return projectSelected;
    };
    const getProjects = () => _projects;
    const getProject = (projectId) => {
        return _projects[projectId];
    }
    const getProjectByTitle = (title) => {
        return _projects.find(project => project.getTitle() === title);
    }
    const getProjectIdByTitle = (title) => {
        _projects.map((project, id) => {
            if (project.getTitle() === title) {
                return id;
            }
        })
    }
    const getAllTasks = () => _projects.reduce((tasks, proj) => {
            return tasks.concat(proj.getTasks());
        }, []);

    return {createProject, deleteProject, getProjects, getProject, getAllTasks, getProjectByTitle, getProjectIdByTitle};
})();

export {
    manageProjects
}