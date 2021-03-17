import {task} from './tasks-class.js'
import {domRenderTasks, domRenderProjects, domRenderGeneralTabs} from './dom-integration.js'

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
        getTaskId(task) {
            return this.tasks.indexOf(project)
        },
        createTask(title, dueDate, priorityLevel, desc) { 
            // create and keep a task in project tasks[]
            this.tasks.push(task(title, dueDate, priorityLevel, desc));
            domRenderTasks.renderTasks(this.tasks);
        },
        deleteTask(taskSelected) { 
            // can be optimize with unique function for both deleteTask and deleteProject with deleteItem(array, item)
            const taskId = tasks.indexOf(taskSelected);
            tasks.splice(taskId, 1);
            domRenderTasks.renderTasks(this.tasks);
        }
    
    };
    return Object.assign(Object.create(proto), {tasks});
}
// (NTH function setProject for change the project for one task)

export {
    project
}