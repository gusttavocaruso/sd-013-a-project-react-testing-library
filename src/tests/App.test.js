import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Testando os links no componente App', () => {
  test('Testa se o primeiro link contém o texto Home', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(linkHome);

    const homeContent = screen.getByRole('heading', {
      level: 1,
      name: /pokédex/i,
    });
    expect(homeContent).toBeInTheDocument();
  });
});
