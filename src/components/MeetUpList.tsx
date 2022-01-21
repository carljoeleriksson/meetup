import React, { useEffect, useState } from 'react';

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


      let meetUp_List:any = localStorage.getItem('meetUp-List')

      setMeetUplist(JSON.parse(meetUp_List))


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


  return (<>
    {meetUplist.length > 0 && meetUplist.map((el: any) => (
      // To be done by Ahmed from here witch div with ur component with prop meetup ID
      <div key={el.Id}> {el.Title}, {el.Date}, {el.Description}, {el.Host}</div>
    )
    )
    }
  </>


  )
}
