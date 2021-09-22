import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

/**
  Consultei o repositório do Gabriel Lenz.
  Foi dai q veio a ideia de utilizar o metodo getAllByText e testar o tamanho do array para saber se há  dois paragrafos.
  https://github.com/tryber/sd-013-a-project-react-testing-library/tree/gabriellenz-projectrtl
*/

describe('Requisito 2: texte do componente About', () => {
  it('Requisito 1.1: Teste se a página heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    /** ======== acessando o elemento ========= */
    const h2heading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });

    /** ======== testando os elementos ========= */
    expect(h2heading).toBeInTheDocument();
  });

  it('Requisito 1.2: Testa se a página contém dois parágrafos.', () => {
    renderWithRouter(<About />);
    /** ======== acessando o elemento =========
     Acessamos os elementos se valendo do fato de haver uma palavra pokemon em cada paragrafo, ideia do Gabriel Lenz.
    */
    const paragrafo = screen.getAllByText(/Pokémons/);

    /** ======== testando os elementos ========= */
    expect(paragrafo).toHaveLength(2);
  });

  it('Requisito 1.2: Testa se a página contém dois parágrafos.', () => {
    renderWithRouter(<About />);
    /** ======== acessando o elemento =========
     className="pokedex-image"
    */
    const img = screen.getByRole('img', { className: 'pokedex-image' });
    const urlImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    /** ======== testando os elementos ========= */
    expect(img.src).toStrictEqual(urlImg);
  });
});
