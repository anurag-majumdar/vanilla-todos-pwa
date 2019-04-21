import ToastComponent from './common/toast.component'
import { TimelineMax } from 'gsap';
import DrawSVGplugin from './../assets/js/DrawSVGPlugin';

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
        this.initAnimations();
        this.loadDefaultView();
        this.initEvents();
    },

    initAnimations() {
        this.animations = {
            animateLogo: (() => {
                var lines = document.querySelectorAll("#layer1 polyline"),
                    lines2 = document.querySelectorAll("#layer2 polyline"),
                    // circle = $("circle")[0],
                    tl = new TimelineMax(),
                    tl2 = new TimelineMax({yoyo:true, repeat: 30});

                let interval = 0.4;

                tl.from(lines, 0, {drawSVG:"0% 0%"})
                tl.from(lines2, 0, {drawSVG:"0% 0%"})

                tl.to(lines, 0, {drawSVG:"0%"})
                tl.to(lines2, 0, {drawSVG:"0%"})
                tl.to(lines2[0], 0, {drawSVG:"1%"})

                for(let i = 0; i < lines.length; i++){
                    let size = lines[i].points[2].x - lines[i].points[0].x;
                    if(size > 45){
                        tl.to(lines[i], interval, {drawSVG:"100%"})
                            .to(lines2[i], interval, {drawSVG:"99% 100%"}, "-="+interval)
                        if(i===5){
                            tl.to(lines[i], interval/2, {drawSVG: "0%"})
                                .to(lines2[i], interval/2, {drawSVG: "0% 1%" }, "-="+interval/2)
                                .to(lines[i], interval, {drawSVG:"100%", stroke: "#e4b723"})
                                .to(lines2[i], interval, {drawSVG:"99% 100%"}, "-="+interval)
                        }
                    } else if ( size > 20 ) {
                        tl.to(lines[i], interval/2, {drawSVG:"100%"})
                            .to(lines2[i], interval/2, {drawSVG:"99% 100%"}, "-="+interval/2)
                    } else {
                        tl.to(lines[i], interval/3, {drawSVG: "100%" })
                            .to(lines2[i], interval/3, {drawSVG: "99% 100%" }, "-="+interval/3)
                    }
                }

                tl.to([lines[10],lines[11]], interval/1.5, {y: -32, scale: 1.5})
                tl.to([lines[10],lines[11]], interval/1.5, {y: -84, scale: 1})
                tl.to([lines[6],lines[7],lines[8],lines[9]], interval/0.75, {y: 42}, "-="+interval/0.75);


                tl.delay(2);

// tl.fromTo(circle, 0.3,{x:"0"}, {x:"33"}, '-=0.9')
// .to(circle, 0.3, {x:"66"}, '-=0.6')
// .to(circle, 0.3, {x:"100"}, '-=0.3').pause()

                tl2.fromTo(lines2, 0.2, {"stroke-opacity":1},{"stroke-opacity":0.5})
                tl.pause();
                // tl2.pause();
                return () => {
                    tl.restart(true);
                    tl2.restart(true);
                };
            })(),
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
        this.currentPage.classList.add('slide');

        if(this.currentPage.id !== 'home'){
            this.loadModule(this.currentPage.id);
        } else {
            this.animations.animateLogo();
        }
    },

    clearView () {
        if( this.currentPage && this.currentMenuItem) {
            this.currentPage.classList.remove('slide');
            this.currentMenuItem.tagName === 'LI' ?
                this.currentMenuItem.firstElementChild.classList.remove('selected') :
                this.currentMenuItem.classList.remove('selected');
        }
    },

    loadModule (name) {
        import(/* webpackChunkName: "[request]" */ `./${name}/${name}.module`)
            .then(lazyModule => {
                lazyModule.default.init();
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