import {task} from './tasks-manager.js'
import {dom} from './dom-integration.js'


const project = (title, desc = '') => {
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
        createTask(title, dueDate, desc, priorityLevel) { 
            // create and keep a task in project tasks[]
            this.tasks.push(task(title, dueDate, desc, priorityLevel));
            // dom.appendTasks(this.tasks);
        },
        deleteTask(taskSelected) { 
            // can be optimize with unique function for both deleteTask and deleteProject with deleteItem(array, item)
            const taskId = tasks.indexOf(taskSelected);
            tasks.splice(taskId, 1);
            // dom.appendTasks(this.tasks);
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
        dom.appendProjectsTabs(manageProjects.getProjects());
        return newProject;
    };
    const deleteProject = (projectSelected) => {
        const projectId = _projects.indexOf(projectSelected);
        _projects.splice(projectSelected, 1);
        dom.appendProjectsTabs(manageProjects.getProjects());
        return projectSelected;
    };
    const getProjects = () => _projects;

    return {createProject, deleteProject, getProjects};
})();

export {
    project,
    manageProjects
}