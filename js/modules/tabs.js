function tabs(tabsSelector, tabsParentSelector, tabsContentSelector, activeClass) {
    
    const tabsMenu = document.querySelector(tabsParentSelector),
          tabsItems = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector);

    function showTabContent (i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');

        tabsItems[i].classList.add(activeClass);
    }
    function hideTabContent() {
        
        tabsContent.forEach((val, ind) => {
            val.classList.remove('show', 'fade');
            val.classList.add('hide');
            tabsItems[ind].classList.remove(activeClass);
        });
    }

    hideTabContent();
    showTabContent();

    tabsMenu.addEventListener('click', e => {
        e.preventDefault();

        if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
            tabsItems.forEach((val, ind) => {
                if (val == e.target) {
                    hideTabContent();
                    showTabContent(ind);
                }
            });
        }
    });
}

export default tabs;