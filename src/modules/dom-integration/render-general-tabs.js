import { manageProjects } from '../projects-manager.js';
import { domRenderTasks } from './render-tasks.js';
import { domRenderProjects } from './render-projects.js';
import { isToday, isThisWeek } from 'date-fns';

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
    let allTasks = manageProjects.getAllProjectsTasks();
    // close all tasks
    allTasks.forEach((task) => task.setIsExpand(false));
    domRenderTasks.renderTasks(allTasks);
  };

  const renderGeneralTabsTasks = (tabId) => {
    let allTasks = manageProjects.getAllProjectsTasks();
    let allTasksFiltered = [];
    switch (tabId) {
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
      case 'high-priority':
        allTasksFiltered = allTasks.filter(
          (task) => task.getPriority() === 'High',
        );
        break;
      case 'all-tasks':
        allTasksFiltered = [...allTasks];
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
      renderGeneralTabsTasks(whichTab);
      domRenderProjects.renderProjectDetails(whichTab, tabTitle);
    }),
  );

  return { removeTabsSelectState, initPageLoadTasks, renderGeneralTabsTasks };
})(document);

export { domRenderGeneralTabs };
