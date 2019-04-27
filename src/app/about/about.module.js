import AboutComponent from "./about.component";
import '../../assets/scss/about.scss';
import '../../assets/scss/page.scss';
const AboutModule = {

    init() {
        this.initComponents();
    },

    initComponents() {
        AboutComponent.init();
    }
};

export default AboutModule;