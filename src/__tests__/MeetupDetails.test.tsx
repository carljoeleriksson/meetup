import { screen, render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import MeetupDetails from '../pages/MeetupDetails'
import { mockLocalStorage } from '../utils/mockLocalStorage'


const { getItemMock, setItemMock } = mockLocalStorage();


describe('Meetup Details Page', () => {

    beforeEach(()=>{

      getItemMock.mockReturnValue('[{"Id":1,"Date":"2022-04-26 11:45","Title":"Meet Up One","Description":"MeetUp One Description","Host":"Omar","Image":"http://example.com/image.jpg","Attend":false},{"Id":2,"Date":"2023-04-26 11:45","Title":"Meet Up Two","Description":"MeetUp Two Description ","Host":"Hoster Two","Image":"http://example.com/image.jpg","Attend":false}]');
      
      render(<MeetupDetails Id="1"/>)

    })

    it('renders without crashing', async () => {




        expect(getItemMock).toHaveBeenCalled();



    })

    it('shows an image of the event', () => {
      //  render(<MeetupDetails Id="1"/>)

        const img = screen.getByRole('img')

        expect(img).toBeInTheDocument()

        expect(img).toHaveProperty('src', 'http://example.com/image.jpg' )
    })

    it('shows the date', () => {
      //  render(<MeetupDetails Id="1"/>)
        
        const dateElem = screen.getByTestId('date')
        expect(dateElem).toBeInTheDocument()
        expect(dateElem).toHaveTextContent('2022-04-26 11:45')
    })
    it('shows the title of the meetup', () => {
      //  render(<MeetupDetails Id="1"/>)

        const headingElem = screen.getByRole('heading')
        expect(headingElem).toBeInTheDocument()
        expect(headingElem).toHaveTextContent('Meet Up One')
    })

    it('shows the host of the meetup', () => {
      //  render(<MeetupDetails Id="1"/>)

        const hostElem = screen.getByText(/Host:/i)
        expect(hostElem).toBeInTheDocument()
       // expect(hostElem).toHaveTextContent(/\b("omar")\b/g)
    })

    it('shows a description of the meetup', () => {
     //   render(<MeetupDetails Id="1"/>)

        const descElem = screen.getByTestId('description')
        expect(descElem).toBeInTheDocument()
        expect(descElem).toHaveTextContent("MeetUp One Description")
    })


    it('shows a back button', () => {
     //   render(<MeetupDetails Id="1"/>)
        
        const backBtn = screen.getByRole('button', {name: /back/i})
        expect(backBtn).toBeInTheDocument()
    })

})

describe('Attend button functions', () =>{
    
    beforeEach(()=>{

        getItemMock.mockReturnValue('[{"Id":1,"Date":"2022-04-26 11:45","Title":"Meet Up One","Description":"MeetUp One Description ","Host":"Hoster One","Image":"https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80","Attend":false},{"Id":2,"Date":"2023-04-26 11:45","Title":"Meet Up Two","Description":"MeetUp Two Description ","Host":"Hoster Two","Image":"https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80","Attend":false}]');
        
        render(<MeetupDetails Id="1"/>)
  
      })

    it('Shows an Attend-button which says "Attend" initially', () => {
     //   render(<MeetupDetails Id="1"/>)

     const attendBtn = screen.getByRole('button', {name: /(un)?attend/i})
     expect(attendBtn).toBeInTheDocument()
        expect(attendBtn).toHaveTextContent(/attend/i)
    })
    it('switches to "Unattend" when the Attend-button is clicked', () => {
    //    render(<MeetupDetails Id="1"/>)

        const attendBtn = screen.getByRole('button', {name: /(un)?attend/i})

        userEvent.click(attendBtn)


        
        expect(attendBtn).toHaveTextContent(/unattend/i)
    })
    
    it('switches to "Attend" when the Unattend-button is clicked', () => {
     //   render(<MeetupDetails Id="1"/>)

        const attendBtn = screen.getByRole('button', {name: /(un)?attend/i})

        userEvent.click(attendBtn)
        userEvent.click(attendBtn)
        
        expect(attendBtn).toHaveTextContent(/attend/i)
    }) 
    
})




//

//