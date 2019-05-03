import { TodoComponent } from './todo.component';

export const TodoModule = {
    init() {
        this.initComponents();
    },

    initComponents() {
        TodoComponent.init();
    }
};
