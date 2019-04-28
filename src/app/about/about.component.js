import AboutModel from "./about.model";
import {aboutTemplate} from "./about.template";


const AboutComponent = {
    init() {
        this.element = document.querySelector('.page');
        this.render();
    },

    render() {
        this.element.innerHTML = aboutTemplate(AboutModel);
        this.afterRender();
    },

    afterRender() {
        document.querySelector('main').scrollTop = 0;
    }
};

export default AboutComponent;