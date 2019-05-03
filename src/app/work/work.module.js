import WorkComponent from "./work.component";
import '../../assets/scss/work.scss';
import '../../assets/scss/page.scss';
const WorkModule = {

    init() {
        this.initComponents();
    },

    initComponents() {
        WorkComponent.init();
    }
};

export default WorkModule;