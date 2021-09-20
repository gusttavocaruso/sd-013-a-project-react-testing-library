import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';

describe('Testa se o componente Pokemon renderiza corretamente', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Verifica se é renderizado um card '
  + 'com as informações de determinado pokémon.', () => {
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const electric = screen.getByTestId('pokemon-type').innerHTML;
    expect(electric).toStrictEqual('Electric');
    const averageWeight = screen.getByTestId('pokemon-weight').innerHTML;
    expect(averageWeight).toStrictEqual('Average weight: 6.0 kg');
    const img = screen.getByRole('img');
    expect(img.alt).toStrictEqual('Pikachu sprite');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Verifica se o card do Pokémon indicado na Pokédex contém um link de navegação '
  + 'para exibir detalhes deste Pokémon.', () => {
    const details = screen.getByRole('link', { name: 'More details' });
    expect(details).toBeInTheDocument();
    const { id } = pokemons[0];
    expect(details.href).toBe(`http://localhost/pokemons/${id}`);
  });

  it('Verifica se ao clicar no link de navegação do Pokémon, é feito o redirecionamento '
  + 'da aplicação para a página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ pokemons[0] } />,
    );
    fireEvent.click(screen.getAllByRole('link', { name: 'More details' })[1]);
    const { pathname } = history.location;
    const { id } = pokemons[0];
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon isFavorite pokemon={ pokemons[0] } />);
    const img = screen.getByAltText('Pikachu is marked as favorite');
    expect(img).toBeInTheDocument();
    expect(img.src).toMatch('/star-icon.svg');
  });
});
