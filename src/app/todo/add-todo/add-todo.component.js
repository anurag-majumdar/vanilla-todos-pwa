import {
    addTodoTemplate
} from './add-todo.template';
import {
    TodoComponent
} from '../todo.component';
import {
    TodoModel
} from '../todo.model';
import {
    AddTodoModel
} from './add-todo.model';

export const AddTodoComponent = {
    render() {
        return addTodoTemplate();
    },

    afterRender(model) {
        const txtTodo = document.querySelector('.txt-todo');
        const btnAddTodo = document.querySelector('.btn-add-todo');

        txtTodo.addEventListener('change', event => {
            model.name = event.target.value;
        });

        txtTodo.addEventListener('keyup', event => {
            if (event.key === 'Enter') {
                const todo = {
                    id: Date.now(),
                    name: AddTodoModel.name
                };
                AddTodoModel.name = '';
                // Modify parent component model and trigger change explicitly
                TodoModel.todos = [
                    ...TodoModel.todos,
                    todo
                ];
                event.target.value = '';
                TodoComponent.render();
            }
        });

        btnAddTodo.addEventListener('click', event => {
            const todo = {
                id: Date.now(),
                name: AddTodoModel.name
            };
            AddTodoModel.name = '';
            // Modify parent component model and trigger change explicitly
            TodoModel.todos = [...TodoModel.todos, todo];
            event.target.previousElementSibling.value = '';
            TodoComponent.render();
        });
    }
};