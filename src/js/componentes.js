import {Todo} from '../classes';
import {todolist} from '../index';

// Referecia al HTML
const ulTodoList  =  document.querySelector('.todo-list');
const txtInput    =  document.querySelector('.new-todo');
const btnBorrar   =  document.querySelector('.clear-completed');
const ulFiltros   =  document.querySelector('.filters');
const aFiltro     =  document.querySelectorAll('.filtro')


/**
 *  
 * ! La siguiente  Codigo hace
 * 
 * * Crea el template para agregar un todo(tarea) al HTML
*/
export const creaerTodoHtml = (todo) => {

    // Template para mostar todos
    const todoHTML = `
     <li class="${ (todo.completado) ? 'completed'  :  ''  }" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox"  ${ (todo.completado) ? 'checked' : ''  } >
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
        <input class="edit" value="Create a TodoMVC template">
     </li>`;

    const div = document.createElement('div');
    div.innerHTML = todoHTML;

    // Insertar el template a su contenedor
    ulTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

//TODO *************************EVENTOS **************************



/**
 * !La Funcionalidad del siguiente codico es:
 * 
 *  *Obtener lo que escribe el usuario en el input y 
 *  * cuando presiona la tecla enter egraga ese nuevo 
 * * todo(Tarea). 
*/
txtInput.addEventListener('keyup', (e) => {

    if (e.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        todolist.nuevoTodo(nuevoTodo);
        creaerTodoHtml(nuevoTodo);
        txtInput.value = "";

    }

});




/**
 *  !La Funcionalidad del siguente codigo es:
 *  
 *  *Marcar como completado un todo(Tarea).
 *  *Eliminar un todo(Tarea).
*/
ulTodoList.addEventListener('click', e => {
    
     
    const nombreElemento  = e.target.localName; // Retorna el nombre del element clickciado
    const todoElemento    = e.target.parentElement.parentElement; // referencia al atributo data-id
    const todoId = todoElemento.getAttribute('data-id'); // Obtenemos el id del todo(tarea)  

    // Logica del click del checkBox (Marcar Un todo Como completado)
    if (nombreElemento.includes('input')) {
        todolist.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
        // console.log(todolist);
    }

    // Logica del click de button (Eliminar UN todo)
    if (nombreElemento.includes('button')) {
        // Eliminar del array todo el elemento 
        todolist.eliminartodo(todoId);

        // Eliminar del HTML el todo
        ulTodoList.removeChild(todoElemento);
    }
});



/**
 * 
 * * Borra los todos que esten completado.
 * 
*/

btnBorrar.addEventListener('click', () => { 

    todolist.eliminarCompletados();
    
    for (let i = ulTodoList.children.length - 1; i >= 0; i--){
        const elemento = ulTodoList.children[i];
        if (elemento.classList.contains('completed')) {
                ulTodoList.removeChild(elemento);
            }
    }
});


//! filtros
ulFiltros.addEventListener('click', e => {
    const filtro = e.target.text;
    if (!filtro) { return; }
    
    aFiltro.forEach(element => element.classList.remove('selected'));
    e.target.classList.add('selected');



    for (const elemento of  ulTodoList.children ) {
        elemento.classList.remove('hidden');
        const completo = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completo) {
                    elemento.classList.add('hidden');
                    }
                break;
        
            case 'Completados':
                if (!completo) {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
}); 


