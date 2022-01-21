import React, { useEffect, useState } from 'react';

export default function MeetUpList() {

  const [meetUplist, setMeetUplist]: Array<any> = useState([])

  let List: Array<any>

  const fetchMeetUpList = async () => {

    try {

      const meetUplist = await import("../meetUpList.json");

      const listArr: Array<any> = meetUplist.default

      //const listsFetch =  await fetch('/meetUpList.json')
      //console.log(listArr)


      // storeToLocalStorage(listArr)

      setMeetUplist(listArr)

    } catch (e) {

      console.log(e)

    }

  }

  const storeToLocalStorage = (meetUplist: Array<any>) => {

    meetUplist.length > 0 && localStorage.setItem('meetUp-List', JSON.stringify(meetUplist))

  }

  useEffect(() => {

    fetchMeetUpList()

    storeToLocalStorage(meetUplist)

  }, [])


  return (<>
    {meetUplist.length > 0 && meetUplist.map((el: any) => (
      <div key={el.Id}> {el.Title}, {el.Date}, {el.Description}, {el.Host}</div>
    )
    )
    }
  </>


  )
}
