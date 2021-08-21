import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

const {
  name,
  foundAt,
  summary,
} = pokemons[0];

describe('Testando o componente PokemonDetails',
  () => {
    test('Testa se um card com a informação de cada pokemon é renderizada', () => {
      renderWithRouter(<App />);

      // Entrando no Link More Details porque não consegui renderizar o PokemonDetails
      // Ou seja, a primeira página de detalhes é a do Pikachu
      const getMoreDetails = screen.getByText(/More Details/i);
      userEvent.click(getMoreDetails);

      // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon
      const getHeadingText = screen.getByRole('heading', {
        name: `${name} Details`,
        level: 2,
      });
      expect(getHeadingText).toBeInTheDocument();

      // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
      expect(getMoreDetails).not.toBeInTheDocument();

      // A seção de detalhes deve conter um heading h2 com o texto Summary
      const getHeadingTextSummary = screen.getByRole('heading', {
        name: 'Summary',
        level: 2,
      });
      expect(getHeadingTextSummary).toBeInTheDocument();

      // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado
      const getTextSummary = screen.getByText(summary);
      expect(getTextSummary).toBeInTheDocument();
    });

    test('Teste se existe na página uma seção com os mapas contendo as localizações',
      () => {
        renderWithRouter(<App />);
        // Entrando no Link More Details porque não consegui renderizar o PokemonDetails
        // Ou seja, a primeira página de detalhes é a do Pikachu
        const getMoreDetails = screen.getByText(/More Details/i);
        userEvent.click(getMoreDetails);

        // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
        const getGameLocation = screen.getByRole('heading', { name:
          `Game Locations of ${name}` });
        expect(getGameLocation).toBeInTheDocument();

        // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes
        const getPokemonAltName = screen.getAllByAltText(`${name} location`);
        expect(getPokemonAltName).toHaveLength(foundAt.length);

        // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização
        foundAt.forEach((item, index) => {
          const getParagraph = screen.getByText(item.location);
          expect(getParagraph).toBeInTheDocument();

          const getPokemonAlt = screen.getAllByAltText(`${name} location`);
          expect(getPokemonAlt[index]).toHaveAttribute('src', item.map);
        });
      });

    test('Testa se o usuário pode favoritar um pokémon na pág detalhes.', () => {
      renderWithRouter(<App />);
      // Entrando no Link More Details porque não consegui renderizar o PokemonDetails
      // Ou seja, a primeira página de detalhes é a do Pikachu
      const getMoreDetails = screen.getByText(/More Details/i);
      userEvent.click(getMoreDetails);

      const getCheckbox = screen.getByRole('checkbox');
      expect(getCheckbox).toBeInTheDocument();

      userEvent.click(getCheckbox);
      expect(getCheckbox).toBeChecked();

      userEvent.click(getCheckbox);
      expect(getCheckbox).not.toBeChecked();

      const getLabel = screen.getByLabelText('Pokémon favoritado?');
      expect(getLabel).toBeInTheDocument();
    });
  });
