import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import CreateMeetupForm from '../components/CreateMeetupForm'

describe('createMeetupForm - Component for creating a new Meetup', () => {
    it('renders without crashing', () => {
        render(<CreateMeetupForm/>)
    })
    
    it('renders a heading', () => {
        render(<CreateMeetupForm/>)
        const headingElem = screen.getByText(/Create Meetup/i)

        expect(headingElem).toBeInTheDocument()
    })

    it('renders a date input', () => {
        render(<CreateMeetupForm/>)
        const dateInput = screen.getByLabelText(/date/i)

        expect(dateInput).toBeInTheDocument()
    })
    /* it('renders a time input', () => {
        render(<CreateMeetupForm/>)
        const dateInput = screen.getByLabelText(/date/i)

        expect(dateInput).toBeInTheDocument()
    }) */
    //renders a title input
    //renders a description input
    //renders a host input
    //renders an image src input
    //renders a category input
    //renders a "create meetup" button
    //saves the meetup to localStorage when "create meetup"-btn is clicked
    //gives you text feedback when the meetup is saved to localStorage

})