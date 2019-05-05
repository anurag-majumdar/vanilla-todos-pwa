import SkillsModel from "./skills.model";
import {skillsTemplate} from "./skills.template";


const SkillsComponent = {
    init() {
        this.element = document.querySelector('.page');
        this.render();
    },

    render() {
        this.element.innerHTML = skillsTemplate(SkillsModel);
        this.afterRender();
    },

    afterRender() {
        document.querySelector('main').scrollTop = 0;
        let delay = 0;
        this.element.querySelectorAll('.skill__progress').forEach(skill => {
            skill.parentElement.parentElement.style.transitionDelay = delay + 'ms';
            delay += 150;
            setTimeout(()=>{
                skill.style.height = skill.dataset.progress + '%';
                skill.parentElement.parentElement.classList.add('skill--slide-in');
            },300)
        })
    }
};

export default SkillsComponent;