import {task, taskProto} from './modules/tasks-manager.js'


let testTask = task('Test Task', 30, 'fe', 4)
let task2 = task('task 2', 1)

taskProto.addTaskPriority(4,'VeryLow') // with position and label of new State/priority
taskProto.addTaskState(1,'Done Well') // function indepent from task factory


console.log(testTask, task2)
console.log(testTask.getState(), task2.getState())