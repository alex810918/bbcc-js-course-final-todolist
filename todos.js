class Todos {
    // 所有DOM 元件/ Todo變數
    constructor() {
        this.todos = [
            {
                id: 0,
                todoText: 'Buy Milk',
                completed: false,
            },
            {
                id: 1,
                todoText: 'Do Home Work',
                completed: false,
            },
            {
                id: 2,
                todoText: 'Pick Up Kids',
                completed: true,
            },
            {
                id: 3,
                todoText: 'Family Trip',
                completed: true,
            },
            {
                id: 4,
                todoText: 'Conference Meeting',
                completed: true,
            },
            {
                id: 5,
                todoText: 'Meeting at 5',
                completed: true,
            },
        ]
        this.todoList = document.querySelector('#todoList')
        this.addTodoBtn = document.querySelector('#addTodoBtn')
        this.newTodoModal = document.querySelector('#newTodoModal')
        this.updateTodoModal = document.querySelector('#updateTodoModal')
        this.addNewModalCross = document.querySelector('#addNewModalCross')
        this.updateModalCross = document.querySelector('#updateModalCross')
        this.addTodoTextInput = document.querySelector('#addTodoTextInput')
        this.updateTodoTextInput = document.querySelector(
            '#updateTodoTextInput'
        )
        this.addNewBtn = document.querySelector('#addNewBtn')
        this.updateModalBtn = document.querySelector('#updateModalBtn')
        this.toggleAllButton = document.querySelector('#toggleAllButton')
        this.events()
    }

    // 所有事件處理器
    events() {
        this.renderTodos()
        this.addTodoBtn.addEventListener('click', e =>
            this.toggleAddNewModal(e)
        )
        this.addNewModalCross.addEventListener('click', e =>
            this.toggleAddNewModal(e)
        )
        this.updateModalCross.addEventListener('click', e =>
            this.toggleUpdateModal(e)
        )
        this.addNewBtn.addEventListener('click', e => this.addTodo(e))
        this.toggleAllButton.addEventListener('click', e => this.toggleAll())
        this.updateModalBtn.addEventListener('click', e => this.updatetodo(e))
        // Event delegation
        this.todoList.addEventListener('click', e => {
            if (e.target.id === 'toggleComplete') {
                this.toggleTodo(e.target.dataset.item)
            }
            if (e.target.id === 'deleteTodoBtn') {
                this.deleteTodo(e.target.dataset.item)
            }
            if (e.target.id === 'updateTodoBtn') {
                this.updateTodoTextInput.value = this.todos[
                    e.target.dataset.item
                ].todoText
                this.updateTodoModal.dataset.item = e.target.dataset.item
                this.toggleUpdateModal()
            }
        })
    }

    // Render todos
    renderTodos() {
        let viewTodos = this.todos
            .map(todo => {
                if (todo.completed) {
                    return `
            <li class="border-b border-purple-400 text-xl py-4 flex justify-between items-center">
        <div class="flex items-center">
          <img id="toggleComplete" data-item="${todo.id}" class="w-8 mr-2"
            src="https://cdn.glitch.com/0946ee55-e0f2-43ff-b69c-572b4d821198%2Fcheckbox.png?v=1577886293867" />
          ${todo.todoText}
        </div>
        <div class="flex">
        <img id="updateTodoBtn" data-item="${todo.id}" src="/edit.svg" style="width: 18px; margin-right: 5px;" />
          <img id="deleteTodoBtn" data-item="${todo.id}" src="/trash.svg" style="width: 18px; " />
        </div>
      </li>
            `
                } else {
                    return `
            <li class="border-b border-purple-400 text-xl py-4 flex justify-between items-center">
              <div class="flex items-center">
                <span id="toggleComplete" data-item="${todo.id}" class="inline-block mr-2 w-8 h-8 bg-purple-200"></span>${todo.todoText}
              </div>
              <div class="flex">
                <img id="updateTodoBtn" data-item="${todo.id}" src="/edit.svg" style="width: 18px;  margin-right: 5px;" />
                <img id="deleteTodoBtn" data-item="${todo.id}" src="/trash.svg" style="width: 18px; " />
              </div>
            </li>
            `
                }
            })
            .join(' ')
        this.todoList.innerHTML = viewTodos
    }

    // Delete Todos
    deleteTodo(id) {
        console.log(id)
        this.todos.splice(id, 1)
        this.renderTodos()
    }

    // Toggle All
    toggleAll() {
        let todoTodos = this.todos.length
        let completedTodo = 0

        this.todos.forEach(function(todo, index) {
            if (todo.completed === true) {
                completedTodo++
            }
        })
        if (completedTodo === todoTodos) {
            for (var i = 0; i < todoTodos; i++) {
                this.todos[i].completed = false
            }
        } else {
            for (var i = 0; i < todoTodos; i++) {
                this.todos[i].completed = true
            }
        }
        this.renderTodos()
    }

    // Toggle Todo
    toggleTodo(id) {
        this.todos[id].completed = !this.todos[id].completed
        this.renderTodos()
    }

    // Add Todo
    addTodo(e) {
        e.preventDefault()
        this.todos.push({
            id: this.todos.length,
            todoText: this.addTodoTextInput.value,
            completed: false,
        })
        this.addTodoTextInput.value = ''
        this.toggleAddNewModal()
        this.renderTodos()
    }

    updatetodo(e) {
        e.preventDefault()
        this.todos[
            this.updateTodoModal.dataset.item
        ].todoText = this.updateTodoTextInput.value
        this.updateTodoModal.dataset.item = ''
        this.toggleUpdateModal()
        this.renderTodos()
    }

    // Toggle Add New Modal
    // 先設定 e 是空值
    toggleAddNewModal(e = '') {
        // 如果參數有e就preventDefault, 不然就繼續執行
        e && e.preventDefault()
        this.newTodoModal.classList.toggle('hidden')
    }

    // Toggle Update Todo Modal
    toggleUpdateModal(e = '') {
        e && e.preventDefault()
        this.updateTodoModal.classList.toggle('hidden')
    }
}

var todo = new Todos()

// Debug 用的，這樣我們console才可以看todo這個object
// window.todo = todo
