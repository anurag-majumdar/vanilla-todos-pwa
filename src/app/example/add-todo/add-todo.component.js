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
    validateTextInput() {
        if (AddTodoModel.name === '' || AddTodoModel.name == null) {
            return false;
        }
        return true;
    },

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
            if (event.key === 'Enter' && this.validateTextInput()) {
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
            if (!this.validateTextInput()) {
                return;
            }
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