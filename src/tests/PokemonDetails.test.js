import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe(' Teste o componente <PokemonDetails.js /> (req7)', () => {

  it('Teste se informações detalhadas do Pokémon selecionado são mostradas.', () => {
    renderWithRouter(<App />);
    // Encontra o elemento "mais detalhes e clica nele"
    const moreDetails = screen.getByText(/More Details/i);
    fireEvent.click(moreDetails);

    // Encontra o título da página de "MoreDetails" com o nome do Pokemon 
    const title = screen.getByText(/Pikachu Details/i);
    expect(title).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();

    const h2Heading = screen.getByRole('heading',
      { name: /Summary/i,
        level: 2 });
    expect(h2Heading).toBeInTheDocument();

    const paragraph = screen.getByText(/This intelligent Pokémon/i);
    expect(paragraph).toBeInTheDocument();
   
  });

  it('Teste se exibe seção com os mapas contendo as localizações do pokémon.', () => {
    
    renderWithRouter(<App />);

    // Encontra o elemento "mais detalhes e clica nele"
    const moreDetails = screen.getByText(/More Details/i);
    fireEvent.click(moreDetails);

    // Encontra o nome do Pokemon 
    const pokemonName = (screen.getByTestId('pokemon-name')).innerHTML;
    
    // Encontra o Heading H2 e testa se está no documento
    const h2Heading = screen.getByRole('heading',
      { name: `Game Locations of ${pokemonName}`, level: 2 });
    expect(h2Heading).toBeInTheDocument();

     // Pega os mapas em que o pokemon se encontra
     const maps = screen.getAllByAltText(`${pokemonName} location`)
    
     // Verifica se tem pelo menos um mapa na página
     expect(maps.length).toBeGreaterThanOrEqual(1)

     maps.forEach((map) => {
       expect(map.src).not.toBe('')
       expect(map.alt).toBe(`${pokemonName} location`)
     })
  });

  it('Teste se o usuário pode favoritar um pokémon na página "MoreDetails"', () => {
    
    renderWithRouter(<App />);
    // Encontra o elemento "mais detalhes e clica nele"
    const moreDetails = screen.getByText(/More Details/i);
    fireEvent.click(moreDetails);

    // Encontra a Check-box para favoritar o Pokemon
    const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(checkbox).toBeInTheDocument
    
    fireEvent.click(favorite);
    expect(checkbox.checked).toBe(true);

  });
});
