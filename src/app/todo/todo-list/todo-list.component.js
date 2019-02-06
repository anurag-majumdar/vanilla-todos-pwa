import { todoListTemplate } from './todo-list.template';
import { todoItemTemplate } from '../todo-item/todo-item.template';
import { TodoModel } from '../todo.model';
import { TodoComponent } from '../todo.component';

export const TodoListComponent = {
    render(model) {
        const todosHTML = model.todos.reduce(
            (html, todo) => html + todoItemTemplate(todo),
            ''
        );
        return todoListTemplate(todosHTML);
    },
    afterRender(model) {
        const todoList = document.querySelector('.todo-list');

        todoList.addEventListener('click', event => {
            if (event.target.className === 'btn-delete-todo') {
                model.todos = TodoModel.todos.filter(
                    todo => todo.id !== Number(event.target.id)
                );
                TodoComponent.render();
            }
        });
    }
};
