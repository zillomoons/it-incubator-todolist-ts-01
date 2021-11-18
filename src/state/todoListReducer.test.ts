import {
    AddNewTodoAC,
    ChangeFilterAC,
    EditTodoTitleAC,
    todoListId_1,
    todoListId_2,
    todoListReducer, TodoListType
} from "./todoListReducer";
import {v1} from "uuid";

let state: TodoListType[];
beforeEach(()=> {
    state = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ]
})

test('todolist reducer should remove correct todolist', ()=> {

    let changedState = todoListReducer(state, {type: "REMOVE-TODOLIST", todoID: todoListId_1})

    expect(changedState.length).toBe(1)
    expect(changedState[0].id).toBe(todoListId_2)

})
test('todolist reducer should edit correct todolist title', ()=> {

    let changedState = todoListReducer(state, EditTodoTitleAC(todoListId_2, 'What to search'))

    expect(changedState.length).toBe(2)
    expect(changedState[0].title).toBe('What to learn')
    expect(changedState[1].title).toBe('What to search')
})
test('todolist reducer should add new todo with correct title', ()=> {


    let changedState = todoListReducer(state, AddNewTodoAC('What to watch'))

    expect(changedState.length).toBe(3)
    expect(changedState[1].title).toBe('What to learn')
    expect(changedState[0].title).toBe('What to watch')
})
test('todolist reducer should change filter correctly', ()=> {

    let changedState = todoListReducer(state, ChangeFilterAC(todoListId_2,"completed" ))

    expect(changedState.length).toBe(2)
    expect(changedState[1].filter).toBe('completed')
    expect(changedState[0].filter).toBe('all')
})