import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType ={
    addItem:(title:string)=>void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
    }
    const UserMessage =
        error ?
            <div style={{color: 'hotpink'}}> title is required!</div>
            : <div>please, create list item's title</div>
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItem()
    }
        const addItem = () => {
            const trimmedTitle = title.trim()
            if (trimmedTitle) {
                props.addItem(trimmedTitle)
            } else {
                setError(true)
            }
            setTitle('')
        }
    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onChange={changeTitle}
                onKeyDown={onKeyDownAddTask}

            />
            <button onClick={addItem}>+</button>
            {UserMessage}
        </div>
    );
};

export default AddItemForm;