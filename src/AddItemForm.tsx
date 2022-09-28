import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

type AddItemFormPropsType = {
    addItem: (title: string) => void
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
            <TextField
                size={'small'}
                variant={'outlined'}
                value={title}
                onChange={changeTitle}
                onKeyDown={onKeyDownAddTask}
                error={error}
                label={'Title'}
                helperText={error && "Title is required!"}
            />
            <IconButton
                onClick={addItem}
                color={'primary'}
            >
                <AddIcon/>
            </IconButton>
            {/*{UserMessage}*/}
        </div>
    );
};

export default AddItemForm;