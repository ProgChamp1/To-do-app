// selectors 
const todoInput = document.querySelector('input');
const todoButton = document.querySelector('button');
const todoList = document.querySelector('.todoList');

// event listeners 
todoButton.addEventListener('click', addtodo);
todoList.addEventListener('click', deleteCheck);



// functions 
 function addtodo(event){
     event.preventDefault();
    
     // create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todoDiv');
    
    // create li 
    const todoLi = document.createElement('li');
    todoLi.innerText = todoInput.value;
    todoLi.classList.add('todoItem');
    todoDiv.appendChild(todoLi);
    
    // check button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('checkButton');
    todoDiv.appendChild(checkButton); 
    
    // delete button 
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('deleteButton');
    todoDiv.appendChild(deleteButton);
    
    // append to list
    todoList.appendChild(todoDiv); 
    // clear todo input value 
    todoInput.value = "";


}

//function2 

function deleteCheck(e) {
    // for delete 
    const item = e.target;
    if (item.classList[0] === 'deleteButton'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        // functions waits for transition to end --> 
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    // for check 
    if (item.classList[0] === 'checkButton'){
        const todo = item.parentElement;
        todo.classList.add('completed');
        // functions waits for transition to end --> 
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }
}













