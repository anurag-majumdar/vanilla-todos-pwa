import HomeComponent from "./home.component";
import css from '../../assets/scss/about.scss';
const HomeModule = {

    init() {
        this.initComponents();
    },

    initComponents() {
        HomeComponent.init();
    }
};

export default HomeModule;