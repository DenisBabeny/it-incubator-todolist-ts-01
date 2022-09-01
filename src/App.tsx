import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
//CLI
//CUI => CRUD
// Bll

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
//BLL:
    console.log(v1())
    const todoListTitle: string = "What to lear today"
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskID: string) => {
        setTasks(tasks = tasks.filter(t => t.id !== taskID))// 10ms
        console.log(tasks)// работает асинхронно
    }
    const addTask = (title: string) => {
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
//UI:
    const getTaskForTodolist = () => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }
    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={getTaskForTodolist()}
                      removeTas={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
