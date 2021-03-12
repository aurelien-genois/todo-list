import {task} from './modules/tasks-manager.js'
import {manageProjects} from './modules/projects-manager.js'
import {} from './modules/init-default-projects.js'
import {dom} from './modules/dom-integration.js'

console.log(manageProjects.getProjects());
dom.initPageLoadTask();

