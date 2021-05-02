import { task } from './tasks-class.js';

const project = (title, desc) => {
  // public values important for localStorage
  let tasks = [];
  let thisTitle = title;
  let thisDesc = desc;
  const proto = {
    // use this in regular function, not arrow functions in which this is lexically bound
    getTitle() {
      return this.thisTitle;
    },
    setTitle(newTitle) {
      this.thisTitle = newTitle;
    },
    getDesc() {
      return this.thisDesc;
    },
    setDesc(newDesc) {
      this.thisDesc = newDesc;
    },
    getTasks() {
      return this.tasks;
    },
    getTask(taskId) {
      return this.tasks[taskId];
    },
    getTaskId(task) {
      return this.tasks.indexOf(task);
    },
    createTask(title, dueDate, priorityLevel, thisDesc, projectId) {
      const newTask = task(title, dueDate, priorityLevel, thisDesc, projectId);
      this.tasks.push(newTask);
      return newTask;
    },
    deleteTask(taskId) {
      this.tasks.splice(taskId, 1);
    },
  };
  return Object.assign(Object.create(proto), { tasks, thisTitle, thisDesc });
};
// (NTH function setProject for change the project for one task)

export { project };
