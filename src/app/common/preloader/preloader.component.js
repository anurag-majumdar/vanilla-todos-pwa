import {TimelineMax, Power4} from 'gsap';
import preloaderTemplate from "./preloader.template";

const preloaderComponent = {
    init() {
        this.element = document.querySelector('.preloader');
        this.animations = {
            start: null,
            end: null,
            locked: false,
            await: 1000,
        };
        this.animations.unlock = () => {
            this.animations.locked = false;
        };
        this.animations.lock = () => {
            this.animations.locked = true;
        };

    },

    fadeOutPageSlideInPreloader (page) {
        const startAnimationIfUnlocked = () => {
            if(this.animations.locked) {
                setTimeout(startAnimationIfUnlocked, this.animations.await);
                return;
            }
            this.animations.lock();
            this.animateLogo();
            this.animations.fadeOutPageSlideInPreloader = new TimelineMax()
                .to(
                    page,
                    0.4,
                    {
                        immediateRender: false,
                        opacity: 0.0,
                        scale: 0.85,
                        ease: Power4.easeOut,
                    })
                .to(
                    page,
                    0,
                    {
                        x: '100%',
                    }
                )
                .fromTo(
                    this.element,
                    0.4,
                    {
                        immediateRender: false,
                        x: '-100%',
                        ease: Power4.easeOut
                    },
                    {
                        x: '0%',
                        onComplete: this.animations.unlock
                    }, 0.3)
                .pause();
            this.animations.fadeOutPageSlideInPreloader.play();
        };
        startAnimationIfUnlocked();
    },

    fadeInPageSlideOutPreloader (page, newModule) {
        const startAnimationIfUnlocked = () => {
            if(this.animations.locked) {
                setTimeout(startAnimationIfUnlocked, this.animations.await);
                return;
            }

            this.animations.lock();
            newModule.init();
            this.animations.fadeInPageSlideOutPreloader = new TimelineMax()
                .fromTo(
                    page,
                    1,
                    {
                        immediateRender: true,
                        opacity: 0,
                        scale: 0.85,
                        x: '0%'
                    },
                    {
                        opacity: 1,
                        scale: 1
                    }, 0.3)
                .fromTo(
                    this.element,
                    1,
                    {
                        immediateRender: false,
                        x: '0%',
                        ease: Power4.easeIn
                    },
                    {
                        x: '100%',
                        onComplete: this.animations.unlock,
                    }, 0)
                .pause();
            this.animations.fadeInPageSlideOutPreloader.play();

        };
        startAnimationIfUnlocked();

    },

    simpleFadeInPage (page) {
        this.animations.simpleFadeInPage = new TimelineMax()
            .fromTo(
                page,
                1,
                {
                    immediateRender: true,
                    opacity: 0,
                    scale: 0.85,
                    x: '0%'
                },
                {
                    opacity: 1,
                    scale: 1,
                    onComplete: this.animations.unlock,
                }, 0.3)
            .pause();

        const startAnimationIfUnlocked = () => {
            if(this.animations.locked) {
                setTimeout(startAnimationIfUnlocked, this.animations.await);
            } else {
                this.animations.lock();
                this.animations.simpleFadeInPage.play();
            }
        };
        startAnimationIfUnlocked();

    },

    setupAnimateLogo (logo) {
        const interval = 0.1,
            lines = logo.querySelectorAll("#layer1 polyline"),
            lines2 = logo.querySelectorAll("#layer2 polyline"),
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

        tl3.fromTo(firstCursor, 0.2, {strokeOpacity:1},{strokeOpacity:0.5});
        tl2.fromTo(lines2, 0.2, {strokeOpacity:1, immediateRender:false},{strokeOpacity:0.5});
        tl.delay(0.15);
        tl2.delay(0.15);

        tl.pause();
        tl2.pause();
        tl3.pause();
        return () => {
            tl.restart(true);
            tl2.restart(true);
            tl3.restart(true);
        };

    },

    render () {
        this.element.innerHTML = preloaderTemplate();
    },

    afterRender () {
        const logo = document.getElementById('preloader-logo');
        this.animateLogo = this.setupAnimateLogo(logo);
    }
};

export default preloaderComponent;