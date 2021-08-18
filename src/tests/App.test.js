import React from "react";
import { screen } from '@testing-library/dom';
import fireEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testar o App.js', () => {
    it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
        renderWithRouter(<App />);
        const home = screen.getByRole('link', { name: 'Home' })
        expect(home).toBeInTheDocument();
        const about = screen.getByRole('link', { name: 'About' })
        const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' })
    });

    it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.', () => {
        const { history } = renderWithRouter(<App />);
        history.push('/');
        fireEvent.click(screen.getByRole('link', { name: 'Home' }))
        expect(history.location.pathname).toBe('/');
    })

    it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', () => {
        const { history } = renderWithRouter(<App />); 
        history.push('/about')
        fireEvent.click(screen.getByRole('link', { name: 'About' }))
        expect(history.location.pathname).toBe('/about');
    })

    it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
        const { history } = renderWithRouter(<App />); 
        history.push('/favotites')
        fireEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }))
        expect(history.location.pathname).toBe('/favorites');
    })

    it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
        const { history } = renderWithRouter(<App />); 
        history.push('/nao-encontrada')
        expect(history.location.pathname).toBe('/nao-encontrada')
        // const msg = 'Pagina nao encontrada'
        // const msg2 = screen.getByText(msg)
        // expect(msg2).toBeInTheDocument();
    })
});
