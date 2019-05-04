import ContactModel from "./contact.model";
import {contactTemplate} from "./contact.template";


const ContactComponent = {
    init() {
        this.element = document.querySelector('.page');
        this.render();
    },

    render() {
        this.element.innerHTML = contactTemplate(ContactModel);
        this.afterRender();
    },

    afterRender() {
        document.querySelector('main').scrollTop = 0;
        this.element.querySelectorAll('.skill__progress').forEach(skill => {
            setTimeout(()=>{
                skill.style.height = skill.dataset.progress + '%';
                skill.parentElement.parentElement.classList.add('skill--slide-in');
            },300)
        })
    }
};

export default ContactComponent;