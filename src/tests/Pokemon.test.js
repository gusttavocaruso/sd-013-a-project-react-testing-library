test('', () => {});

/* import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('<Pokemon /> Section Tests', () => {
  it('should contain the right informations in pokemon card', () => {
    renderWithRouter(<App />);
    const informations = {
      name: pokemons[0].name,
      type: pokemons[0].type,
      weight: `Average weight: ${pokemons[0].weight}`,
      image: pokemons[0].image,
      alt: 'Pikachu sprite',
    };
  });
});
 */
/*
Teste se é renderizado um card com as informações de determinado pokémon.

O nome correto do Pokémon deve ser mostrado na tela;

O tipo correto do pokémon deve ser mostrado na tela.

O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.

A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;

Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;

Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.

Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;

Teste se existe um ícone de estrela nos Pokémons favoritados.

O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;

A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido.

*/
