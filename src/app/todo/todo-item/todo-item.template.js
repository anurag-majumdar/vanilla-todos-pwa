export const todoItemTemplate = todo => `
    <li class="todo-item">
        <span class="todo-item-name"> ${todo.name} </span>
        <button id="${todo.id}" class="btn-delete-todo"> X </button>
    </li>
`;
