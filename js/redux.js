// key generator
function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// vars
const ADD_TODO = 'ADD_TODO' 
const REMOVE_TODO = 'REMOVE_TODO' 
const TOGGLE_TODO = 'TOGGLE_TODO'
const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
const SHOW_ACTIVE = 'SHOW_ACTIVE'
const SHOW_COMPLETED = 'SHOW_COMPLETED'
const SHOW_ALL = 'SHOW_ALL'

// actions
function addTodo(todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodo(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodo(id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function clearComplated() {
    return {
        type: CLEAR_COMPLETED || SHOW_ACTIVE,
    }
}


// reducers
    // todo
    const todos = (state = [], action) => {
        prevState = state

        switch (action.type) {
        case ADD_TODO:  
            return [
                action.todo,
                ...state
            ]
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map(todo => todo.id !== action.id 
                ? todo
                : Object.assign({}, todo, {completed: !todo.completed})
            )
        case CLEAR_COMPLETED:
            return state.filter((todo) => todo.completed !== true)
        default:
            return state
        }
    }
    // root
    const root = Redux.combineReducers({
        todos
    })

// middleware
const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('the action: ', action)
        const returnValue = next(action)
        console.log('the State: ', store.getState())
    console.groupEnd()
    return returnValue
}

// store
const store = Redux.createStore(root, Redux.applyMiddleware(logger))

store.subscribe(() => {
    const { todos } = store.getState()

    document.querySelector('.tasks-list').innerHTML = ''

    todos.forEach(updateUI)
    showTodos(todos)

    tasksLeft(todos.filter(todo => todo.completed === false))
    clear()
})



