import ContactComponent from "./contact.component";
import '../../assets/scss/skills.scss';
import '../../assets/scss/page.scss';
const ContactModule = {

    init() {
        this.initComponents();
    },

    initComponents() {
        ContactComponent.init();
    }
};

export default ContactModule;