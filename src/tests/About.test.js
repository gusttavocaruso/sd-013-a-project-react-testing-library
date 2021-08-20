import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { About } from '../components';

describe('Teste o componente "<About.js />".', () => {
  it('Teste se a página contém um heading "h2" com o texto "About Pokédex"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const aboutAll = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(aboutAll).toBeInTheDocument();
    expect(aboutAll).toHaveTextContent('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokémons.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );

    const twoParagraphs = screen.getAllByText(/Pokémons/i);
    const isTagNameP = twoParagraphs.every((tag) => tag.tagName === 'P');
    expect(twoParagraphs).toHaveLength(2);
    expect(isTagNameP).toBe(true);
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex.', () => {
    const history = createMemoryHistory();
    const expected = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/'
      + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );

    const imgURL = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(imgURL).toBeInTheDocument();
    expect(imgURL.src).toBe(expected);
  });
});
