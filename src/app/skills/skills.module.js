import SkillsComponent from "./skills.component";
import '../../assets/scss/skills.scss';
import '../../assets/scss/page.scss';
const SkillsModule = {

    init() {
        this.initComponents();
    },

    initComponents() {
        SkillsComponent.init();
    }
};

export default SkillsModule;