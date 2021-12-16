import {
    addNewTodoAC,
    changeFilterAC,
    editTodoTitleAC, setTodolistsAC, TodolistEntityType,
    todoListId_1,
    todoListId_2,
    todoListReducer
} from "./todoListReducer";
import {ACTIONS_TYPE} from "./actions";
import {TodolistType} from "../api/todolists-api";

let state: TodolistEntityType[];
beforeEach(()=> {
    state = [
        {id: todoListId_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListId_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ]
})

test('todolist reducer should remove correct todolist', ()=> {

    let changedState = todoListReducer(state, {type: ACTIONS_TYPE.REMOVE_TODOLIST, todoID: todoListId_1})

    expect(changedState.length).toBe(1)
    expect(changedState[0].id).toBe(todoListId_2)

})
test('todolist reducer should edit correct todolist title', ()=> {

    let changedState = todoListReducer(state, editTodoTitleAC(todoListId_2, 'What to search'))

    expect(changedState.length).toBe(2)
    expect(changedState[0].title).toBe('What to learn')
    expect(changedState[1].title).toBe('What to search')
})
test('todolist reducer should add new todo with correct title', ()=> {

    let newTodo = {
        id:"dc67d646-68bd-4ec5-94d3-93bad218c53a",title:"What to watch",addedDate:"2021-12-16T19:30:45.9613775Z",order:-7
    }
    let changedState = todoListReducer(state, addNewTodoAC(newTodo))

    expect(changedState.length).toBe(3)
    expect(changedState[1].title).toBe('What to learn')
    expect(changedState[0].title).toBe('What to watch')
})
test('todolist reducer should change filter correctly', ()=> {

    let changedState = todoListReducer(state, changeFilterAC(todoListId_2,"completed" ))

    expect(changedState.length).toBe(2)
    expect(changedState[1].filter).toBe('completed')
    expect(changedState[0].filter).toBe('all')
})
test('todolist reducer should set todolists with filter to the state ', () => {
    let state: TodolistEntityType[] = [];
    let todolists: TodolistType[] = [
        {id: '2', title: 'What to knit', addedDate: '', order: 0},
        {id: '1', title: 'What to read', addedDate: '', order: 0},
        {id: '3', title: 'What to watch', addedDate: '', order: 0},
    ]
    const endState = todoListReducer(state, setTodolistsAC(todolists))

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe('2')
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('all')
})