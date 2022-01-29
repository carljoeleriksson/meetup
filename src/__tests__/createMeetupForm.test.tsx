import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { mockLocalStorage } from '../utils/mockLocalStorage'
import CreateMeetupForm from '../components/CreateMeetupForm'

const { getItemMock, setItemMock } = mockLocalStorage();

const newMeetup = {
        "Id": 6,
        "Date": "2022-01-02 12:30",
        "Title" :  "Basketball game",
        "Description" : "A game of Basketball",
        "Host": "Jesus",
        "Image": "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80",
        "Attend": false,
        "Category": "Sports"
}

describe('createMeetupForm - Component for creating a new Meetup', () => {
    beforeEach(()=>{
        render(<CreateMeetupForm/>)
      })

    it('renders without crashing', () => {})
    
    it('renders a heading', () => {
        const headingElem = screen.getByRole('heading', {name: /Create Meetup/i})

        expect(headingElem).toBeInTheDocument()
    })
    
    it('renders a title input', () => {
        const titleInput = screen.getByLabelText(/title:?/i)

        expect(titleInput).toBeInTheDocument()
    })
    
    it('renders a date input', () => {
        const dateInput = screen.getByLabelText(/date:?/i)

        expect(dateInput).toBeInTheDocument()
    })
    it('renders a time input', () => {
        const timeInput = screen.getByLabelText(/time:?/i)

        expect(timeInput).toBeInTheDocument()
    })
    it('renders a description input', () => {
        const descInput = screen.getByLabelText(/description:?/i)

        expect(descInput).toBeInTheDocument()
    })
    it('renders a host input', () => {
        const hostInput = screen.getByLabelText(/host:?/i)

        expect(hostInput).toBeInTheDocument()
    })
    it('renders an image src input', () => {
        const imgInput = screen.getByLabelText(/image:?/i)

        expect(imgInput).toBeInTheDocument()
    })
    it('renders a category src input', () => {
        const catInput = screen.getByLabelText(/category:?/i)

        expect(catInput).toBeInTheDocument()
    })

    it('renders a "create meetup" button', () => {
        const createMeetupBtn = screen.getByRole('button', {name: /create meetup/i})
        expect(createMeetupBtn).toBeInTheDocument()
    })

})


const submitForm = ({ getByText, getByLabelText }, { name }) => {
    userEvent.type(screen.getByLabelText(/title:?/i), 'Meetup!')
    userEvent.type(screen.getByLabelText(/date:?/i), '2022-03-03')
    userEvent.type(screen.getByLabelText(/time:?/i), '20:00')
    userEvent.type(screen.getByLabelText(/description:?/i), 'This{space}is{space}a{space}meetup')
    userEvent.type(screen.getByLabelText(/host:?/i), 'Joel')
    userEvent.type(screen.getByLabelText(/image:?/i), 'www.src.se')
    userEvent.type(screen.getByLabelText(/category:?/i), 'Sports')
    
    const createMeetupBtn = screen.getByRole('button', {name: /create meetup/i})
    userEvent.click(createMeetupBtn)
    const localStorageMeetup = localStorage.getItemMock(meetup)
    expect
  };


describe('Create Meetup Button functions', () => {
    beforeEach(() => {
        render(<CreateMeetupForm/>)
    })

    it('saves the meetup to localStorage when "create meetup"-btn is clicked', () => {
        
    })

    //gives you text feedback when the meetup is saved to localStorage
})