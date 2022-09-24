import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type EditeTableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}
const EditTableSpan = (props: EditeTableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editeMod, setEditeMod] = useState<boolean>(false)
    const onEditeMode = () => {
        setEditeMod(true)
    }
    const ofEditeMode = () => {
        props.changeTitle(title)
        setEditeMod(false)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const enterChangeTitle =(e:KeyboardEvent<HTMLInputElement>)=>{
if(e.key === "Enter"){
    ofEditeMode()
}
    }
    return (
        editeMod ? <input
                value={title}
                autoFocus
                onBlur={ofEditeMode}
                onChange={changeTitle}
                onKeyDown={enterChangeTitle}
            />
            : <span onDoubleClick={onEditeMode}>{props.title}</span>
    );
};

export default EditTableSpan;