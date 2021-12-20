const addTask = () => {
    const input = document.querySelector('input[type="text"]')
    const name = input.value

    input.value = ''

    store.dispatch(addTodo({
        id: generateUID(),
        name,
        completed: false
    }))
    
}

// add task onsubmit
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    if (e.target[0].value === '') {
        alert('please, Enter valid text')
        return
    };
    
    // add new task
    addTask()
})

// create delBtn and it functionality
const delTask = (event) => {
    const rmBtn = document.createElement('img')
    const attr = {
        src: './images/icon-cross.svg',
        alt: 'del icon',
        class: 'cross'
    }

    for (key in attr) {
        rmBtn.setAttribute(key, attr[key])
    }

    rmBtn.addEventListener('click', event)

    return rmBtn
}

// update dom 
const updateUI = (todo) => {
    // create task and set Id
    const task = document.createElement('li');
    task.setAttribute('id', todo.id)

    const rmBtn = delTask(() => {
        store.dispatch(removeTodo(todo.id))
    })

    // task inner text
    const context = `<label>${todo.name}</label>`

    task.innerHTML = context;
    task.appendChild(rmBtn)

    todo.completed ? task.classList.add('completed') : task.classList.remove('completed')

    task.addEventListener('click', function() {
        store.dispatch(toggleTodo(todo.id))
    })

    // append tasks to list
    document.querySelector('.tasks-list').appendChild(task)
}


const showTodos = (arr) => {
    const stateBtns = document.querySelectorAll('.state ul li')

    stateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.tasks-list').innerHTML = ''

            switch (btn.dataset.show) {
                case 'all':
                    arr.forEach(updateUI)
                    break;

                case 'active':
                    arr.filter((todo) => todo.completed !== true).forEach(updateUI)
                    break;

                case 'completed':
                    arr.filter((todo) => todo.completed === true).forEach(updateUI)
                    break;
            }
        })  
    })
}

// number of tasks left
const tasksLeft = (arr) => {
    const itemsLeft = document.querySelector('.items-left');
    
    itemsLeft.innerText = `${arr.length} items left`;
}

// Clear completed tasks
const clear = () => {
    document.querySelector('.clear-completed').addEventListener('click', () => {
        store.dispatch(clearComplated())
    })
}

