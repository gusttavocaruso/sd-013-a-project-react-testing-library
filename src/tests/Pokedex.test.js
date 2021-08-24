// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
// import Pokedex from '../components/Pokedex';
// import App from '../App';
// import pokemons from '../data';

// describe('Pokedex.js tests', () => {
//   test('Se página contém um heading h2 com o texto Encountered pokémons', () => {
//     render(
//       <BrowserRouter>
//         <Pokedex />
//       </BrowserRouter>,
//     );

//     const h2 = screen.getByRole('heading', {
//       level: 2,
//       name: /Encountered pokémons/i,
//     });
//     expect(h2).toBeInTheDocument();
//   });

//   test('Primeiro Bloco - 6 testes', () => {
//     render(
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>,
//     );

//     const buttonNext = screen.getByTestId('next-pokemon');
//     expect(buttonNext).toBeInTheDocument();

//     userEvent.click(screen.getByText(nextPokemon));
//     const next = screen.getByText('Charmander');
//     expect(next).toBeInTheDocument();

//     userEvent.click(screen.getByText(nextPokemon));
//     const next2 = screen.getByText('Caterpie');
//     expect(next2).toBeInTheDocument();

//     pokemons.forEach((pokemon, index) => {
//       if (index < pokemons.length) userEvent.click(buttonNext);
//       const first = screen.getByText('Pikachu');
//       expect(first).toBeInTheDocument();
//     });
//   });
// });
