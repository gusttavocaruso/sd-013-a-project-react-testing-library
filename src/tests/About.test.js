import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('About.js tests', () => {
  test('Verifica se página tem um heading h2', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const about = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(about);

    const titleH2 = screen.getByText('About Pokédex');
    expect(titleH2).toBeInTheDocument();
  });
  test('Verifica o primeiro paragrafo', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const about = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(about);

    const paragraph1 = screen.getByText(/this application/i);

    expect(paragraph1).toBeInTheDocument();
  });
  test('Verifica o segundo parágrafo', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const about = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(about);

    const paragraph2 = screen.getByText(/one can/i);

    expect(paragraph2).toBeInTheDocument();
  });
  test('Verifica se a pagina contem uma imagem', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const about = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(about);

    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
  });
});
