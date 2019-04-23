import HomeModel from "./home.model";
import {homeTemplate} from "./home.template";
import TimelineMax from "gsap/TimelineMax";


const HomeComponent = {
    init() {
        this.element = document.querySelector('.page');
        this.render();
    },

    animations: {
        animateLogo: (element) => {
            const interval = 0.3,
                lines = element.querySelectorAll("#layer1 polyline"),
                lines2 = element.querySelectorAll("#layer2 polyline"),
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
            tl.play();
            tl2.play();
            tl3.play();
        }
    },

    render() {
        this.element.innerHTML = homeTemplate(HomeModel);
        this.afterRender();
    },

    afterRender() {
        const svgLogo = document.getElementById('bgSVG'),
              svgButton = document.getElementById('svgTeste');

        svgButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.animations.animateLogo(svgLogo);
        });

        this.animations.animateLogo(svgLogo);
    }
};

export default HomeComponent;