import ToastComponent from './common/toast.component'
import { TimelineMax } from 'gsap';
import DrawSVGplugin from '../assets/js/vendor/DrawSVGPlugin';
import preloader from "./common/preloader/preloader.component";

const AppComponent = {

    init() {
        this.currentMenuItem = null;
        this.currentPageID = null;
        this.page = document.querySelector('.page');
        this.body = document.querySelector('body');
        this.menuButton = document.querySelector('.header__menu-btn');
        this.navbar = document.querySelector('.navbar');
        this.navbarMenuList = document.querySelector('.navbar__list');
        this.menuItems = [].slice.call(document.querySelectorAll('.navbar__list-item'));
        this.preloader = preloader;
        this.preloader.init();
        this.loadDefaultView();
        this.initEvents();
        this.render();
    },
    
    initEvents() {
        this.navbarMenuList.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList[0] === 'nav-icon') {
                if(this.currentMenuItem === e.target) return;
                this.clearView();
                this.currentMenuItem = e.target;
                this.currentPageID = e.target.dataset.target;
                this.setUpView();
            } else if (e.target.classList[0] === 'navbar__list-item'){
                if(this.currentMenuItem === e.target) return;
                this.clearView();
                this.currentMenuItem = e.target;
                this.currentPageID = e.target.firstElementChild.dataset.target;
                this.setUpView();
            }
        });

        this.menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.navbar.classList.toggle('show');
        });
    },

    loadDefaultView () {
        this.currentMenuItem = this.menuItems[0];
        this.currentPageID = this.currentMenuItem.dataset.target;
        this.setUpView(true);
    },

    setUpView (isFirstRender) {
        if (this.currentMenuItem.tagName === "LI") {
            this.currentMenuItem.firstElementChild.classList.add('selected');
        } else {
            this.currentMenuItem.classList.add('selected');
        }

        this.loadPage(this.currentPageID, isFirstRender);

    },

    clearView () {
        if( this.currentPageID && this.currentMenuItem) {
            // this.currentPage.classList.remove('slide');
            this.preloader.fadeOutPageSlideInPreloader(this.page);
            this.currentMenuItem.tagName === 'LI' ?
                this.currentMenuItem.firstElementChild.classList.remove('selected') :
                this.currentMenuItem.classList.remove('selected');
        }
    },

    loadPage (name, isFirstRender) {
        import(/* webpackChunkName: "[request]" */ `./${name}/${name}.module`)
            .then(lazyModule => {
                if(!isFirstRender) {
                    this.preloader.fadeInPageSlideOutPreloader(this.page, lazyModule.default);
                } else {
                    lazyModule.default.init();
                    this.preloader.simpleFadeInPage(this.page)
                }
            })
            .catch(error => {
                ToastComponent.showToast(error)
            });
    },


    render() {
        this.preloader.render();
        this.afterRender()
    },


    afterRender () {
        this.preloader.afterRender();
    },
};

export default AppComponent;