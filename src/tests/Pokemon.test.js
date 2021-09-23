import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';
import App from '../App';
// ==================================
// Optei por importar o dataset inteiro, pois é uma info estatica (é uma api simulada).
// No mundo real o ideal seria declarar um objeto no próprio arquivo, para ser independente de api externa.
import data from '../data';
// ==================================
describe('Requisito 6 - Pokemon.js', () => {
  test('Verifique se é renderizado um card com as infos de determinado pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ data[1] } isFavorite />);
    const strName = screen.getByText(/Charmander/i);
    expect(strName).toBeInTheDocument();
    const strType = screen.getByText(/Fire/i);
    expect(strType).toBeInTheDocument();
    const strWeight = screen.getByText(/Average weight: 8.5 Kg/i);
    expect(strWeight).toBeInTheDocument();
    // ===== ajuda para obter a imagem correta ===========
    // Source: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
    const pathImage = 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png';
    const charmanderImage = screen.getByAltText(/charmander sprite/i);
    expect(charmanderImage.src).toContain(pathImage);
    // or
    expect(charmanderImage).toHaveAttribute('src', pathImage);
    // ===================================================
    // == verifica se apresenta link para mais detalhes ==
    const linkToDetailsCharmander = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkToDetailsCharmander).toBeInTheDocument();
    expect(linkToDetailsCharmander.href).toContain(`/pokemons/${data[1].id}`);
    // or:
    expect(linkToDetailsCharmander).toHaveAttribute('href', `/pokemons/${data[1].id}`);
    // To get the fav icon image:
    const srcFavIcon = '/star-icon.svg';
    const favImage = screen.getByAltText(`${data[1].name} is marked as favorite`);
    expect(favImage.src).toContain(srcFavIcon);
    // or:
    expect(favImage).toHaveAttribute('src', srcFavIcon);
  });

  test('Verifica se o card contém um link de nav para mostrar detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const linktoDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linktoDetails).toBeInTheDocument();
    const routeToDetailsPikachu = '/pokemons/25';
    expect(linktoDetails.href).toContain(routeToDetailsPikachu);
    // or:
    expect(linktoDetails).toHaveAttribute('href', routeToDetailsPikachu);
  });

  test('Verifica se history atualiza através do link "more details"', () => {
    // Source: https://react-testing-examples.com/jest-rtl/react-router/
    // Source: https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/await-async-query.md
    renderWithRouter(<App />);
    const linktoDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linktoDetails);
    expect(screen.findByText('/pokemons/25')).resolves.toBe(true);
  });

  // =============================================================================================
  // Source that refers to below: https://dev.to/ilumin/test-history-in-react-router-17f5
  // const mockHistory = {
  //   push: jest.fn(),
  // };
  // await act(() => {
  //   render(
  //     <Router history={ mockHistory }>
  //       <App />
  //     </Router>,
  //   );
  // expect(mockHistory.push).toBeCalledTimes(1);
  // expect(mockHistory.push).toBeCalledWith('/pokemons/25');
  // =============================================================================================
});
