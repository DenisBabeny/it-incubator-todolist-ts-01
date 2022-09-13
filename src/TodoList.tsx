import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskID: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}
const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const tasksItems = props.tasks.length
        ? props.tasks.map(task => {
            return (
                <li key={task.id} className={task.isDone ? "isDone" : ""}>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={(e) => props.changeStatus(task.id, e.currentTarget.checked, props.todolistId)}/>
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id, props.todolistId)}>delete</button>
                </li>
            )
        })
        : <span>Task list is empty</span>
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todolistId)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const handlerCreator = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter, props.todolistId)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
    }// обработка событий
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }//обработка событий
    const UserMessage =
        error ?
            <div style={{color: 'hotpink'}}> title is required!</div>
            : <div>please, create list item</div>
    return (
        <div>
            <h3>
                {props.title}
            <button onClick={()=>props.removeTodolist(props.todolistId)}>delete Todolist</button>
            </h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={changeTitle}
                    onKeyDown={onKeyDownAddTask}

                />
                <button onClick={addTask}>+</button>
                {UserMessage}
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button className={props.filter === 'all' ? "btn-active btn" : 'btn'}
                        onClick={handlerCreator('all')}>All
                </button>
                <button className={props.filter === 'active' ? "btn-active btn" : 'btn'}
                        onClick={handlerCreator('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? "btn-active btn" : 'btn'}
                        onClick={handlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;