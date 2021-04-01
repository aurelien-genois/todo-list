import {manageProjects} from './modules/projects-manager.js'
import {initDefaultProjects} from './modules/init-default-projects.js'
import {domRenderProjects, domRenderGeneralTabs} from './modules/dom-integration.js'
import {project} from './modules/projects-class.js'
import {task} from './modules/tasks-class.js'
import { parseISO} from 'date-fns'



const allProjects = JSON.parse(localStorage.getItem('projects')) || [];

if (allProjects.length === 0) { // if no LocalStorage
    initDefaultProjects();
} else { // if LocalStorage
    // get and set the prototype (for methods) to the localStorage objects
    const protoProject = Object.getPrototypeOf(project('',''))
    const protoTask = Object.getPrototypeOf(task('', new Date(), 0, '', 0))
    allProjects.map(project => {
        Object.setPrototypeOf(project, protoProject);
        project.tasks.map(task => {
            Object.setPrototypeOf(task, protoTask);
            // parseISO() because LocalFormat convert Date to string, need to convert it back to Date format
            // can also create a new date : new Date(task.thisDueDate)
            task.setDueDate(parseISO(task.thisDueDate))
        });
    })
    manageProjects.setProjects(allProjects);
    domRenderProjects.renderProjectsTabs(allProjects)
}

console.log(manageProjects.getProjects())

domRenderGeneralTabs.initPageLoadTasks();

