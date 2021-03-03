
//? Esta clase contiene todos los metodos para hacer el crud de los todos(tareas)

import {Todo} from './todo.class';

export class TodoList{


    constructor() {
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.saveLocalStorage();

    }


    // Eliminar un solo todo 
    eliminartodo(id) {
        
        this.todos = this.todos.filter(todo => todo.id != id);
        this.saveLocalStorage();

    }

    

    marcarCompletado(id) {

        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.saveLocalStorage();

                break;
            }
        }

    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.saveLocalStorage();
    }


    saveLocalStorage() {
        localStorage.setItem("todo", JSON.stringify(this.todos));
    }


    cargarLocalStorage() {
        
        this.todos = (localStorage.getItem("todo")) 
                    ? JSON.parse(localStorage.getItem("todo")) 
                    : [];

        //! Convertir mis datos del localStorage en instacion de mi calse Todo
        this.todos = this.todos.map(obj => Todo.fromJson(obj));

        
    }
}