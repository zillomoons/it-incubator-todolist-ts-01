import {
    AddTaskAC,
    ChangeTaskStatusAC,
    EditTaskTitleAC,
    RemoveTaskAC,
    tasksReducer,
    TaskStateType
} from "./tasksReducer";
import {todoListId_1, todoListId_2} from "./todoListReducer";
import {v1} from "uuid";

let startState: TaskStateType;
beforeEach(()=>{
    startState = {
        [todoListId_1]: [
            {id: 'ddf78', title: "HTML&CSS", isDone: true},
            {id: 'ddf79', title: "JS", isDone: true},
            {id: 'ddf80', title: "ReactJS", isDone: false},
            {id: 'ddf81', title: "Redux", isDone: false},
            {id: 'ddf82', title: "RestAPI", isDone: false},
            {id: 'ddf83', title: "GraphGL", isDone: false}
        ],
        [todoListId_2]: [
            {id: 'ddf84', title: "Bread", isDone: true},
            {id: 'ddf85', title: "Milk", isDone: true},
            {id: 'ddf86', title: "Butter", isDone: true},
            {id: 'ddf87', title: "Honey", isDone: false},
            {id: 'ddf88', title: "Cookies", isDone: false},
        ]
    }
})
test('tasksReducer should remove task from correct todolist', ()=> {
    let changedState = tasksReducer(startState, RemoveTaskAC(todoListId_2,'ddf86' ))

    expect(changedState[todoListId_1].length).toBe(6);
    expect(changedState[todoListId_2].length).toBe(4);
})
test('tasksReducer should add task with correct title in correct todolist', ()=> {
    let changedState = tasksReducer(startState, AddTaskAC(todoListId_1, 'NodeJS'))

    expect(changedState[todoListId_1].length).toBe(7);
    expect(changedState[todoListId_1][0].title).toBe('NodeJS')
    expect(changedState[todoListId_2].length).toBe(5);
})
test('tasksReducer should edit title of correct task', ()=> {
    let newTitle = 'Ice cream'
    let changedState = tasksReducer(startState, EditTaskTitleAC(todoListId_2, 'ddf87', newTitle))

    expect(changedState[todoListId_1].length).toBe(6);
    expect(changedState[todoListId_2][3].title).toBe(newTitle)
    expect(changedState[todoListId_2].length).toBe(5);
})
test('tasksReducer should change status in correct task', ()=> {
    let newTitle = 'Ice cream'
    let changedState = tasksReducer(startState, ChangeTaskStatusAC(todoListId_2,'ddf87', true))

    expect(changedState[todoListId_1].length).toBe(6);
    expect(changedState[todoListId_2][3].isDone).toBe(true)
})