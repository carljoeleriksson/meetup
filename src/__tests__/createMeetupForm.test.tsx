import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { mockLocalStorage } from '../utils/mockLocalStorage'
import CreateMeetupForm from '../pages/CreateMeetupForm'
import { BrowserRouter } from "react-router-dom";
import MeetupManager from "../pages/MeetupManager";
import { act } from 'react-dom/test-utils';
import MeetUpList from "../components/MeetUpList";

/* import { LocalStorageMock } from '@react-mock/localstorage'; */

const { getItemMock, setItemMock } = mockLocalStorage();

const newMeetup = {
        "Id": 6,
        "Date": "2022-01-02",
        "Time": "12:30",
        "Title" :  "Basketball",
        "Description" : "AgameofBasketball",
        "Host": "Jesus",
        "Image": "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80",
        "Attend": false,
        "Category": "Sports"
}

describe('createMeetupForm - Component for creating a new Meetup', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <CreateMeetupForm />
            </BrowserRouter>
        )
    })

    it('renders without crashing', () => { })

    it('renders a heading', () => {
        const headingElem = screen.getByRole('heading', { name: /Create Meetup/i })

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
        const createMeetupBtn = screen.getByRole('button', { name: /create meetup/i })
        expect(createMeetupBtn).toBeInTheDocument()
    })

})


function setupForm(newMeetup: any) {
    const titleElem = screen.getByLabelText(/title:?/i)
    const dateElem = screen.getByLabelText(/date:?/i)
    const timeElem = screen.getByLabelText(/time:?/i)
    const descElem = screen.getByLabelText(/description:?/i)
    const hostElem = screen.getByLabelText(/host:?/i)
    const imageElem = screen.getByLabelText(/image:?/i)
    const catElem = screen.getByLabelText(/category:?/i)
    
    userEvent.type(titleElem, newMeetup.Title.replace(' ', '{space}'))
    userEvent.type(dateElem, newMeetup.Date)
    userEvent.type(timeElem, newMeetup.Time)
    userEvent.type(descElem, newMeetup.Description.replace(' ', '{space}'))
    userEvent.type(hostElem, newMeetup.Host.replace(' ', '{space}'))
    userEvent.type(imageElem, newMeetup.Image.replace(' ', '{space}'))
    userEvent.type(catElem, newMeetup.Category.replace(' ', '{space}')) 
/* 
    fireEvent.change(titleElem, {target: {value: newMeetup.Title}})
    fireEvent.change(dateElem, {target: {value: newMeetup.Date}})
    fireEvent.change(timeElem, {target: {value: newMeetup.Time}})
    fireEvent.change(descElem, {target: {value: newMeetup.Description}})
    fireEvent.change(hostElem, {target: {value: newMeetup.Host}})
    fireEvent.change(imageElem, {target: {value: newMeetup.Image}})
    fireEvent.change(catElem, {target: {value: newMeetup.Category}})
 */
  
  };
 

describe('Create Meetup Button functions', () => {
    beforeEach(() => {
        getItemMock.mockReturnValue('[{"Id":1, "Date":"2022-04-26 11:45", "Title":"Meet Up One", "Description":"MeetUp One Description", "Host":"Omar", "Image":"http://example.com/image.jpg", "Attend":false}, {"Id":2,"Date":"2023-04-26 11:45","Title":"Meet Up Two","Description":"MeetUp Two Description ","Host":"Hoster Two","Image":"http://example.com/image.jpg","Attend":false}]');

        render(
            <BrowserRouter>
                <CreateMeetupForm />
            </BrowserRouter>
        )
    })
    it('render a meetup button', () => {
        const createMeetupBtn = screen.getByRole('button', { name: /create meetup/i })
        expect(createMeetupBtn).toBeInTheDocument()
    })

    it('title input field holds value when typed into', () => {
        const titleInput = screen.getByLabelText(/title:?/i)
        userEvent.type(titleInput, 'Basketball')
        expect(titleInput).toHaveValue('Basketball')
    })

    it('checks that the new meetup is rendered in MeetupList.tsx', () => {
        setupForm(newMeetup)

        const titleElem = screen.getByLabelText(/title:?/i)
        const dateElem = screen.getByLabelText(/date:?/i)
        const timeElem = screen.getByLabelText(/time:?/i)
        const descElem = screen.getByLabelText(/description:?/i)
        const hostElem = screen.getByLabelText(/host:?/i)
        const imageElem = screen.getByLabelText(/image:?/i)
        const catElem = screen.getByLabelText(/category:?/i)
        
        expect(titleElem).toHaveValue(newMeetup.Title)
        expect(dateElem).toHaveValue(newMeetup.Date)
        expect(timeElem).toHaveValue(newMeetup.Time)
        expect(descElem).toHaveValue(newMeetup.Description)
        expect(hostElem).toHaveValue(newMeetup.Host)
        expect(imageElem).toHaveValue(newMeetup.Image)
        expect(catElem).toHaveValue(newMeetup.Category)

        getItemMock.mockReturnValue('[{"Id": 6, "Date": "2022-01-02", "Time": "12:30", "Title" :  "Basketball", "Description" : "A game of bouncing a ball back and forth", "Host": "Jesus", "Image": "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80", "Attend": false, "Category": "Sports"}]')

        render(
            <BrowserRouter>
                <MeetUpList />
            </BrowserRouter>
        )
        const newMeetupTitle = screen.getByText(/Basketball/i)
        expect(newMeetupTitle).toBeInTheDocument()
    })
})


test('Update A Meetup', async () => {

    getItemMock.mockReturnValue('[{"Id":2,"Date":"2023-04-26 @ 11:45","Title":"Meet Up Two Got Updated","Description":"MeetUp Two Description ","Host":"Hoster Two","Image":"http://example.com/image.jpg","Attend":false}]')

    const meetup = JSON.parse('{"Id":2,"Date":"2023-04-26 @ 11:45","Title":"Meet Up Two","Description":"MeetUp Two Description ","Host":"Hoster Two","Image":"http://example.com/image.jpg","Attend":false}')

    render(
        <BrowserRouter>
            <CreateMeetupForm meetup={meetup} />
        </BrowserRouter>
    )

    const createMeetupBtn = screen.getByRole('button', { name: /edit meetup/i })

    userEvent.click(createMeetupBtn);

    render(
        <BrowserRouter>
            <MeetupManager />
        </BrowserRouter>
    )

    const container: any = screen.getByTestId('meetups-list')

    expect(container).toHaveTextContent('Meet Up Two Got Updated')

})