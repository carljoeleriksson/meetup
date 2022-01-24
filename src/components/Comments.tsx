import React, { useEffect, useState } from 'react';

import { FaCommentAlt } from 'react-icons/fa';
 

function Comments(props:any) {
     interface comment {
        name: string,
        message: string
    }

    const meetupId = getMeetupId()

    var commentsStorageList:Array<comment> = readCommentsFrmLocalStorage(meetupId)


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

    
function getMeetupId(){

  if(! props.meetupId){
      throw new Error("meetupId prop is required!")
  }

  return props.meetupId
  

}

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

     function  storeCommentToLocalStorage (comment: comment){
       
        commentsStorageList.push(comment)
   
         localStorage.setItem('Comments-List#'+meetupId, JSON.stringify(commentsStorageList))

         console.log('storeCommentToLocalStorage')

    }

 

    function readCommentsFrmLocalStorage(meetupId:any){

        const str = getCommentLstFrmLocalStorage(meetupId)

       return   parseCommentsToJSON(str)
    }

    function getCommentLstFrmLocalStorage(meetupId:any){

       return localStorage.getItem('Comments-List#'+meetupId) 

    }

    function parseCommentsToJSON(str:string|null ){
        let commentsList:Array<comment>= []

        if(str)
        commentsList = JSON.parse(str)

        return commentsList

    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        
        let newComment: comment = { ...inputValues }
        
        if(inputValues.name !== '' && inputValues.message !== '') {
            
            try {

           storeCommentToLocalStorage(newComment) 

            setCommentList([newComment, ...commentList])



            } catch(e) {

                console.log(e)

            }
        }
        
        
        newComment = {
            name: '',
            message: '',
        }

        setInputValues(newComment)
    }

    useEffect(()=>{

        setCommentList(commentsStorageList)

    },[])

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
