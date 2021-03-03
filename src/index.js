import './styles.css'; //! Importa nuestros estilos globales
import {Todo, TodoList} from './classes';
import { creaerTodoHtml } from './js/componentes';
export const todolist = new TodoList();


todolist.todos.forEach(creaerTodoHtml);

console.log(todolist);











