import {task} from './tasks-class.js'
import {domRenderTasks, domRenderProjects, domRenderGeneralTabs} from './dom-integration.js'

const project = (title, desc) => {
    // // private array
    // public values important for localStorage
    let tasks = [];
    let thisTitle = title;
    let thisDesc = desc;
    const proto = {
        getTitle: () => thisTitle,
        setTitle: (newTitle) => thisTitle = newTitle,
        getDesc: () => thisDesc,
        setDesc: (newDesc) => thisDesc = newDesc,
        getTasks() {
            return tasks;
        },
        getTask(taskId) {
            return tasks[taskId];
        },
        getTaskId(task) {
            return tasks.indexOf(task)
        },
        createTask(title, dueDate, priorityLevel, thisDesc, projectId) {
            const newTask = task(title, dueDate, priorityLevel, thisDesc, projectId);
            tasks.push(newTask);
            domRenderTasks.renderTasks(tasks);
            domRenderProjects.updateLocalStorage();
            return newTask;
        },
        deleteTask(taskId) { 
            tasks.splice(taskId, 1);
        }
    };
    return Object.assign(Object.create(proto), {tasks, thisTitle, thisDesc});
}
// (NTH function setProject for change the project for one task)

export {
    project
}