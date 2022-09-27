import React from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditTableSpan from "./EditTableSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

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
    changeTaskTitle : (taskID: string, title:string, todolistId: string) => void
    changeTodolistTitle : (title:string, todolistId: string)=>void
}
const TodoList = (props: TodoListPropsType) => {
    let tasksItems: any = <span>Task list is empty</span>
    if(props.tasks.length){
       tasksItems = props.tasks.map(task => {
            const changeTaskTitle = (title:string) => {
                props.changeTaskTitle(task.id, title, props.todolistId)
            }
            return (
                <li key={task.id} className={task.isDone ? "isDone" : ""}>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={(e) => props.changeStatus(task.id, e.currentTarget.checked, props.todolistId)}/>
                    <EditTableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton
                        size={'small'}
                        onClick={() => props.removeTask(task.id, props.todolistId)}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </li>
            )
        })
    }

    const addTask = (title:string) => {
props.addTask(props.title, props.todolistId)
    }
    const changeTodolistTitle = (title:string) => {
      props.changeTodolistTitle(title, props.todolistId)
    }
    const handlerCreator = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter, props.todolistId)
    }
    return (
        <div>
            <h3>
                <EditTableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <button onClick={()=>props.removeTodolist(props.todolistId)}>delete Todolist</button>
            </h3>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <Button
                    size={'small'}
                    variant={'contained'}
                    disableElevation
                    color={props.filter=== 'all' ? "secondary" : "primary"}
                    style={{marginRight: '5px'}}
                        onClick={handlerCreator('all')}>All
                </Button>
                <Button
                    size={'small'}
                    variant={'contained'}
                    disableElevation
                    style={{marginRight: '5px'}}
                    color={props.filter=== 'active' ? "secondary" : "primary"}
                        onClick={handlerCreator('active')}>Active
                </Button>
                <Button
                    size={'small'}
                    variant={'contained'}
                    disableElevation
                    style={{marginRight: '5px'}}
                    color={props.filter=== 'completed' ? "secondary" : "primary"}
                        onClick={handlerCreator('completed')}>Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;