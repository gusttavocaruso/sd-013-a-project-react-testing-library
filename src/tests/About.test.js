import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa componente "About"', () => {
  it('faz o teste da bagaça', () => {
    render(<About />);
    const heading = screen.getByRole('heading');
    expect(heading.textContent).toBe('About Pokédex');
  });
});