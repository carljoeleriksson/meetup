import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from '../App';
import MeetupManager from '../pages/MeetupManager';
import { mockLocalStorage } from '../utils/mockLocalStorage';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
const { getItemMock, setItemMock } = mockLocalStorage();



describe('Meetups Manager', () => {

    beforeEach(()=>{

        getItemMock.mockReturnValue('[{"Id":1,"Date":"2022-04-26 11:45","Title":"Meet Up One","Description":"MeetUp One Description","Host":"Omar","Image":"http://example.com/image.jpg","Attend":false},{"Id":2,"Date":"2023-04-26 11:45","Title":"Meet Up Two","Description":"MeetUp Two Description ","Host":"Hoster Two","Image":"http://example.com/image.jpg","Attend":false}]');
  
        render(
            <BrowserRouter>

            <MeetupManager />
            </BrowserRouter>

        )
  
      })
    

      it('renders without crashing', async () => {




        expect(getItemMock).toHaveBeenCalled();



    })

    it('Delete a meetup', async () => {

        setItemMock.mockReturnValue('[{"Id":2,"Date":"2023-04-26 11:45","Title":"Meet Up Two","Description":"MeetUp Two Description ","Host":"Hoster Two","Image":"http://example.com/image.jpg","Attend":false}]')


        const deleteAnchor:any =  screen.getByTestId('delete#1')

        userEvent.click(deleteAnchor)


        const container:any =  screen.getByTestId('meetups-list')

        expect(container).toHaveTextContent('Meet Up Two')    

        expect(container).not.toHaveTextContent('Meet Up One')        


    })


    
    it('render edit meetup form', async () => {

       // getItemMock.mockReturnValue('[{"Id":2,"Date":"2023-04-26 11:45","Title":"Meet Up Two","Description":"MeetUp Two Description ","Host":"Hoster Two","Image":"http://example.com/image.jpg","Attend":false}]')


        const anchor:any =  screen.getByTestId('edit#2')

      //  const createMeetupBtn = screen.getByRole('button', {name: /edit meetup/i})
      //  userEvent.click(createMeetupBtn);

        userEvent.click(anchor)


       // const container:any =  screen.getByTestId('meetups-list')

     //expect(container).toHaveTextContent('Meet Up Two Got Updated')        
     const headingElem = screen.getByRole('heading', {name: /Edit Meetup/i})

     expect(headingElem).toBeInTheDocument()

     const titleInput = screen.getByLabelText(/title:?/i)

     expect(titleInput).toHaveAttribute('value', 'Meet Up Two');


    })


})
