import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import MeetupCard from '../components/MeetupCard';

const data = [{
    "id": 1,
    "img": "https://media.istockphoto.com/photos/joyful-back-man-in-winter-clothes-posing-over-orange-background-picture-id1191857510?b=1&k=20&m=1191857510&s=170667a&w=0&h=pMPjISYApJe4378IPmEsxctGdzU1X47fgwR0cWp8Iac=",
    "date": "2020-01-01",
    "title": "Music event",
    "host": "Host: Rick Ross",
    "description": "The biggest music event in the world, come and experience a world class event with an amazing line up of artist. This is a once in a life time event not to be missed."
    }]

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
})
