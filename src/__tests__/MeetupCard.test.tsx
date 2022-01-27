import { act, render, screen } from '@testing-library/react';
import MeetupCard from '../components/MeetupCard';
import userEvent from '@testing-library/user-event'


const data = [{
    "Id": 1,
    "img": "https://media.istockphoto.com/photos/joyful-back-man-in-winter-clothes-posing-over-orange-background-picture-id1191857510?b=1&k=20&m=1191857510&s=170667a&w=0&h=pMPjISYApJe4378IPmEsxctGdzU1X47fgwR0cWp8Iac=",
    "date": "2020-01-01",
    "title": "Music event 1",
    "host": "Host: Rick Ross",
    "Category": "Music",
    "description": "The biggest music event in the world, come and experience a world class event with an amazing line up of artist. This is a once in a life time event not to be missed."
    },
    
  ]
  const data2 =
  [
    {
        "Id": 1,
        "Date": "2024-04-28 14:45",
        "Title" :  "Meet Up One",
        "Description" : "MeetUp One Description ",
        "Host": "Host: Omar",
        "Image": "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80",
        "Attend": false,
        "Category": "Sport"

    },
    {
        "Id": 2,
        "Date": "2022-01-01 11:30",
        "Title" :  "Meet Up Two",
        "Description" : "MeetUp Two Description ",
        "Host": "Host: Ahmed",
        "Image": "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80",
        "Attend": false,
        "Category": "Art"



    },
    {
        "Id": 3,
        "Date": "2024-04-21 11:30",
        "Title" :  "Meet Up Third",
        "Description" : "MeetUp Third Description ",
        "Host": "Host: Joel",
        "Image": "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80",
        "Attend": false,
        "Category": "Music"



    }
]
describe('Meet Up Card Testing', () => {

  it('component renders', () => {
    render(<MeetupCard data={data} />)
  })  

  it('shows the date', () => {
    render(<MeetupCard data={data} />)
      
      const dateElem = screen.getByTestId('date')
      expect(dateElem).toBeInTheDocument()
  })
  it('shows the title of the meetup', () => {
      render(<MeetupCard data={data} />)

      const headingElem = screen.getByRole('heading')
      expect(headingElem).toBeInTheDocument()
  })
  
  it('shows a description of the meetup', () => {
    render(<MeetupCard data={data} />)

    const descElem = screen.getByTestId('description')
    expect(descElem).toBeInTheDocument()
  })

  it('shows the host of the meetup', () => {
    render(<MeetupCard data={data} />)

    const hostElem = screen.getByTestId('host')
    expect(hostElem).toBeInTheDocument()
  })

  it('Sort meetups by Upcoming ones', async () => {

    render(<MeetupCard data={data2} />)
    const sortByUpcomingDateBtn = screen.getByTestId("sortByUpcomingDate")


    await act(async () => {

    userEvent.click(sortByUpcomingDateBtn)

  
    })
  
    const elements = screen.getAllByTestId('singleMeetup')
    elements.forEach((el, index) => {
      // the past one of our meetups data list
    expect(el).not.toHaveTextContent("Meet Up Two")
    
    if(index == 0)
    // most recent meetup should be first
     expect(el).toHaveTextContent("Meet Up Third")
     else if(index == 1)
     expect(el).toHaveTextContent("Meet Up One")
  })

// to do test sort by category

  })

})
