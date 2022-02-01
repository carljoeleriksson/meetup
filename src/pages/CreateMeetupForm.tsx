import React from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { FaArrowAltCircleLeft } from 'react-icons/fa'

function todaysDate() {
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
  return date
}



function CreateMeetupForm() {
    const navigate = useNavigate()

    
    function handleSubmit(e: React.SyntheticEvent) {
            e.preventDefault()
            
            //Checking whats contained inside the form element.
            
            /* console.log('e.target: ', e.target); */
            console.log('e.target: ', (e.target as HTMLFormElement).elements);
            
            const existingMeetups = JSON.parse(localStorage.getItem('meetUp-List')??'[]')
            //Get highest id in array and later give the new meetup highestId + 1
            const arrOfIds = existingMeetups.map((meetup:any) => meetup.Id)
            let highestId=Math.max(...arrOfIds) ?? 0;
            
            const target = e.target as typeof e.target & {
                title: { value: string },
                date: { value: Date },
                time: { value: string },
                description: { value: string },
                host: { value: string },
                category: { value: string },
                image: { value: string },
            };
            
            console.log('target.title.value: ', target.title.value);
            console.log('typeof(target.title.value): ', typeof(target.title.value));

            const newMeetup = {
                Id:  highestId + 1,
                Title: target.title.value,
                Date: `${target.date.value} @ ${target.time.value}`,
                Description: target.description.value,
                Host: target.host.value,
                Category: target.category.value,
                Image: target.image.value,
                Attend: false
            }
            
            const newArr: any = [newMeetup, ...existingMeetups];
            /* const newArr: any = []; */
           
            localStorage.setItem('meetUp-List', JSON.stringify(newArr));
            
            navigate('/')
    }

    return <>
        
        <h2>Create Meetup</h2>
        <div className='create-meetup-wrapper'>
            <Link to="/" className='back-btn icon-btn'><FaArrowAltCircleLeft />Back</Link>
            <form data-testid="create-meetup-form" onSubmit={handleSubmit}>
                <label htmlFor="title-input">Title</label>
                <input 
                    id="title-input"
                    name="title" 
                    type="text" 
                />
                <label htmlFor="date-input">Date</label>
                <input 
                    id="date-input" 
                    name="date"
                    type="date" 
                    placeholder={todaysDate()}
                />
                <label htmlFor="time-input">Time</label>
                <input 
                    id="time-input"
                    name="time" 
                    type="time"
                />
                <label htmlFor="desc-input">Description</label>
                <input 
                    id="desc-input" 
                    name="description"
                    type="textarea" 
                />
                <label htmlFor="host-input">Host</label>
                <input 
                    id="host-input" 
                    name="host"
                    type="text" 
                />
                <label htmlFor="cat-input">Category</label>
                <input 
                    id="cat-input" 
                    name="category"
                    type="text" 
                />
                <label htmlFor="img-input">Image</label>
                <input 
                    id="img-input" 
                    name="image"
                    type="text" 
                />
                <button className='create-btn' type="submit">Create Meetup</button>   
            </form>    
        </div>
    </>
}

export default CreateMeetupForm
