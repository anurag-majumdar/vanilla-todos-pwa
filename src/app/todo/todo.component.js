import {
    AddTodoComponent
} from './add-todo/add-todo.component';
import {
    TodoListComponent
} from './todo-list/todo-list.component';
import {
    TodoModel
} from './todo.model';
import {
    AddTodoModel
} from './add-todo/add-todo.model';

export const TodoComponent = {
    init() {
        this.appElement = document.querySelector('#app');
        this.render();
    },
    render() {
        let todoComponentViewHTML = '<section class="todo">';
        todoComponentViewHTML += AddTodoComponent.render(AddTodoModel);
        todoComponentViewHTML += TodoListComponent.render(TodoModel);
        todoComponentViewHTML += '</section>';

        this.appElement.innerHTML = todoComponentViewHTML;
        this.afterRender();
    },

    afterRender() {
        AddTodoComponent.afterRender(AddTodoModel);
        TodoListComponent.afterRender(TodoModel);
    }
};