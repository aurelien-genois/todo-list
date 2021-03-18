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
            return this.tasks.indexOf(task)
        },
        createTask(title, dueDate, priorityLevel, desc, projectId) {
            this.tasks.push(task(title, dueDate, priorityLevel, desc, projectId));
            domRenderTasks.renderTasks(this.tasks);
        },
        deleteTask(taskId, thisTabId) { 
            this.tasks.splice(taskId, 1);
            if (isNaN(Number(thisTabId))) { // if thisTabId is a general tab
                domRenderGeneralTabs.renderGeneralTabsTasks(thisTabId); // for re-filter the task-list
            } else {
                domRenderTasks.renderTasks(this.tasks);
            }
        }
    
    };
    return Object.assign(Object.create(proto), {tasks});
}
// (NTH function setProject for change the project for one task)

export {
    project
}