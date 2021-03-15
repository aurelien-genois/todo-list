import {task} from './modules/tasks-manager.js'
import {manageProjects} from './modules/projects-manager.js'
import {} from './modules/init-default-projects.js'
import {domRender} from './modules/dom-integration.js'
import {} from './modules/popup-forms.js'

console.log(manageProjects.getProjects());
domRender.initPageLoadTasks();

