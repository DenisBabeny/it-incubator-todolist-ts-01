import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

//CLI
//CUI => CRUD
// Bll

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [todoListId: string]: Array<TaskType> // [ [todoListId:string] - это ключ
}

function App() {
//BLL:
//     const todoListTitle: string = "What to lear today"
//     let [tasks, setTasks] = useState<Array<TaskType>>([
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},///=> false {...t, isDone:false}
//         {id: v1(), title: "React", isDone: false},
//     ])
//     const [filter, setFilter] = useState<FilterValuesType>('all')

    //
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: "What to lear today", filter: 'all'},
        {id: todolistId_2, title: "What to bye", filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},///=> false {...t, isDone:false}
            {id: v1(), title: "React", isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: "beer", isDone: true},
            {id: v1(), title: "meat", isDone: true},
            {id: v1(), title: "fish", isDone: false}
        ]
    })


    const removeTask = (taskId: string, todolistId: string) => {
//         const todoListTasks = tasks[todolistId]
//         const updatedTasks = todoListTasks.filter(t=>t.id !== taskId)
// const copyTask = {...tasks}
//         copyTask[todolistId] =updatedTasks
//         setTasks(copyTask)// пример расписанный подробно
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const addTask = (title: string, todolistId: string) => {
        // const newTask:TaskType = {id:v1(), title:title, isDone: false}
        // const todoListTasks = tasks[todolistId]
        // const updatedTask = [newTask, ...todoListTasks]
        // const copyTask = {...tasks}
        // copyTask[todolistId] = updatedTask
        // setTasks(copyTask)
        setTasks({
            ...tasks,
            [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]],
        })
    }

    const changeStatus = (taskID: string, isDone: boolean, todolistId: string) => {
        // const todoListTasks = tasks[todolistId]
        // const updatedTask = todoListTasks.map(t=>t.id === taskID?{...t, isDone:isDone}:t)
        // const copyTask = {...tasks}
        // copyTask[todolistId] = updatedTask
        // setTasks(copyTask)
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})
    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolist(todolist.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolist(todolist.filter(tl => tl.id !== todolistId))
    }
//UI:
    const getTaskForTodolist = (todolist: TodolistType, tasks: TasksStateType) => {
        switch (todolist.filter) {
            case "active":
                return tasks[todolist.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todolist.id].filter(t => t.isDone)
            default:
                return tasks[todolist.id]
        }
    }
    const todoListComponents = todolist.map(tl => {
        const tasksForTodolist = getTaskForTodolist(tl, tasks)
        return (
            <TodoList
                key={tl.id}
                todolistId={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                removeTodolist={removeTodolist}
            />
        )
    })
    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;
