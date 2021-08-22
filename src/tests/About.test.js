import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe('testando componente About', () => {
  test('testar se na pág. existe um heading h2 com o texto About pokédex ', () => {
    renderWithRouter(<About />);
    const headerH2 = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(headerH2).toBeInTheDocument();
  });
  test('teste se a página contém dois parágrafos', () => {
    renderWithRouter(<About />);
    // aqui fiz o teste procurando pelo texto. não descobri como buscar expecificamente um paragráfo.
    const tagOne = screen.getByText(/This application simulates a Pokédex,/i);
    expect(tagOne).toBeInTheDocument();
    const tagTwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(tagTwo).toBeInTheDocument();
  });
  test('teste se a página contém a imagem', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toBeInTheDocument();
  });
});
