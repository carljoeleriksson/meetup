import React, { useState } from 'react';

import { FaCommentAlt } from 'react-icons/fa';

function Comments() {
     interface comment {
        name: string,
        message: string
    }

    const [commentFormHidden, setCommentFormHidden] = useState<Boolean>(true)
    const [commentList, setCommentList] = useState<comment[]>([
        {
            name: 'John',
            message: 'Meddelande!',
        }
    ])


    const [inputValues, setInputValues] = useState<comment>({
        name: '',
        message: '',
    })


    function commentClick() {
        if(commentFormHidden){
            setCommentFormHidden(false)
        } else {
            setCommentFormHidden(true)
        }
    }

    function handleFormInput(e: any) {
        
        let newInputs: comment = { ...inputValues }
        
        if(e.target.id === "name"){
            newInputs.name = e.target.value
        } else if(e.target.id === "message"){
            newInputs.message = e.target.value    
        }
       
        setInputValues(newInputs)
        
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        
        let newComment: comment = { ...inputValues }
        
        if(inputValues.name !== '' && inputValues.message !== '') {
            setCommentList([newComment, ...commentList])
        }
        
        newComment = {
            name: '',
            message: '',
        }

        setInputValues(newComment)
    }

    function listItems() {
        return commentList.map((post: comment, index: number) => 
            <div className='comments-item' key={index} data-testid="listitem">
               <span>{post.name}</span><br />
               <span>{post.message}</span>
            </div>
        )
    }

    return <>
        <button className='comment-btn icon-btn' onClick={commentClick}><FaCommentAlt /></button>
        <form className='comments-form' onSubmit={handleSubmit} style={{display: commentFormHidden ? 'none' : 'block'}}>
            <input 
                id='name'
                name='name'
                value={inputValues.name} 
                onChange={handleFormInput} 
                type="text" 
                placeholder='Name' 
            />
            <input 
                id='message'
                name='message'
                value={inputValues.message} 
                onChange={handleFormInput} 
                type="textarea" 
                placeholder='Message' 
            />
            <button className='send-btn' type="submit">Send</button>    
        </form>

        <div className="comments-list">
            {commentList[0] && listItems()}
        </div>
    </>
  
}

export default Comments;
