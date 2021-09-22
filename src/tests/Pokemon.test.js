import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import historyComponent from '../components/historyComponent';

describe('Teste o componente <Pokemon.js />', () => {
  test('Verifica se nome correto do Pokémon é mostrado na tela;', () => {
    historyComponent(<App />);
    const name = screen.getByText(/Pikachu/i);
    expect(name).toBeInTheDocument();
  });

  test('Verifica se o tipo correto do Pokémon é mostrado na tela', () => {
    historyComponent(<App />);
    const poketype = screen.getAllByText(/Electric/i);
    expect(poketype).toHaveLength(2);
  });

  test('Verifica se o peso médio do Pokémon é mostrado na tela', () => {
    historyComponent(<App />);
    const measurement = screen.getByText('Average weight: 6.0 kg');
    expect(measurement).toBeInTheDocument();
  });

  test('Verifica se a imagem do pokemon é mostrada na tela', () => {
    historyComponent(<App />);
    const pokeimage = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pokeimage.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Verifica funcionalidade dos detalhes do card do Pokémon', () => {
    const { history } = historyComponent(<App />);
    const details = screen.getByRole('link', { name: /More Details/i });
    expect(details).toBeInTheDocument();

    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);
    const star = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});

// No teste da funcionalidade dos detalhes, é verificado se existe um link "More Details", não é verificado o redirect.
// É Verificado o link, se bate com o ID do pokémon. Falta dinamismo.
// E se existe um checkbox de pokémon favoritado e se tem um ícone de estrela nos Pokémons favoritados.
