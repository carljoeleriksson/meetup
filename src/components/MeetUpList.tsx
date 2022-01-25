import React, { useEffect, useState } from 'react';
import MeetupCard from './MeetupCard';

export default function MeetUpList() {

  const [meetUplist, setMeetUplist]: Array<any> = useState([])

  let List: Array<any>

  const fetchMeetUpList = async () => {


      const meetUplist = await import("../meetUpList.json");

      let listArr: Array<any>= []

      listArr = meetUplist.default

      //const listsFetch =  await fetch('/meetUpList.json')
      //console.log(listArr)


      // storeToLocalStorage(listArr)
      // save  mettup list to local storage 
      localStorage.setItem('meetUp-List', JSON.stringify(listArr))


      let meetUpList:any = localStorage.getItem('meetUp-List')

      setMeetUplist(JSON.parse(meetUpList))


  }

  //const storeToLocalStorage = (meetUplist: Array<any>) => {

  //  meetUplist.length > 0 && localStorage.setItem('meetUp-List', JSON.stringify(meetUplist))

  //}

  //const getFromLocalStorage = (meetUplist: Array<any>) => {

  //  meetUplist.length > 0 && localStorage.getItem('meetUp-List', JSON.stringify(meetUplist))

  //}

  useEffect(() => {

    try {
    fetchMeetUpList()
    //storeToLocalStorage(meetUplist)

    }
    catch (e) {
      console.log(e)
    }

  }, [])


  return (
      // To be done by Ahmed from here witch div with ur component with prop meetup ID
      <MeetupCard data={meetUplist} />
    )
}
