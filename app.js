(function () {
  /**
   *
   * @param {HTMLElement} e
   * @param {*} cls
   * equivalent to e.classList.toggle(cls)
   */
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      const later = () => {
        timeout = null;
        func.apply(context, args);
      };
      const callNow = !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  function toggleClass(e, cls) {
    if (e.classList.contains(cls)) {
      return e.classList.remove(cls);
    }
    return e.classList.add(cls);
  }
  
  function setupInputElement(inp) {
    const id = inp.dataset.id;
    const getTodo = () => getTodoObj()[id];
    inp.addEventListener(
      "input",
      debounce(() => {
        const value = inp.value;
        if (value && value.trim()) {
          const t = getTodo();
          t.text = value;
          const todos = getTodoObj();
          todos[id] = t;
          saveTodoToLocalStorage(todos);
        }
      }, 300)
    );
    inp.addEventListener("blur", () => {
      const val = inp.value;
      console.log(val);
      if (!val) {
        const el = document.querySelector("[data-deletes='" + id + "'");
        el.click();
      }
    });
  }
  // selectors
  const todoInput = document.querySelector("input");
  const todoList = document.querySelector(".todoList");
  const form = document.querySelector("#input-form");

  // event listeners
  document.addEventListener("DOMContentLoaded", getTodos);
  form.addEventListener("submit", addtodo);

  // functions
  function addtodo(event) {
    event.preventDefault();
    const val = todoInput.value;
    if (!val.trim().length) return;
    const obj = { text: val, completed: false, id: +new Date() };
    saveLocalTodos(obj);
    todoInput.value = "";
    createNewTodoElement(obj);
  }

  function checkTodo(e) {
    const currentTarget = e.currentTarget;
    const id = currentTarget.dataset.id;
    toggleCompletedState(id);
    toggleClass(
      document.querySelector("input[data-id='" + id + "']"),
      "completed"
    );
  }
  function deleteTodo(e) {
    const currentTarget = e.currentTarget;
    const id = currentTarget.dataset.id;
    removeLocalTodos(id);
    const container = document.querySelector("[data-owner-of='" + id + "']");
    container.remove();
  }
  function createNewTodoElement(todo) {
    // create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");

    // create li
    const todoLi = document.createElement("li");
    const inp = document.createElement("input");
    inp.className = "auto-updating-input";
    inp.value = todo.text;
    inp.setAttribute("data-id", todo.id);
    setupInputElement(inp);
    todoLi.appendChild(inp);
    todoLi.classList.add("todoItem");
    todoDiv.appendChild(todoLi);

    // check button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("checkButton");
    checkButton.setAttribute("data-id", todo.id);
    checkButton.addEventListener("click", checkTodo);
    todoDiv.appendChild(checkButton);
    todoDiv.setAttribute("data-owner-of", todo.id);
    // delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("deleteButton");
    deleteButton.setAttribute("data-id", todo.id);
    deleteButton.setAttribute("data-deletes", todo.id);
    deleteButton.addEventListener("click", deleteTodo);
    todoDiv.appendChild(deleteButton);
    // append to list
    if (todo.completed) inp.classList.add("completed");
    todoList.appendChild(todoDiv);
  }

  function saveLocalTodos(todo) {
    const todos = getTodoObj();
    todos[todo.id] = todo;
    saveTodoToLocalStorage(todos);
  }

  function getTodos() {
    const todos = getTodoObj();
    Object.values(todos).forEach(createNewTodoElement);
  }

  function removeLocalTodos(id) {
    const todos = getTodoObj();
    // using undefined and then stringifying automatically removes it as json doesn't allow undef
    todos[id] = undefined;
    saveTodoToLocalStorage(todos);
  }
  function toggleCompletedState(id) {
    const todos = getTodoObj();
    todos[id].completed = !todos[id].completed;
    saveTodoToLocalStorage(todos);
  }
  function getTodoObj() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = {};
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
  }
  function saveTodoToLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
})();
