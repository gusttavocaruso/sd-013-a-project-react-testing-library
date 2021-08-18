import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do About', () => {
  test('Teste', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');
    const aboutH = screen.getByRole('heading', { name: 'About Pokédex' });
    const aboutP1 = screen.getByText(/This application/i);
    const aboutP2 = screen.getByText(/Pokémons by type/i);
    const aboutImg = screen.getByRole('img', { name: 'Pokédex' });

    expect(aboutH).toBeInTheDocument();
    expect(aboutP1).toBeInTheDocument();
    expect(aboutP2).toBeInTheDocument();
    expect(aboutImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
