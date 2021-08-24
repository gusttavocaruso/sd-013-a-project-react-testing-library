import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Segundo requisito: Página de Sobre', () => {
  beforeEach(() => { // reseta o componente a cada iteração.
    renderWithRouter(<About />);
  });

  it('Verifica se existe um h2 com o texto especificado', () => {
    const aboutHeading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' }); // puxamos o h2 pelo papel dele, o elemento level representa o leque de Heading disponível: 1, 2, 3, 4...
    expect(aboutHeading).toBeInTheDocument();
    // expect(aboutHeading.innerHTML).toStrictEqual('About Pokédex'); // esperamos que o texto dentro da h2 seja 'About Pokédex'. Se fosse expect(aboutHeading) ele iria nos retornar <h2>About Pokédex</h2>. Por isso utilizamos o innerHTML.
  });

  it('Verifica se existem dois parágrafos', () => {
    const paragraph = screen.getAllByText(/Pokémons/); // em cada um dos parágrafos existe apenas uma palavra 'Pokémons', então utilizamos de referência para resgatar os elementos.
    expect(paragraph).toHaveLength(2);
  });

  it('Verifica se a URL especificada está presente', () => {
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'; // armazenamos a URL especificada em uma constante para podermos utilizá-la.
    const img = screen.getByRole('img', { name: 'Pokédex' }); // no doc HTML, o alt da imagem é "Pokédex", resgatamos o elemento por ele.
    expect(img).toBeInTheDocument();
    expect(img.src).toStrictEqual(src);
  });
});
