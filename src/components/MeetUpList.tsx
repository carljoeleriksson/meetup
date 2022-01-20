import React, { useEffect, useState } from 'react';

export default function MeetUpList() {

    const [meetUplist, setMeetUplist]:Array<any> = useState([]) 

    const getMeetUpList = async () => {
        const  meetUplist = await import("../meetUpList.json");

        const listArr:Array<any> = meetUplist.default

        //const listsFetch =  await fetch('/meetUpList.json')
        console.log(listArr)
            
       
        setMeetUplist(listArr)

    }

    useEffect(()=>{
        getMeetUpList()
    },[])


  return (<ul>{ meetUplist.length > 0 && meetUplist.map( (el:any) => (
    <li key={el.Id}> {el.Title}, {el.Date}, {el.Description}, {el.Host}</li>
  )
  )
  }
  </ul>)
}
