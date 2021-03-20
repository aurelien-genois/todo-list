import {manageProjects} from './projects-manager.js'

const initDefaultProjects = () => {
    manageProjects.createProject('One Project', 'One Proj Desc');
    manageProjects.getProjects()[0].createTask('1 One Task TODAY THIS WEEK', 1, 1, 'desc',0);
    manageProjects.getProjects()[0].createTask('1 Two Task', -1,1, 'desc', 0);
    manageProjects.getProjects()[0].createTask('1 Three Task TODAY THIS WEEK', 1, 2, 'desc',0);
    
    manageProjects.createProject('Two Project', 'Two Proj Desc');
    manageProjects.getProjects()[1].createTask('2 One Task THIS WEEK', 2, 1, 'desc',1);
    
    manageProjects.createProject('Three Project', 'Three Proj Desc');
    manageProjects.getProjects()[2].createTask('3 One Task TODAY THIS WEEK ', 1, 3, 'desc',2);
    manageProjects.getProjects()[2].createTask('3 Two Task', -1, 1,'desc',2);
}    
export {
    initDefaultProjects
}