import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Comments from '../components/Comments'

describe('Comments component', () => {
    
    it('renders without crashing', () => {
        render(<Comments/>)
    })
    it('does not show any input fields initially', () => {
        render(<Comments/>)

        const nameInput = screen.getByPlaceholderText(/name/i)
        const messageInput = screen.getByPlaceholderText(/message/i)

        expect(nameInput).not.toBeVisible()
        expect(messageInput).not.toBeVisible()
    })

    it('does show input fields when comment icon is clicked', () => {
        render(<Comments/>)

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
        render(<Comments/>)

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
        render(<Comments/>)

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
        render(<Comments/>)
        const buttons = screen.getAllByRole('button')
        const commentBtn = buttons[0]
        const sendBtn = buttons[1]
/*         const sendBtn = screen.getByRole('button', { name: 'Send' }) */
        

        userEvent.click(commentBtn)
        const nameInput = screen.getByPlaceholderText(/name/i)
        const messageInput = screen.getByPlaceholderText(/message/i)

        userEvent.type(nameInput, 'Mark')
        userEvent.type(messageInput, 'Great stuff!')
        userEvent.click(sendBtn)
        
        expect(nameInput).toHaveValue('')
        expect(messageInput).toHaveValue('')
    })
    it('shows message in commentList when user writes then press enter', () => {
        render(<Comments/>)
        const buttons = screen.getAllByRole('button')
        const commentBtn = buttons[0]
        const sendBtn = buttons[1]

        userEvent.click(commentBtn)
        const nameInput = screen.getByPlaceholderText(/name/i)
        const messageInput = screen.getByPlaceholderText(/message/i)

        userEvent.type(nameInput, 'Linda')
        userEvent.type(messageInput, 'Get it together Mark!')
        userEvent.keyboard('{enter}')
        
        const commentList = screen.getAllByRole('listitem')
        const latestPost = commentList[0]
        expect(latestPost.name).toHaveValue('Linda')
        expect(latestPost.message).toHaveValue('Get it together Mark!')
    })
    //shows message in comment-section when user writes then presses send
    
})