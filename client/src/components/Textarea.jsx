import React from 'react'
import Input from './Input'
import Controls from './Controls'
const Textarea = (props) => {
    return (
        <div className="cardWindow">
            <Input type="text" clss="title inp" placeholder="" value={props.currentTitle} setfxn={props.setTitle} />
            <textarea type="text" clss="txt inp" placeholder="notes bna le bhaiii" value={props.currentContent} onChange={(e) => props.setCurrentContennt(e.target.value)} />
            <Controls />
        </div>
    )
}

export default Textarea
