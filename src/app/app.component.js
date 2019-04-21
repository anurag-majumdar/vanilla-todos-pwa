import ToastComponent from './common/toast.component'
import { TimelineMax } from 'gsap';
import DrawSVGplugin from './../assets/js/DrawSVGPlugin';
import preloaderComponent from "./common/preloader";

const AppComponent = {

    init() {
        this.currentMenuItem = null;
        this.currentPage = null;
        this.body = document.querySelector('body');
        this.svgLogo = document.getElementById('bgSVG');
        this.menuButton = document.querySelector('.header__menu-btn');
        this.svgButton = document.getElementById('svgTeste');
        this.navbar = document.querySelector('.navbar');
        this.navbarMenuList = document.querySelector('.navbar__list');
        this.menuItems = [].slice.call(document.querySelectorAll('.navbar__list-item'));
        this.pageItems = [].slice.call(document.querySelectorAll('.page'));
        this.pageItemsMapByName = this.pageItems.reduce(
            (map, pageItem) => {
                map[pageItem.id] = pageItem;
                return map;
            }, {});
        this.preloader = preloaderComponent;
        this.preloader.init();
        this.setupAnimations();
        this.loadDefaultView();
        this.initEvents();
    },

    setupAnimations() {
        this.animations = {
            animateLogo: (() => {
                const interval = 0.8,
                    lines = this.svgLogo.querySelectorAll("#layer1 polyline"),
                    lines2 = this.svgLogo.querySelectorAll("#layer2 polyline"),
                    tl = new TimelineMax(),
                    tl2 = new TimelineMax({yoyo:true, repeat: 30}),
                    tl3 = new TimelineMax({yoyo:true, repeat: 30});



                let firstCursor = lines2[0];
                tl.from(firstCursor, 0, {drawSVG:"1%"})
                    .from(lines, 0, {drawSVG:"0%"})
                    .from(lines2, 0, {drawSVG:"0% 0%"})
                    .to(lines, 0, {drawSVG:"0%"})
                    .to(lines2, 0, {drawSVG:"0% 0%"})
                    .to(firstCursor, 0, {drawSVG:"1%"})

                for(let i = 0; i < lines.length; i++){
                    let size = lines[i].points[2].x - lines[i].points[0].x;
                    if(size > 45){
                        tl.to(lines[i], interval, {drawSVG:"100%"})
                            .to(lines2[i], interval, {drawSVG:"100% 100%"}, "-="+interval)
                        if(i===5){
                            tl.to(lines[i], interval/2, {drawSVG: "0%"})
                                .to(lines2[i], interval/2, {drawSVG: "0% 100%" }, "-="+interval/2)
                                .to(lines[i], interval, {drawSVG:"100%", stroke: "#e4b723"})
                                .to(lines2[i], interval, {drawSVG:"100% 100%"}, "-="+interval)
                        }
                    } else if ( size > 20 ) {
                        tl.to(lines[i], interval/2, {drawSVG:"100%"})
                            .to(lines2[i], interval/2, {drawSVG:"100% 100%"}, "-="+interval/2)
                    } else {
                        tl.to(lines[i], interval/3, {drawSVG: "100%" })
                            .to(lines2[i], interval/3, {drawSVG: "100% 100%" }, "-="+interval/3)
                    }
                }

                tl3.fromTo(firstCursor, 0.2, {strokeOpacity:1},{strokeOpacity:0.5})
                tl2.fromTo(lines2, 0.2, {strokeOpacity:1, immediateRender:false},{strokeOpacity:0.5})
                tl.delay(2);
                tl2.delay(2);
                tl.pause();
                tl2.pause();
                tl3.pause();
                return () => {
                    tl.restart(true);
                    tl2.restart(true);
                    tl3.restart(true);
                };
            })(),

            fadeoutPage: () => {

            },
        }
    },

    initEvents() {
        this.navbarMenuList.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList[0] === 'nav-icon') {
                if(this.currentMenuItem === e.target) return;
                this.clearView();
                this.currentMenuItem = e.target;
                this.currentPage = this.pageItemsMapByName[e.target.dataset.target];
                this.setUpView();
            } else if (e.target.classList[0] === 'navbar__list-item'){
                if(this.currentMenuItem === e.target) return;
                this.clearView();
                this.currentMenuItem = e.target;
                this.currentPage = this.pageItemsMapByName[e.target.firstElementChild.dataset.target];
                this.setUpView();
            }
        });

        this.menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.navbar.classList.toggle('show');
        });

        this.svgButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.animations.animateLogo();
        });
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

        // this.currentPage.classList.add('slide');

        if(this.currentPage.id !== 'home'){
            this.loadModule(this.currentPage.id);
        } else {
            this.preloader.fadeInPage(this.currentPage);
            this.animations.animateLogo();
        }
    },

    clearView () {
        if( this.currentPage && this.currentMenuItem) {
            // this.currentPage.classList.remove('slide');
            this.preloader.fadeOutPage(this.currentPage);
            this.currentMenuItem.tagName === 'LI' ?
                this.currentMenuItem.firstElementChild.classList.remove('selected') :
                this.currentMenuItem.classList.remove('selected');
        }
    },

    loadModule (name) {
        import(/* webpackChunkName: "[request]" */ `./${name}/${name}.module`)
            .then(lazyModule => {
                lazyModule.default.init(); // todo checar se ja carregado
                this.preloader.fadeInPage(this.currentPage);
            })
            .catch(error => {
                ToastComponent.showToast(error)
            });
    },


    render() {
        // this.appElement.innerHTML = appTemplate(AppModel);
    }
};

export default AppComponent;