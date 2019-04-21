import AboutComponent from "./about.component";
import css from '../../assets/scss/about.scss';
const AboutModule = {

    init() {
        this.initComponents();
    },

    initComponents() {
        AboutComponent.init();
    }
};

export default AboutModule;