import { manageProjects } from '../projects-manager.js';
import { domRenderTasks } from './render-tasks.js';
import { domRenderProjects } from './render-projects.js';
import { isToday, isThisWeek } from 'date-fns';

const domRenderGeneralTabs = ((doc) => {
  const initPageLoadTasks = () => {
    let allTasks = manageProjects.getAllProjectsTasks();
    domRenderTasks.renderTasks(allTasks);
  };

  const renderGeneralTabsTasks = (tabId) => {
    let allTasks = manageProjects.getAllProjectsTasks();
    let allTasksFiltered = [];
    switch (tabId) {
      case 'today':
        // DATE: select task where date = today
        allTasksFiltered = allTasks.filter((task) =>
          isToday(task.getDueDate()),
        );
        break;
      case 'this-week':
        // DATE: select task where date = this week
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

  const _generalTabsLis = [...doc.querySelector('#general-tabs').children];
  _generalTabsLis.map((genTab) =>
    genTab.addEventListener('click', (e) => {
      const whichTab = e.target.dataset.tab;
      const tabTitle = e.target.textContent;
      //NTH project desc for general tabs
      renderGeneralTabsTasks(whichTab);
      domRenderProjects.renderProjectDetails(whichTab, tabTitle);
    }),
  );

  return { initPageLoadTasks, renderGeneralTabsTasks };
})(document);

export { domRenderGeneralTabs };
