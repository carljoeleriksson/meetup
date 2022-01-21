import React, { useState } from 'react';

import { FaCommentAlt } from 'react-icons/fa';

function Comments() {
    
    const [commentFormHidden, setCommentFormHidden] = useState<Boolean>(true)
    const [commentList, setCommentList] = useState<object[]>([])
    const [inputValues, setInputValues] = useState<object>({
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
        e.preventDefault();
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        if(inputValues.name !== '' && inputValues.message !== '') {
            setCommentList([inputValues, ...commentList])
        }
        let inputData = { ...inputValues }
        
        inputData = {
            name: '',
            message: '',
        }
        setInputValues(inputData)
    }

    function listItems() {
        console.log(commentList)
        
        return commentList.map((post: object, index: number) => 
           <li key={index}>{post.name}<br />{post.message}</li>
        )
    }

    return <>
        <button className='comment-btn icon-btn' onClick={commentClick}><FaCommentAlt /></button>
        <form className='comments-form' style={{display: commentFormHidden ? 'none' : 'block'}}>
            <input 
                id='name'
                type="text" 
                placeholder='Name' 
                value={inputValues.name}
                onChange={handleFormInput}
            />
            <input 
                id='message'
                type="textarea" 
                placeholder='Message' 
                value={inputValues.message}
                onChange={handleFormInput}
            />
        </form>
        <button className='send-btn' onClick={handleSubmit} type="submit">Send</button>
        <div className="comments-list">
            {commentList && listItems()}
        </div>
    </>
  
}

export default Comments;
