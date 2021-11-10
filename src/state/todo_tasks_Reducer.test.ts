import {tasksReducer, TaskStateType} from "./tasksReducer";
import {AddNewTodoAC, RemoveTodoListAC, todoListReducer, TodoListType} from "./todoListReducer";
import {v1} from "uuid";

test('ids should be equal', ()=> {
    const startTasksState: TaskStateType = {};
    const startTodoListsState: TodoListType[] = [];
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
        'todoListID1' : [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: false},
        ],
        'todoListID2' : [
            {id: '1', title: 'Bread', isDone: true},
            {id: '2', title: 'Milk', isDone: false},
            {id: '3', title: 'Meat', isDone: false},
        ],
    }
    const action = RemoveTodoListAC('todoListID2');
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListID2']).not.toBeDefined()
})