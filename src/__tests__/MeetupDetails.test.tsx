import { screen, render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import MeetupDetails from '../pages/MeetupDetails'

describe('Meetup Details Page', () => {
    it('renders without crashing', () => {
        render(<MeetupDetails />)
    })

    it('shows an image of the event', () => {
        render(<MeetupDetails/>)

        const img = screen.getByRole('img')
        expect(img).toBeInTheDocument()
    })

    it('shows the date', () => {
        render(<MeetupDetails/>)
        
        const dateElem = screen.getByTestId('date')
        expect(dateElem).toBeInTheDocument()
    })
    it('shows the title of the meetup', () => {
        render(<MeetupDetails/>)

        const headingElem = screen.getByRole('heading')
        expect(headingElem).toBeInTheDocument()
    })

    it('shows the host of the meetup', () => {
        render(<MeetupDetails/>)

        const hostElem = screen.getByText(/Host:*/i)
        expect(hostElem).toBeInTheDocument()
    })

    it('shows a description of the meetup', () => {
        render(<MeetupDetails/>)

        const descElem = screen.getByTestId('description')
        expect(descElem).toBeInTheDocument()
    })


    it('shows a back button', () => {
        render(<MeetupDetails/>)
        
        const backBtn = screen.getByRole('button', {name: /back/i})
        expect(backBtn).toBeInTheDocument()
    })

})

describe('Attend button functions', () =>{
    it('Shows an Attend-button which says "Attend" initially', () => {
        render(<MeetupDetails/>)

        const attendBtn = screen.getByRole('button', {name: /(un)?attend/i})
        expect(attendBtn).toBeInTheDocument()
        expect(attendBtn).toHaveTextContent(/attend/i)
    })
    it('switches to "Unattend" when the Attend-button is clicked', () => {
        render(<MeetupDetails/>)

        const attendBtn = screen.getByRole('button', {name: /(un)?attend/i})

        userEvent.click(attendBtn)
        
        expect(attendBtn).toHaveTextContent(/unattend/i)
    })
    
    it('switches to "Attend" when the Unattend-button is clicked', () => {
        render(<MeetupDetails/>)

        const attendBtn = screen.getByRole('button', {name: /(un)?attend/i})

        userEvent.click(attendBtn)
        userEvent.click(attendBtn)
        
        expect(attendBtn).toHaveTextContent(/attend/i)
    })
    
})




//

//