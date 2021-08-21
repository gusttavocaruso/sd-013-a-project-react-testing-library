import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

const {
  id,
  name,
  type,
  averageWeight: { value, measurementUnit },
  image,
} = pokemons[0];

describe('Teste se é renderizado um card com as informações de determinado pokémon',
  () => {
    test('Testa se um card com a informação de cada pokemon é renderizada', () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

      // O nome correto do Pokémon deve ser mostrado na tela
      const getPokemonType = screen.getByTestId('pokemon-name');
      expect(getPokemonType).toHaveTextContent(name);

      // O tipo correto do pokémon deve ser mostrado na tela
      const getPokemonName = screen.getByTestId('pokemon-type');
      expect(getPokemonName).toHaveTextContent(type);

      // O tipo correto do pokémon deve ser mostrado na tela
      // https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
      const getImageByAltText = screen.getByTestId('pokemon-weight');
      expect(getImageByAltText).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );
      // Fazendo o inspecionar o nome do pokemon vem com 'sprite'
      const getPokemonAltName = screen.getByAltText(`${name} sprite`);
      expect(getPokemonAltName).toHaveAttribute('src', image);
    });

    test('Testa se o card do pokemon tem um link de navegação ', () => {
      // Trabalhando com rotas precisamos desestruturar o history
      const { history } = renderWithRouter(<Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
      />);

      // Pegando o link e verificando se ele está no documento
      const getLinkDetails = screen.getByRole('link', { name: /More details/i });
      expect(getLinkDetails).toBeInTheDocument();

      // Verificando se ao clicar no link ele vai para o path /pokemons
      userEvent.click(getLinkDetails);
      expect(history.location.pathname).toBe(`/pokemons/${id}`);
    });

    test('Testa se existe um ícone de estrela quando damos check em "Pokemon favoritado"',
      () => {
        renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
        // Aqui meu lint reclamou quando coloquei isFavorite como true, então imagino que
        // apenas com o isFavorite ele entendeu que o pokemon estava sendo favoritado e por isso
        // fiz o teste sem a necessidade do click
        const getFavoritePokemon = screen.getByRole('img',
          { name: `${name} is marked as favorite` });
        expect(getFavoritePokemon).toBeInTheDocument();
        expect(getFavoritePokemon.src).toBe('http://localhost/star-icon.svg');
      });
  });
