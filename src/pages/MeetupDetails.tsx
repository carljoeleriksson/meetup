import React, {useEffect, useState} from 'react';
import {FaArrowAltCircleLeft} from 'react-icons/fa'
import { useParams } from 'react-router-dom'


import Comments from '../components/Comments'

function MeetupDetails() {
    let { id } = useParams()

    interface meetupItem {
        id: number,
        date: string,
        title :  string,
        description : string,
        host: string,
        image: string,
        attend: boolean
    }


    const [meetUpList, setMeetUpList] = useState<meetupItem[]>([])
    const [singleMeetup, setSingleMeetup] = useState<meetupItem>({})
    const [isAttended, setIsAttended] = useState<boolean>(false)

    const fetchMeetUpList = async () => {
        const meetUplist = await import("../meetUpList.json");
  
        let listArr: Array<any>= []
  
        listArr = meetUplist.default

        localStorage.setItem('meetUp-List', JSON.stringify(listArr))
        let meetUp_List:any = localStorage.getItem('meetUp-List')
    
        setMeetUpList(JSON.parse(meetUp_List)) 
    }
  


    function attendClick() {
        if(!isAttended){
            setIsAttended(true)
        } else {
            setIsAttended(false)
        }
    }

    useEffect(() => {
        fetchMeetUpList()
        if(id){
            setSingleMeetup(meetUpList[id - 1])
        }
        
    })

  return <>
    <button className='back-btn icon-btn'><FaArrowAltCircleLeft/>Back</button>
    <div className="meetup-details-wrapper">
        <img src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80" alt="Meetup Name" />
        <button className='attend-btn' onClick={attendClick}>{!isAttended ? 'Attend' : 'Unattend'}</button>
        <p className="details-date" data-testid="date">Monday | January 20 | 2022</p>
        <h3 className="details-title">Meetup Name</h3>
        <p className="details-host"><span>Host: </span>Joel Eriksson</p>
        <p className="details-desc" data-testid="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />Beatae consequatur eaque ratione provident minima eius odio facere impedit assumenda sapiente?</p>
    </div>
    <Comments/>
  </>
}

export default MeetupDetails;
