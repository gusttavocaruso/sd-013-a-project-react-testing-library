// import React from 'react';
// import { screen } from '@testing-library/react';
// import NotFound from '../components/NotFound';
// import renderWithRouter from './renderWithRouter';

// describe('Testa o componente NotFound', () => {
//   test('Testa se NotFound tem um heading h2 com o texto "Page requested not found 😭"', () => {
//     renderWithRouter(<NotFound />);

//     const getHeading = screen.getByRole('heading', {
//       name: /Page requested not found 😭/i,
//       level: 2,
//     });
//     expect(getHeading).toBeInTheDocument();
//   });

//   test('Testa se a página contém uma imagem', () => {
//     renderWithRouter(<About />);

//     const getImage = screen.getByRole('img');
//     const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

//     expect(getImage.src).toBe(src);
//   });
// });
