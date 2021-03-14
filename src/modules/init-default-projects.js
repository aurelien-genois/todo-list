import {manageProjects} from './projects-manager.js'

// ! this is not projects, this is general tabs
// const today = manageProjects.createProject('Today', 'the today\'s tasks');
// const thisWeek = manageProjects.createProject('This week', 'Current week tasks');
// const highPriority = manageProjects.createProject('High priority', 'high priority projects');

manageProjects.createProject('One Project', 'One Proj Desc');
manageProjects.getProjects()[0].createTask('1 One Task TODAY THIS WEEK HIGH', 1, 1, 'desc');
manageProjects.getProjects()[0].createTask('1 Two Task HIGH', -1, 'desc', 1);
manageProjects.getProjects()[0].createTask('1 Three Task TODAY THIS WEEK', 1, 2, 'desc');

manageProjects.createProject('Two Project', 'Two Proj Desc');
manageProjects.getProjects()[1].createTask('2 One Task THIS WEEK HIGH', 2, 1, 'desc');

manageProjects.createProject('Three Project', 'Three Proj Desc');
manageProjects.getProjects()[2].createTask('3 One Task TODAY THIS WEEK ', 1, 3, 'desc');
manageProjects.getProjects()[2].createTask('3 Two Task HIGH', -1, 1,'desc');

// const defaultProjects = [today, thisWeek, highPriority];

export {
    // defaultProjects
}