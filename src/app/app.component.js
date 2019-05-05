import ToastComponent from './common/toast.component'
import { TimelineMax } from 'gsap';
import DrawSVGplugin from '../assets/js/vendor/DrawSVGPlugin';
import preloader from "./common/preloader/preloader.component";
import debounce from "./common/utils/debounce";
import logoTemplate from "./common/logo.template";

const AppComponent = {

    init() {
        this.currentMenuItem = null;
        this.currentPageID = null;
        this.page = document.querySelector('.page');
        this.body = document.querySelector('body');
        this.menuButton = document.querySelector('.header__menu-btn');
        this.logo = document.querySelector('.header__logo a');
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
        window.addEventListener('resize', debounce((e) => {

            this.responsiveLogo();

        }, 100, false), false);
        this.menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.navbar.classList.toggle('navbar--show');
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

    responsiveLogo () {
        const mq = window.matchMedia( "(min-width: 900px)" );
        if (mq.matches) {
            if(this.media === 'desktop') return;
            this.media = 'desktop';
            this.logo.innerHTML = logoTemplate('header-logo', true);
            this.logo.classList.add('svg-logo')

        } else {
            if(this.media === 'mobile') return;
            this.media = 'mobile';
            this.logo.textContent = 'Tenorius.com';
            this.logo.classList.remove('svg-logo')
        }
    },

    render() {
        this.preloader.render();
        this.afterRender();
        this.responsiveLogo();
    },


    afterRender () {
        this.preloader.afterRender();
    },


};

export default AppComponent;