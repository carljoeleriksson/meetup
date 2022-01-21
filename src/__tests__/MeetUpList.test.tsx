
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import MeetUpList from '../components/MeetUpList';

describe('Meet Up list Testing', () => {

  it('Render meetup list from JSON file/', async () => {

    await act(async () => {

      render(<MeetUpList />)
      
    }

    );

    const meetUpTile = screen.getByText(/Meet Up One/i)

    expect(meetUpTile).toBeInTheDocument()


  })
})

