import WorkModel from "./work.model";
import {workTemplate} from "./work.template";



const WorkComponent = {
    init() {
        this.element = document.querySelector('.page');
        this.render();
    },

    render() {
        this.element.innerHTML = workTemplate(WorkModel);
        this.afterRender();
    },

    afterRender() {
        document.querySelector('main').scrollTop = 0;
        let delay = 0;
        this.element.querySelectorAll('.project').forEach(skill => {
            skill.style.transitionDelay = delay + 'ms';
            delay += 150;
            setTimeout(()=>{
                skill.classList.add('project--slide-in');
            }, delay)
        })
    }
};

export default WorkComponent;