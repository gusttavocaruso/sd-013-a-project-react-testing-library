import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import NotFound from '../components/NotFound';

function renderWithRouter(component) {
  const historyMock = createMemoryHistory();

  const view = render(
    <Router history={ historyMock }>
      {component}
    </Router>,
  );

  return {
    ...view,
    history: historyMock,
  };
}

describe('App.js tests', () => {
  test('Verifica se ao clicar no Home renderiza a página inicial', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const home = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(home);

    const homeText = screen.getByText('Encountered pokémons');

    expect(homeText).toBeInTheDocument();
  });
  test('Verifica se ao clicar em About renderiza a página sobre a aplicação', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const about = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(about);

    const aboutText = screen.getByText('About Pokédex');

    expect(aboutText).toBeInTheDocument();
  });
  test('Verifica se renderiza a página de pokémons favoritos', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const favorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    userEvent.click(favorite);

    const favoriteText = screen.getByText('Favorite pokémons');

    expect(favoriteText).toBeInTheDocument();
  });
  test('Verifica se carrega pagina Not Found', () => {
    const { history } = renderWithRouter(<NotFound />);

    history.push('/rota-teste');

    const notFoundText = screen.getByText('Page requested not found');

    expect(notFoundText).toBeInTheDocument();
  });
});
