import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 3 - Verificando fluxo do componente <FavoritePokemons />', () => {
  renderWithRouter(<FavoritePokemons />);

  it('Veriifica se a mensagem "No favorite pokemon found" é renderizada', () => {
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  it('Verifica se todos os cards de pokémons favoritados são exibidos', () => {
    renderWithRouter(<App />);

    const details = 'More details';
    const favoritar = 'Pokémon favoritado?';

    // Selecionei a categoria 'Dragon', e fui em mais detalhes no pokemon que apareceu, que no caso foi o Dragonair e ...
    fireEvent.click(screen.getByText('Dragon'));
    fireEvent.click(screen.getByText(details));
    // ... cliquei em favoritar
    fireEvent.click(screen.getByText(favoritar));

    // Voltei para 'Home' e selecionei a categoria 'Normal', e fui em mais detalhes no pokemon que apareceu, que no caso foi o Snorlax e ...
    fireEvent.click(screen.getByText('Home'));
    fireEvent.click(screen.getByText('Normal'));
    fireEvent.click(screen.getByText(details));
    // ... cliquei em favoritar
    fireEvent.click(screen.getByText(favoritar));

    // Cliquei no botão para ver os favoritos
    fireEvent.click(screen.getByText('Favorite Pokémons'));

    // Verifico que os 2 pokemons favoritados estão em favoritos
    const fav1 = screen.getByText('Snorlax');
    expect(fav1).toBeInTheDocument();
    const fav2 = screen.getByText('Dragonair');
    expect(fav2).toBeInTheDocument();

    // Volto na 'Home', vou na categoria 'Normal' vou nos detalhes do pokemon que apareceu (Snorlax) e clico em favoritar novamente, desfavoritando
    fireEvent.click(screen.getByText('Home'));
    fireEvent.click(screen.getByText('Normal'));
    fireEvent.click(screen.getByText(details));
    fireEvent.click(screen.getByText(favoritar));

    // Vou nos favoritos
    fireEvent.click(screen.getByText('Favorite Pokémons'));

    // Verifico que 'Snrolax' saiu dos favoritos;
    const newFav1 = screen.getByText('Dragonair');
    expect(newFav1).toBeInTheDocument();
    const remove = screen.getByText('Snorlax');
    expect(remove).not.toBeInTheDocument();
  });
});
