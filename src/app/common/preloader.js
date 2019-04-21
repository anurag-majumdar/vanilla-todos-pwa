import {TimelineMax, Power4} from 'gsap';

const preloaderComponent = {
    init() {
        this.element = document.querySelector('.preloader');
        this.svgLogo = document.getElementById('preloader-logo');
        this.animations = {
            start: null,
            end: null,
            locked: false,
            await: 2000,
        };
        this.animations.unlock = () => {
            this.animations.locked = false;
        };
        this.animations.lock = () => {
            this.animations.locked = true;
        };

        this.animateLogo = this.setupAnimateLogo();
    },

    fadeOutPage (page) {
        this.animations.fadeOutPage = new TimelineMax()
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

        const startAnimationIfUnlocked = () => {
            if(this.animations.locked) {
                setTimeout(startAnimationIfUnlocked, this.animations.await);
            } else {
                this.animations.lock();
                this.animateLogo();
                this.animations.fadeOutPage.play();
            }
        };
        startAnimationIfUnlocked();
    },

    fadeInPage (page) {
        this.animations.fadeInPage = new TimelineMax()
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

        const startAnimationIfUnlocked = () => {
            if(this.animations.locked) {
                setTimeout(startAnimationIfUnlocked, this.animations.await);
            } else {
                this.animations.lock();
                this.animations.fadeInPage.play();
            }
        };
        startAnimationIfUnlocked();

    },

    setupAnimateLogo () {
        const interval = 0.2,
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

        tl3.fromTo(firstCursor, 0.2, {strokeOpacity:1},{strokeOpacity:0.5});
        tl2.fromTo(lines2, 0.2, {strokeOpacity:1, immediateRender:false},{strokeOpacity:0.5});
        tl.delay(0.6);
        tl2.delay(0.6);

        tl.pause();
        tl2.pause();
        tl3.pause();
        return () => {
            tl.restart(true);
            tl2.restart(true);
            tl3.restart(true);
        };
    },
};

export default preloaderComponent;