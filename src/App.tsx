import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
//CLI
//CUI => CRUD
// Bll

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const todoListTitle: string = "What to lear today"
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('completed')

    const removeTask = (tasID: number) => {
        setTasks(tasks = tasks.filter(t => t.id !== tasID))// 10ms
        console.log(tasks)// работает асинхронно
    }

    const changeFilter =(filter:FilterValuesType)=>{
        setFilter(filter)
    }

        const getTaskForTodolist =()=>{
        switch (filter){
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }
    //UI:
    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={getTaskForTodolist()}
                      removeTas={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
