import {project, manageProjects} from './projects-manager.js'

// ! this is not projects, this is general tabs
// const today = manageProjects.createProject('Today', 'the today\'s tasks');
// const thisWeek = manageProjects.createProject('This week', 'Current week tasks');
// const highPriority = manageProjects.createProject('High priority', 'high priority projects');

manageProjects.createProject('One Project', 'One Proj Desc');
manageProjects.getProjects()[0].createTask('1 One Task', 'DATE', 'desc', 2);
manageProjects.getProjects()[0].createTask('1 Two Task', 'DATE', 'desc', 2);
manageProjects.getProjects()[0].createTask('1 Three Task', 'DATE', 'desc', 2);

manageProjects.createProject('Two Project', 'Two Proj Desc');
manageProjects.getProjects()[1].createTask('2 One Task', 'DATE', 'desc', 2);

manageProjects.createProject('Three Project', 'Three Proj Desc');
manageProjects.getProjects()[2].createTask('3 One Task', 'DATE', 'desc', 2);
manageProjects.getProjects()[2].createTask('3 Two Task', 'DATE', 'desc', 2);

// const defaultProjects = [today, thisWeek, highPriority];

export {
    // defaultProjects
}