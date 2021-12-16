import {tasksReducer, TaskStateType} from "./tasksReducer";
import {
    addNewTodoAC,
    removeTodoListAC, setTodolistsAC,
    TodolistEntityType,
    todoListId_1,
    todoListId_2,
    todoListReducer
} from "./todoListReducer";
import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

test('ids should be equal', ()=> {
    const startTasksState: TaskStateType = {};
    const startTodoListsState: TodolistEntityType[] = [];
    let newTodo = {
        id:"dc67d646-68bd-4ec5-94d3-93bad218c53a",title:"new toys",addedDate:"2021-12-16T19:30:45.9613775Z",order:-7
    }
    const action = addNewTodoAC(newTodo)
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoList = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todo.id)
    expect(idFromTodoList).toBe(action.todo.id)
})
test('property with todoID should be deleted from Tasks state', ()=>{
    const startState: TaskStateType = {
        [todoListId_1]: [
            {
                id: v1(),
                title: "HTML&CSS",
                description: 'string',
                status: 1,
                priority: 1,
                startDate: '',
                deadline: '',
                todoListId: todoListId_1,
                order: 1,
                addedDate: ''
            },
            {
                id: v1(),
                title: "JS",
                description: 'string',
                status: 1,
                priority: 1,
                startDate: '',
                deadline: '',
                todoListId: todoListId_1,
                order: 1,
                addedDate: ''
            },
        ],
        [todoListId_2]: [
            {
                id: v1(),
                title: "Milk",
                description: 'string',
                status: 1,
                priority: 1,
                startDate: '',
                deadline: '',
                todoListId: todoListId_2,
                order: 1,
                addedDate: ''},
        ]
    }
    const action = removeTodoListAC(todoListId_2);
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListID2']).not.toBeDefined()
})
test('empty arrays should be added when we set todolists', ()=> {
    let todolists: TodolistType[] = [
        {id: '2', title: 'What to knit', addedDate: '', order: 0},
        {id: '1', title: 'What to read', addedDate: '', order: 0},
        {id: '3', title: 'What to watch', addedDate: '', order: 0},
    ]
    const endState = tasksReducer({}, setTodolistsAC(todolists))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(3)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])

})