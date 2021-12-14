import {tasksReducer, TaskStateType} from "./tasksReducer";
import {
    AddNewTodoAC,
    RemoveTodoListAC,
    TodolistEntityType,
    todoListId_1,
    todoListId_2,
    todoListReducer
} from "./todoListReducer";
import {v1} from "uuid";

test('ids should be equal', ()=> {
    const startTasksState: TaskStateType = {};
    const startTodoListsState: TodolistEntityType[] = [];
    // let newID = v1()
    const action = AddNewTodoAC('new TodoList')
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoList = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoID)
    expect(idFromTodoList).toBe(action.todoID)
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
    const action = RemoveTodoListAC(todoListId_2);
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListID2']).not.toBeDefined()
})