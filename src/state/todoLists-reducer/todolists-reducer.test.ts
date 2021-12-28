import {
    addNewTodoAC, changeEntityStatus,
    changeFilterAC,
    editTodoTitleAC,
    setTodolistsAC,
    TodolistEntityType,
    todolistsReducer
} from "./todolists-reducer";
import {ACTIONS_TYPE} from "../actions";
import {TodolistType} from "../../api/todolists-api";
import {v1} from "uuid";

let state: TodolistEntityType[];

export const todoListId_1 = v1();
export const todoListId_2 = v1();

beforeEach(()=> {
    state = [
        {id: todoListId_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todoListId_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    ]
})

test('todolist reducer should remove correct todolist', ()=> {

    let changedState = todolistsReducer(state, {type: ACTIONS_TYPE.REMOVE_TODOLIST, todoID: todoListId_1})

    expect(changedState.length).toBe(1)
    expect(changedState[0].id).toBe(todoListId_2)

})
test('todolist reducer should edit correct todolist title', ()=> {

    let changedState = todolistsReducer(state, editTodoTitleAC(todoListId_2, 'What to search'))

    expect(changedState.length).toBe(2)
    expect(changedState[0].title).toBe('What to learn')
    expect(changedState[1].title).toBe('What to search')
})
test('todolist reducer should add new todo with correct title', ()=> {

    let newTodo = {
        id:"dc67d646-68bd-4ec5-94d3-93bad218c53a",title:"What to watch",addedDate:"2021-12-16T19:30:45.9613775Z",order:-7
    }
    let changedState = todolistsReducer(state, addNewTodoAC(newTodo))

    expect(changedState.length).toBe(3)
    expect(changedState[1].title).toBe('What to learn')
    expect(changedState[0].title).toBe('What to watch')
})
test('todolist reducer should change filter correctly', ()=> {

    let changedState = todolistsReducer(state, changeFilterAC(todoListId_2,"completed" ))

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
    const endState = todolistsReducer(state, setTodolistsAC(todolists))

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe('2')
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('all')
})
test('todolist entity status should be changed', ()=> {
    const endState = todolistsReducer(state, changeEntityStatus(todoListId_1, 'loading'))

    expect(endState[0].entityStatus).toBe('loading')
    expect(endState[1].entityStatus).toBe('idle')
})