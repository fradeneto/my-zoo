import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Zoo } from './zoo';

describe('presentation/pages/zoo', () => {
  const makeSut = () => {
    const screen = render(<Zoo />);
    return {
      screen,
    };
  };

  test('Should main component be rendered', async () => {
    const { screen } = makeSut();
    expect(screen.getByTestId('zoo-main')).toBeInTheDocument();
  });

  test('All animals should be rendered', async () => {
    const { screen } = makeSut();
    await waitFor(() => screen.getByTestId('Giraffe-14'));
    expect(screen.getByTestId('Elephant-0')).toBeInTheDocument();
    expect(screen.getByTestId('Elephant-1')).toBeInTheDocument();
    expect(screen.getByTestId('Elephant-2')).toBeInTheDocument();
    expect(screen.getByTestId('Elephant-3')).toBeInTheDocument();
    expect(screen.getByTestId('Elephant-4')).toBeInTheDocument();
    expect(screen.getByTestId('Monkey-5')).toBeInTheDocument();
    expect(screen.getByTestId('Monkey-6')).toBeInTheDocument();
    expect(screen.getByTestId('Monkey-7')).toBeInTheDocument();
    expect(screen.getByTestId('Monkey-8')).toBeInTheDocument();
    expect(screen.getByTestId('Monkey-9')).toBeInTheDocument();
    expect(screen.getByTestId('Giraffe-10')).toBeInTheDocument();
    expect(screen.getByTestId('Giraffe-11')).toBeInTheDocument();
    expect(screen.getByTestId('Giraffe-12')).toBeInTheDocument();
    expect(screen.getByTestId('Giraffe-13')).toBeInTheDocument();
    expect(screen.getByTestId('Giraffe-14')).toBeInTheDocument();
  });

  test('Should buttons be rendered', async () => {
    const { screen } = makeSut();
    expect(screen.getByTestId('button-add-1-hour')).toBeInTheDocument();
    expect(screen.getByTestId('button-feed-animals')).toBeInTheDocument();
  });
});
