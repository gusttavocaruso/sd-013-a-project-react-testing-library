import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Requisito 2 - Verificando funcionamento do componente <About />', () => {
  // Antes de cada teste renderiza novamente o componente App
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('Verifica se a página contém um h2 com o texto "About Pokédex"', () => {
    // Identifica o H2 na tela renderizada
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.innerHTML).toStrictEqual('About Pokédex');
  });

  it('Verifica a existência de 2 parágrafos no documento, '
     + 'com texto sobre a Pokédex', () => {
    // Existe em cada parágrafo apenas 1 palavra 'Pokémons', e existem 2 parágrafos
    const pokemonWord = screen.getAllByText(/Pokémons/);
    expect(pokemonWord).toHaveLength(2);
  });

  it('Verifica se a página contém a ilustração de uma Pokédex', () => {
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    // Acima é a src da imagem da pokedex, e abaixo estamos verificando a existência da imagem pelo 'role' e verificando se seu src correspodne à url dada
    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img).toBeInTheDocument();
    expect(img.src).toStrictEqual(src);
  });
});
