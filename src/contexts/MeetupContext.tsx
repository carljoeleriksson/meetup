// CONTEXT USED FOR THE BURGER MENU
import React, { useState, createContext, useEffect } from 'react'

export const MeetupContext = createContext();

function MeetupContextProvider(props) {
	const [meetupData, setMeetupData] = useState<object>({})


    useEffect(() => {
        getMeetupData()
    }, [])

	return (
		<div>
			<MeetupContext.Provider value={[meetupData, setMeetupData]}>
				{props.children}
			</MeetupContext.Provider>
		</div>
	)
}

export default MeetupContextProvider
