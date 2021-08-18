import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa o componete "About"', () => {
  test('Testa se a página "About" possui um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const headingElement = screen.getByRole('heading', { name: /About Pokédex/i }); // Recupera o elemento heading
    expect(headingElement).toBeInTheDocument();
  });

  test('Testa se a página "About" possui dois parágrafos com texto sobre Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph = /This application simulates|One can filter/i;
    // Recupera fraguimentos dos dois paragrafos e guarda na constate paragraph
    const pElement = screen.getAllByText(paragraph); // Passa os elemento recuperado para a const pElement
    expect(pElement).toHaveLength(2);
    // Testa se existe os dois paragrafos, com os fraguimentos de texto em respectivo paragrafo.
  });

  test('Testa se a página tem uma imagem de uma "Pokédex"', () => {
    renderWithRouter(<About />);
    const image = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    // Recupera o link da imagem e guarda na constate image
    const imageElement = screen.getByRole('img', { src: image }); // Guarda o elemento recuperado
    expect(imageElement.src).toBe(image); // Verifica de fato se imagem consta no component
  });
});
