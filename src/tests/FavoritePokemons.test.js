import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('test the Favorite Pokémon component', () => {
  it('should have a message if have no favorite pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const noFavText = screen.getByText('No favorite pokemon found');

    expect(noFavText).toBeInTheDocument();
  });

  it('should verify if, clicked in favorite, adds the pokemon to the component', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByText('More details');
    fireEvent.click(moreDetailsLink);

    const favoriteBox = screen.getByText('Pokémon favoritado?');
    fireEvent.click(favoriteBox);
    history.push('/favorites');

    const pikachu = screen.getByText('Pikachu');

    expect(pikachu).toBeInTheDocument();
  });
});
