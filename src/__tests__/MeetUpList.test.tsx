
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import MeetUpList from '../components/MeetUpList';

/* jest.mock('./meetUpList.json') */

describe('Meet Up list Testing', () => {

  it('Renders meetup-list from JSON file/', async () => {

    await act(async () => {
      render(
        <BrowserRouter>
          <MeetUpList />
        </BrowserRouter>
      )
    })

  })
})

describe('sorting and filtering', () => {
  beforeEach( async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <MeetUpList />
        </BrowserRouter>
      ) 
    })
  })

  it('sorts meetups by date when clicking "Sort By Date"', async () => {

    const sortByDateBtn = screen.getByRole('button', {name: "Sort By Date"})
    userEvent.click(sortByDateBtn)

    const meetupCards = screen.queryAllByTestId('singleMeetup')
        meetupCards.forEach((el, index) => {

            if(index === 0){
                // most recent meetup should be first
                expect(el).toHaveTextContent("Meet Up Third")
            } else if(index === 1) {
                expect(el).toHaveTextContent("Meet Up One")
            } else if(index === 2)
            // last since that's the past one of our default meetups
                expect(el).toHaveTextContent("Meet Up Two")

      })
  })

  it('sorts by category alphabetically when clicking "Sort By Category"', async () => {
      
      const sortByCatBtn = screen.getByRole('button', {name: "Sort By Category"})
      userEvent.click(sortByCatBtn)

      const meetupCards = screen.queryAllByTestId('singleMeetup')
      meetupCards.forEach((el, index) => {
        if(index === 0){
          expect(el).toHaveTextContent("Music")
        } else if (index === 1) {
          expect(el).toHaveTextContent("Sport")
        } else if (index === 2) {
          expect(el).toHaveTextContent("Art")
        }
      })
  })

  it('only shows attended when clicking attended-btn', () => {
      const attendedBtn = screen.getByRole('button', {name: /attended/i})
      userEvent.click(attendedBtn)

      const meetupCards = screen.queryAllByTestId('singleMeetup')
      meetupCards.forEach((el, index) => {
          if(index === 0){
            expect(el).toHaveTextContent("Meet Up One")
          }
      })

  })

})

