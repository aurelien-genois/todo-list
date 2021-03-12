import {task} from './modules/tasks-manager.js'
import {project} from './modules/projects-manager.js'


let testProject = project('project Title', 'project Desc');
console.log(testProject);

testProject.createTask('task1', 45, 'desc');
testProject.createTask('task2', 20, '', 3);
testProject.getTask(1).setState(1);
// console.log(testProject.getTasks());

testProject.deleteTask(testProject.getTask(0));
// console.log(testProject.getTasks());