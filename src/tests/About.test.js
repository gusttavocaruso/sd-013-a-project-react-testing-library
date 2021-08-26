// PROJETO FEITO COM AJUDA DO MATHEUS DUARTE , ROGERIO , JOSUÉ, RAFAEL PELO DISCORD.
import React from 'react';
import { screen } from '@testing-library/react';
import RouterNHistory from './RouterNHistory';
import About from '../components/About';

describe('Requisito 2 - Verificando funcionamento do componente <About />', () => {
  beforeEach(() => {
    RouterNHistory(<About />);
  });

  it('Verifica se a página contém um h2 com o texto "About Pokédex"', () => {
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.innerHTML).toStrictEqual('About Pokédex');
  });

  it('Verifica a existência de 2 parágrafos no documento, '
     + 'com texto sobre a Pokédex', () => {
    const pokemonWord = screen.getAllByText(/Pokémons/);
    expect(pokemonWord).toHaveLength(2);
  });

  it('Verifica se a página contém a ilustração de uma Pokédex', () => {
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img).toBeInTheDocument();
    expect(img.src).toStrictEqual(src);
  });
});
