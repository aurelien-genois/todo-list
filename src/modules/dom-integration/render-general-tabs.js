import { manageProjects } from '../projects-manager.js';
import { domRenderTasks } from './render-tasks.js';
import { domRenderProjects } from './render-projects.js';
import { isToday, isPast, isThisWeek } from 'date-fns';

const domRenderGeneralTabs = ((doc) => {
  const _projectsUl = doc.querySelector('#projects-tabs');
  const _generalTabsLis = [...doc.querySelector('#general-tabs').children];

  const removeTabsSelectState = () => {
    _generalTabsLis.forEach((li) => {
      li.classList.remove('selected');
    });
    _projectsUl.querySelectorAll('li').forEach((li) => {
      li.classList.remove('selected');
    });
  };

  const initPageLoadTasks = () => {
    const allTasks = manageProjects.getAllProjectsTasks();
    // close all tasks
    allTasks.forEach((task) => task.setIsExpand(false));
    const allprojects = manageProjects.getProjects();
    domRenderProjects.renderProjectsTabs(allprojects);
    domRenderTasks.renderTasks(allTasks);
  };

  const renderGeneralTabsTasks = (tabId) => {
    let allTasks = manageProjects.getAllProjectsTasks();
    let allTasksFiltered = [];
    switch (tabId) {
      case 'all-tasks':
        allTasksFiltered = [...allTasks];
        break;
      case 'today':
        allTasksFiltered = allTasks.filter((task) =>
          isToday(task.getDueDate()),
        );
        break;
      case 'this-week':
        allTasksFiltered = allTasks.filter((task) =>
          isThisWeek(task.getDueDate()),
        );
        break;
      case 'late':
        allTasksFiltered = allTasks.filter((task) => {
          if (isToday(task.getDueDate()) || task.getState() === 'Done') {
            return;
          }
          return isPast(task.getDueDate());
        });
        break;
      case 'high-priority':
        allTasksFiltered = allTasks.filter(
          (task) => task.getPriority() === 'High',
        );
        break;
      case 'medium-priority':
        allTasksFiltered = allTasks.filter(
          (task) => task.getPriority() === 'Medium',
        );
        break;
      case 'low-priority':
        allTasksFiltered = allTasks.filter(
          (task) => task.getPriority() === 'Low',
        );
        break;
      case 'done':
        allTasksFiltered = allTasks.filter(
          (task) => task.getState() === 'Done',
        );
        break;
      case 'wip':
        allTasksFiltered = allTasks.filter((task) => task.getState() === 'WIP');
        break;
      case 'abandoned':
        allTasksFiltered = allTasks.filter(
          (task) => task.getState() === 'Abandoned',
        );
        break;
    }
    domRenderTasks.renderTasks(allTasksFiltered);
  };

  _generalTabsLis.map((genTab) =>
    genTab.addEventListener('click', (e) => {
      const whichTab = e.target.dataset.tab;
      const tabTitle = e.target.textContent;
      removeTabsSelectState();
      e.target.classList.add('selected');
      // close all tasks
      manageProjects
        .getAllProjectsTasks()
        .forEach((task) => task.setIsExpand(false));
      domRenderProjects.renderProjectDetails(whichTab, tabTitle);
      renderGeneralTabsTasks(whichTab);
    }),
  );

  return { removeTabsSelectState, initPageLoadTasks, renderGeneralTabsTasks };
})(document);

export { domRenderGeneralTabs };
