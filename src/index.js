import {manageProjects} from './modules/projects-manager.js'
import {initDefaultProjects} from './modules/init-default-projects.js'
import {domRenderTasks, domRenderProjects, domRenderGeneralTabs} from './modules/dom-integration.js'

initDefaultProjects();

domRenderGeneralTabs.initPageLoadTasks();

console.log(manageProjects.getProjects());
