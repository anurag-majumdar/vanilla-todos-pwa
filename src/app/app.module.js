import AppComponent from './app.component';
import ToastComponent from "./common/toast.component";
import DrawSVGplugin from '../assets/js/DrawSVGPlugin';

export const App = {
    init() {
        this.initComponents();
        this.initServiceWorker();
    },

    initComponents() {
        ToastComponent.init();
        AppComponent.init();
    },

    initServiceWorker() {
        if (!navigator.serviceWorker) {
            return;
        }
        navigator.serviceWorker
            .register('./sw.js')
            .then(() => {
                console.log('sw registered successfully!');
            })
            .catch((error) => {
                console.log('Some error while registering sw:', error);
            });
    }
};