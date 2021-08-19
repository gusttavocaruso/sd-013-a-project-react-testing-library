import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('about', () => {
  it('Checagem do header', () => {
    renderWithRouter(<App />);
    const PageLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(PageLink);
    const TituloPage = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(TituloPage).toBeInTheDocument();
  });
  it('Paragrafos', () => {
    renderWithRouter(<App />);
    const PageLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(PageLink); // fiz apenas a checagem do texto já que não há correspondência para a tag P
    const para1 = screen.getByText(/This application simulates a Pokédex/i);
    const para2 = screen.getByText(/One can filter Pokémons by type,/i);
    expect(para1).toBeInTheDocument();
    expect(para2).toBeInTheDocument();
  });
  it('imagem', () => {
    renderWithRouter(<App />);
    const PageLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(PageLink); // soucer: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
