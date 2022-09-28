import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

//Tasks CRUD:
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
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistId: string) => {
        // const todoListTasks = tasks[todolistId]
        // const updatedTask = todoListTasks.map(t=>t.id === taskID?{...t, isDone:isDone}:t)
        // const copyTask = {...tasks}
        // copyTask[todolistId] = updatedTask
        // setTasks(copyTask)
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})
    }
    const changeTaskTitle = (taskID: string, title: string, todolistId: string) => {

        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskID ? {...t, title} : t)})
    }

//todolist CRUD:
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolist(todolist.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolist(todolist.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolist(todolist.filter(tl => tl.id !== todolistId))
    }
    const addTodolist = (title: string) => {
        const newTodolistId: string = v1()
        setTodolist([...todolist, {id: newTodolistId, title, filter: 'all'}])
        setTasks({...tasks, [newTodolistId]: []})
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
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "20px"}}>
                    <TodoList
                        todolistId={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeTodolistFilter}
                        addTask={addTask}
                        changeStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>


        )
    })
    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolist
                    </Typography>
                    <Button color={"inherit"} variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>

            </Container>
        </div>
    );
}

export default App;
