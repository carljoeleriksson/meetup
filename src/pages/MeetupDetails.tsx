import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa'


function MeetupDetails(props: any) {

    const [isAttended, setIsAttended] = useState<boolean>(false)

    const [meetUp, setMeetUp]: Array<any> = useState([])

    var meetupListArr: Array<any> = useState([])

    var singleMeetup: Array<any> = []

    var meetupId: any = null

    const search = window.location.search;

    const params = new URLSearchParams(search);


    function getMeetupIdFromUrl() {

        meetupId = params.get('id');

        if (!meetupId)

            throw new Error("Meetup Id is missing!")

        console.log(meetupId)


    }

    function attendClick() {


        let Attend = isAttended ? false : true

        try {

            setAttendedToLocalStorage(Attend)

            setIsAttended(Attend)

        } catch (e) {

            console.log(e)

        }
    }

    function setAttendedToLocalStorage(attended: boolean) {

        if (meetupListArr.length == 0)

            throw new Error("can not find the meetup list")

        let updatedMeetupListArr = meetupListArr.map((el: any) => {

            if (el.Id == meetupId) {
                
                el.Attend = attended
            }
            return el
        })

        console.log(updatedMeetupListArr)


        localStorage.setItem('meetUp-List', JSON.stringify(updatedMeetupListArr))

    }

    function getMeetupListfmLocalStorage() {

        let meetupListStr: string | null = localStorage.getItem('meetUp-List')

        if (!meetupListStr) {
            throw new Error('can not find meetup List in Localstorage ')
        }

        let meetupList: object = JSON.parse(meetupListStr)

        console.log(meetupList)

        meetupListArr = Object.values(meetupList)

        //  return meetupListArr

    }

    function getReqMeetup() {

        singleMeetup = meetupListArr.filter((meetup: any) => {

            return meetup.Id == meetupId
        }

        )
        console.log(singleMeetup)

        // return singleMeetup
    }



    function updateMeetupState() {

        setMeetUp(singleMeetup)

    }

    function updateAttendState() {

        setIsAttended(singleMeetup[0].Attend)

    }


    getMeetupIdFromUrl()

    getMeetupListfmLocalStorage()

    getReqMeetup()



    useEffect(() => {

        try {

            updateMeetupState()

            updateAttendState()

        } catch (e) {

            console.log(e)
        }

    }, [])


    return <>
        <button className='back-btn icon-btn'><FaArrowAltCircleLeft />Back</button>

        {meetUp.length > 0 && meetUp.map((el: any) => (

            <div key={el.Id} className="meetup-details-wrapper">
                <img src={el.Image} alt={el.Title} />
                <button className='attend-btn' onClick={attendClick}>{!isAttended ? 'Attend' : 'Unattend'}</button>
                <p className="details-date" data-testid="date">{el.Date}</p>
                <h3 className="details-title">{el.Title}</h3>
                <p className="details-host"><span>Host: </span>{el.Host}</p>
                <p className="details-desc" data-testid="description">{el.Description}</p>
            </div>
        )
        )
        }

        {/* Insert <Comments/> here */}
    </>
}

export default MeetupDetails;

