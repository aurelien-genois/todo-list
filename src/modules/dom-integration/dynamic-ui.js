const tabsMenuToggle = ((doc) => {
  const tabsMenuBtn = doc.querySelector('.tabs-list-btn');
  const tabsList = tabsMenuBtn.parentNode;
  let setByUser = false;

  // initial check to set 'closed' class
  if (doc.body.clientWidth <= 800) {
    tabsMenuBtn.classList.add('closed');
    tabsList.classList.add('closed');
  }

  window.addEventListener('resize', () => {
    if (setByUser) return; // prevent closed if user open it
    if (doc.body.clientWidth <= 800) {
      tabsMenuBtn.classList.add('closed');
      tabsList.classList.add('closed');
    } else {
      tabsMenuBtn.classList.remove('closed');
      tabsList.classList.remove('closed');
    }
  });

  tabsMenuBtn.addEventListener('click', () => {
    setByUser = true;
    tabsMenuBtn.classList.toggle('closed');
    tabsList.classList.toggle('closed');
  });
})(document);

export { tabsMenuToggle };
