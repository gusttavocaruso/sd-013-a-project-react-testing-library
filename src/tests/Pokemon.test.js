import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';

const details = 'More details';
// https://www.w3schools.com/tags/tag_img.asp
// https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library

describe('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
  test('test', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    userEvent.click(screen.getByText(/Normal/i));
    const btn = screen.getByText('Snorlax');
    expect(btn).toBeInTheDocument();
  });
});

describe('Testa se é renderizado um card com as informações pokémon', () => {
  beforeEach(() => {
    render(<BrowserRouter><App /></BrowserRouter>);
  });
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });

  test('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const pikachu = screen.getByTestId('pokemon-type');
    expect('Electric').toEqual(pikachu.innerHTML);
  });

  test('Verifica o peso medio do pokemon', () => {
    const average = screen.getByText('Average weight: 6.0 kg');
    expect('Average weight: 6.0 kg').toEqual(average.innerHTML);
  });

  test('A imagem do Pokémon deve ser exibida', () => {
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pikachu = screen.getByRole('img');
    expect(pikachu.src).toContain(url);
    expect('Pikachu sprite').toEqual(pikachu.alt);
  });
});

describe('Teste o o card do Pokémon indicado na Pokédex', () => {
  beforeEach(() => {
    render(<BrowserRouter><App /></BrowserRouter>);
  });
  test('Testa se tem o link com o id do pikachu', () => {
    const href = 'http://localhost/pokemons/25';

    const link = screen.getByText(details);
    expect(link.href).toBe(href);
  });
});

describe('Teste  ao clicar no link de navegação do Pokémon', () => {
  beforeEach(() => {
    render(<BrowserRouter><App /></BrowserRouter>);
  });
  test('Verifica se é feito redirecionamento para detalhes do pokemon', () => {
    const link = screen.getByText(details);
    userEvent.click(link);

    const newPage = screen.getByText('Pikachu Details');
    expect(newPage).toBeInTheDocument();
  });
});
// https://www.notion.so/Gabaritos-e-Solu-es-de-Exerc-cios-de-Programa-o-7651c81ce6624473a1d66ffb0a2bd053?p=332f9886963a4491bf58da84a11f1a6b
test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
  render(<BrowserRouter><Pokemon isFavorite pokemon={ pokemons[0] } /></BrowserRouter>);
  const src = '/star-icon.svg';
  const favorite = screen.getByRole('img', { name: /marked as favorite/i });
  expect(favorite).toBeInTheDocument();

  // Verifico que ela dá match com a src desejada
  expect(favorite.src).toMatch(src);

  // Verifico que ela possui o alt text desejado
  expect(favorite.alt).toBe(`${pokemons[0].name} is marked as favorite`);
});
