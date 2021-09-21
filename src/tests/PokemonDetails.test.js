import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

describe('Requisito 7: Teste o componente <PokemonDetails.js />', () => { // descrição do teste
  test('7.1 - Teste se as informações detalhadas são mostradas na tela', () => { // teste do requisito 1
    // acessar os elementos da tela
    const { name, image, summary, foundAt } = pokemons[0];
    render(
      <BrowserRouter>
        {/* renderiza o componente App */}
        <App />
      </BrowserRouter>,
    );
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const pikachuDetails = screen.getByRole('heading', { name: /pikachu detail/i });
    expect(pikachuDetails).toBeInTheDocument();

    const summaryP = screen.getByText(`${summary}`);
    expect(summaryP).toBeInTheDocument();
    const summaryText = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summaryText).toBeInTheDocument();

    // 7.2 Teste se existe na página uma seção com os mapas contendo as localizações do pokémon
    const gameLocation = screen.getByText(`Game Locations of ${name}`, { exact: false });
    expect(gameLocation).toBeInTheDocument();
    foundAt.forEach((item, index) => {
      const pokeMap = screen.getAllByRole('img', { name: `${name} location` });
      expect(pokeMap[index]).toHaveAttribute('src', item.map);
    });

    // 7.3 Teste se o usuário pode favoritar um pokémon através da página de detalhes
    const checkFavorite = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(checkFavorite);

    const favoriteIcon = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
