import HomeComponent from "./home.component";
import css from '../../assets/scss/home.scss';
const HomeModule = {

    init() {
        this.initComponents();
    },

    initComponents() {
        HomeComponent.init();
    }
};

export default HomeModule;