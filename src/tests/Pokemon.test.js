import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js/>', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const details = screen.getByText(/more details/i);
    fireEvent.click(details);
    const imgPi = screen.getAllByRole('img')[0];
    expect(screen.getByText('Electric')).toBeInTheDocument();
    expect(screen.getByText(/Average weight: 6.0 kg/i)).toBeInTheDocument();
    expect(imgPi.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(imgPi.alt).toBe('Pikachu sprite');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const link = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});
test('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');
  const link = screen.getByRole('link', { name: /more details/i });
  fireEvent.click(link);
  const favCheck = screen.getByRole('checkbox');
  fireEvent.click(favCheck);
  history.push('/favorites');
  const star = screen.getAllByRole('img');
  expect(star[1].src).toContain('/star-icon.svg');
  expect(star[1].alt).toContain('Pikachu is marked as favorite');
});
