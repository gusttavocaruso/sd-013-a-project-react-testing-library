import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

describe('testing about component', () => {
  test('check if component About renders pokedex information', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const pokeDexInfo = screen.getAllByTestId('paragraph');
    expect(pokeDexInfo[0]).toBeInTheDocument();
  });
  test('check if component About has an h2  with text  About Pokédex', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const text = screen.getByRole('heading', {
      level: 2,
    });
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent(/about pokédex/i);
  });
  test('check if component About has 2 paragraphs', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const element1 = screen.getByText(/This application simulates/i);
    const element2 = screen.getByText(/One can filter Pokémons/i);

    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();

    expect(elements.length).toBe(2);
  });
  test('check if component About has one pokdéx img', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
