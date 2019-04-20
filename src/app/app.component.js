import ToastComponent from './common/toast.component'

const AppComponent = {

    init() {
        this.currentMenuItem = null;
        this.currentPage = null;
        this.body = document.querySelector('body');
        this.menuButton = document.querySelector('.header__menu-btn');
        this.navbarMenuList = document.querySelector('.navbar__list');
        this.menuItems = [].slice.call(document.querySelectorAll('.navbar__list-item'));
        this.pageItems = [].slice.call(document.querySelectorAll('.page'));
        this.pageItemsMapByName = this.pageItems.reduce(
            (map, pageItem) => {
                map[pageItem.id] = pageItem;
                return map;
            }, {});
        this.loadDefaultView();
        this.initEvents();
    },

    initEvents() {

    },

    loadDefaultView () {
        this.currentMenuItem = this.menuItems[0];
        this.currentPage = this.pageItems[0];
        this.setUpView();
    },

    setUpView () {
        if (this.currentMenuItem.tagName === "LI") {
            this.currentMenuItem.firstElementChild.classList.add('selected');
        } else {
            this.currentMenuItem.classList.add('selected');
        }
        this.currentPage.classList.add('slide');
        ToastComponent.showToast(`${this.currentPage.id} Page.`);
        switch (this.currentPage.id) {
            case 'skills': loadModule(this.currentPage.id);
        }

    },

    loadModule (name) {
        import( /* webpackChunkName: "todo" */ `./${name}/${name}.module`)
            .then(lazyModule => {
                lazyModule.init();
            })
            .catch(error => {
                ToastComponent.showToast("Network error. Please try again.")
            });
    },

    render() {
        // this.appElement.innerHTML = appTemplate(AppModel);
    }
};

export default AppComponent;