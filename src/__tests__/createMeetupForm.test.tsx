import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { mockLocalStorage } from '../utils/mockLocalStorage'
import CreateMeetupForm from '../pages/CreateMeetupForm'
import { BrowserRouter } from "react-router-dom";

/* import { LocalStorageMock } from '@react-mock/localstorage'; */

const { getItemMock, setItemMock } = mockLocalStorage();

const newMeetup = {
        "Id": 6,
        "Date": "2022-01-02 12:30",
        "Title" :  "Basketball",
        "Description" : "A game of Basketball",
        "Host": "Jesus",
        "Image": "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80",
        "Attend": false,
        "Category": "Sports"
}

describe('createMeetupForm - Component for creating a new Meetup', () => {
    beforeEach(()=>{
        render(
            <BrowserRouter>
                <CreateMeetupForm/>
            </BrowserRouter>
            )
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

 
function setupForm(newMeetup: any) {
    
    //Här är problemet!!
    userEvent.type(screen.getByLabelText(/title:?/i), newMeetup.Title)
    userEvent.type(screen.getByLabelText(/date:?/i), newMeetup.Date)
    userEvent.type(screen.getByLabelText(/time:?/i), newMeetup.Time)
    userEvent.type(screen.getByLabelText(/description:?/i), newMeetup.Description.replace(' ', '{space}'))
    userEvent.type(screen.getByLabelText(/host:?/i), newMeetup.Host.replace(' ', '{space}'))
    userEvent.type(screen.getByLabelText(/image:?/i), newMeetup.Image.replace(' ', '{space}'))
    userEvent.type(screen.getByLabelText(/category:?/i), newMeetup.Category.replace(' ', '{space}'))
  };
 

describe('Create Meetup Button functions', () => {
    beforeEach(() => {
        getItemMock.mockReturnValue('[{"Id":1, "Date":"2022-04-26 11:45", "Title":"Meet Up One", "Description":"MeetUp One Description", "Host":"Omar", "Image":"http://example.com/image.jpg", "Attend":false}, {"Id":2,"Date":"2023-04-26 11:45","Title":"Meet Up Two","Description":"MeetUp Two Description ","Host":"Hoster Two","Image":"http://example.com/image.jpg","Attend":false}]');

        render(
            <BrowserRouter>
                <CreateMeetupForm/>
            </BrowserRouter>
            )
    })
    it('render a meetup button', () => {
        const createMeetupBtn = screen.getByRole('button', {name: /create meetup/i})
        expect(createMeetupBtn).toBeInTheDocument()
    })

    it('title input field holds value when typed into', () => {
        const titleInput = screen.getByLabelText(/title:?/i)
        userEvent.type(titleInput, 'Hej')
        expect(titleInput).toHaveValue('Hej')
    })
/* 
    it('saves the meetup to localStorage when "create meetup"-btn is clicked', () => {
        setupForm(newMeetup)

        const createMeetupBtn = screen.getByRole('button', {name: /create meetup/i})
        userEvent.click(createMeetupBtn);

        expect(setItemMock).toHaveBeenCalled()
        console.log('setItemMock.mock.calls[0][1]: ', setItemMock.mock.calls[0][1]);
        const item=(JSON.parse(setItemMock.mock.calls[0][1]) as Array<any>)[0];
        
        console.log('item: ', item);
        
        expect(setItemMock.mock.calls[0][0]).toBe('meetUp-List');

        expect(item.Title).toBe(newMeetup.Title);


    })
 */
    //gives you text feedback when the meetup is saved to localStorage
})