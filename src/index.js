import {task} from './modules/tasks-class.js'
import {manageProjects} from './modules/projects-manager.js'
import {} from './modules/init-default-projects.js'
import {domRenderTasks, domRenderProjects, domRenderGeneralTabs} from './modules/dom-integration.js'
import {} from './modules/popup-forms.js'

console.log(manageProjects.getProjects());
domRenderGeneralTabs.initPageLoadTasks();

