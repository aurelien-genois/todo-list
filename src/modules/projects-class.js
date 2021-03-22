import {task} from './tasks-class.js'
import {domRenderTasks, domRenderProjects, domRenderGeneralTabs} from './dom-integration.js'

const project = (title, desc) => {
    // private array
    let _tasks = [];
    const proto = {
        getTitle: () => title,
        setTitle: (newTitle) => title = newTitle,
        getDesc: () => desc,
        setDesc: (newDesc) => desc = newDesc,
        getTasks() {
            return _tasks;
        },
        getTask(taskId) {
            return _tasks[taskId];
        },
        getTaskId(task) {
            return _tasks.indexOf(task)
        },
        createTask(title, dueDate, priorityLevel, desc, projectId) {
            _tasks.push(task(title, dueDate, priorityLevel, desc, projectId));
            domRenderTasks.renderTasks(_tasks);
        },
        deleteTask(taskId) { 
            _tasks.splice(taskId, 1);
        }
    
    };
    return Object.assign(Object.create(proto), {});
}
// (NTH function setProject for change the project for one task)

export {
    project
}