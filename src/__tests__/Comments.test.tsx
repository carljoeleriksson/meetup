import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Comments from '../components/Comments'
import { mockLocalStorage } from "./utils/mockLocalStorage"

 const { getItemMock, setItemMock } = mockLocalStorage();


describe('Comments component', () => {


    beforeEach(()=>{
      //  getItemMock.mockReturnValue('[{"name":"Omar","message":"It looks like a good meetup!"}]')

        render(<Comments meetupId="1"/>)
    })
    
    it('renders without crashing', () => {
     //   render(<Comments meetupId="1" />)
     expect(getItemMock).toHaveBeenCalled();

    })
    it('does not show any input fields initially', () => {
     //   render(<Comments/>)

        const nameInput = screen.getByPlaceholderText(/name/i)
        const messageInput = screen.getByPlaceholderText(/message/i)

        expect(nameInput).not.toBeVisible()
        expect(messageInput).not.toBeVisible()
    })

    it('does show input fields when comment icon is clicked', () => {
     //   render(<Comments/>)

        const buttons = screen.getAllByRole('button')
        const commentBtn = buttons[0]

        expect(commentBtn).toBeInTheDocument()

        userEvent.click(commentBtn)

        const nameInput = screen.getByPlaceholderText(/name/i)
        const messageInput = screen.getByPlaceholderText(/message/i)

        expect(nameInput).toBeVisible()
        expect(messageInput).toBeVisible()
    })

    it('does not show input field when comment icon is clicked twice', () => {
      //  render(<Comments/>)

        const buttons = screen.getAllByRole('button')
        const commentBtn = buttons[0]

        expect(commentBtn).toBeInTheDocument()

        userEvent.click(commentBtn)
        userEvent.click(commentBtn)

        const nameInput = screen.getByPlaceholderText(/name/i)
        const messageInput = screen.getByPlaceholderText(/message/i)

        expect(nameInput).not.toBeVisible()
        expect(messageInput).not.toBeVisible()
    })

    it('empties input fields when user presses the enter key', () => {
      //  render(<Comments/>)

        const buttons = screen.getAllByRole('button')
        const commentBtn = buttons[0]

        userEvent.click(commentBtn)
        const nameInput = screen.getByPlaceholderText(/name/i)
        const messageInput = screen.getByPlaceholderText(/message/i)

        userEvent.type(nameInput, 'Steve')
        userEvent.type(messageInput, 'Awesome!')
        userEvent.keyboard('{enter}')

        expect(nameInput).toHaveValue('')
        expect(messageInput).toHaveValue('')

    })

    it('empties the input field when user presses send', () => {
     //   render(<Comments/>)
        const buttons = screen.getAllByRole('button')
        const commentBtn = buttons[0]
        
        userEvent.click(commentBtn)

        const sendBtn = screen.getByRole('button', { name: 'Send' })
        
        const nameInput = screen.getByPlaceholderText(/name/i)
        const messageInput = screen.getByPlaceholderText(/message/i)

        userEvent.type(nameInput, 'Mark')
        userEvent.type(messageInput, 'Great stuff!')
        userEvent.click(sendBtn)
        
        expect(nameInput).toHaveValue('')
        expect(messageInput).toHaveValue('')
        
    })
    it('shows message in commentList when user writes then press enter', async () => {
      //  render(<Comments/>)
        const buttons = screen.getAllByRole('button')
        const commentBtn = buttons[0]

        userEvent.click(commentBtn)
        const nameInput = screen.getByPlaceholderText(/name/i)
        const messageInput = screen.getByPlaceholderText(/message/i)

        userEvent.type(nameInput, 'Linda')
        userEvent.type(messageInput, 'Get it together Mark!')
        userEvent.keyboard('{enter}')
        
        const commentList = await screen.getAllByTestId('listitem')
        const latestPost = await commentList[0]
        expect(latestPost).toHaveTextContent('Linda')
        expect(latestPost).toHaveTextContent('Get it together Mark!')
    })
    //shows message in comment-section when user writes then presses send

    it('commnets list load correctly', ()=>{

    })
    
})