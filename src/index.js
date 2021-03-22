import {manageProjects} from './modules/projects-manager.js'
import {initDefaultProjects} from './modules/init-default-projects.js'
import {domRenderTasks, domRenderProjects, domRenderGeneralTabs} from './modules/dom-integration.js'
import {project} from './modules/projects-class.js'


const allProjects = JSON.parse(localStorage.getItem('projects')) || [];
// initDefaultProjects();
if (allProjects.length === 0) {
    initDefaultProjects();
} else {
    // set all projects an their task
    const protoObj =  project('','');
    const proto = Object.getPrototypeOf(protoObj)

    allProjects.map((project, id) => {
        const newProj = manageProjects.createProject(project.thisTitle, project.thisDesc);
        project.tasks.map(task => {
            const newTask = newProj.createTask(task.thisTitle, new Date(task.thisDueDate), task.thisPriorityValue, task.thisDesc, task.thisTaskProjectId);
            newTask.setState(task.stateDegree);
        });

        // return Object.assign(proto, project)
    })
    
    console.log('there is local save projects', protoObj, allProjects)
    // manageProjects.setProjects(allProjects);
    // domRenderProjects.renderProjectsTabs(allProjects)
}

console.log(manageProjects.getProjects())

domRenderGeneralTabs.initPageLoadTasks();

