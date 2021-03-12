import {task} from './tasks-manager.js'

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
        createTask(title, dueDate, desc, priorityLevel) { 
            // create and keep a task in project tasks[]
            this.tasks.push(task(title, dueDate, desc, priorityLevel));
        },
        deleteTask(taskSelected) {
            const taskId = tasks.indexOf(taskSelected);
            tasks.splice(taskId, 1);
        }
    };
    return Object.assign(Object.create(proto), {tasks});
}
// (NTH function setProject for change the project for one task)

export {
    project
}