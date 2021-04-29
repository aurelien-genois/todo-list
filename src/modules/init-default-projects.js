import { manageProjects } from './projects-manager.js';
import { add } from 'date-fns';

let today = new Date();
let thisWeekDay1 = add(today, { days: 1 });
let pastDay1 = new Date(2021, 0, 3);
let thisWeekDay2 = add(today, { days: 2 });
let pastDay2 = new Date(2020, 11, 3);

const initDefaultProjects = () => {
  manageProjects.createProject('One Project', 'One Proj Desc');
  manageProjects
    .getProjects()[0]
    .createTask('1 One today', today, 1, 'desc', 0);
  manageProjects
    .getProjects()[0]
    .createTask('1 Two thisWeekDay1', thisWeekDay1, 1, 'desc', 0);
  manageProjects
    .getProjects()[0]
    .createTask('1 Three pastDay1', pastDay1, 2, 'desc', 0);

  manageProjects.createProject('Two Project', 'Two Proj Desc');
  manageProjects
    .getProjects()[1]
    .createTask('2 One thisWeekDay2', thisWeekDay2, 1, 'desc', 1);

  manageProjects.createProject('Three Project', 'Three Proj Desc');
  manageProjects
    .getProjects()[2]
    .createTask('3 One pastDay2', pastDay2, 3, 'desc', 2);
  manageProjects
    .getProjects()[2]
    .createTask('3 Two today', today, 1, 'desc', 2);
};
export { initDefaultProjects };
