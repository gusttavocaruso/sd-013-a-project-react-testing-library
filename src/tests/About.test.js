import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import About from '../components/About';

describe('Requisito 2 - Testa o funcionamento do componente <About />', () => {
  beforeEach(() => {
    RenderWithRouter(<About />);
  });

  test('Testa se contém informações sobre a "Pokédex" na página', () => {
    const infoPokemon = screen.getAllByText(/Pokémons/i);
    expect(infoPokemon).toHaveLength(2);
  });

  test('Testa se a página contém heading h2 com o texto "About Pokédex"', () => {
    const h2 = screen.getByRole('heading', { level: 2 });// A regra para <h2> é heading
    expect(h2.innerHTML).toStrictEqual('About Pokédex');
  });

  test('Testa de a página contém uma ilustração do Pokedex', () => {
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const tagImg = screen.getByRole('img', { name: 'Pokédex' });
    expect(tagImg).toBeInTheDocument();
    expect(tagImg.src).toStrictEqual(src);
  });
});
