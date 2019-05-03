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
        this.element.querySelectorAll('.project').forEach(skill => {
            setTimeout(()=>{
                skill.classList.add('project--slide-in');
            },300)
        })
    }
};

export default WorkComponent;