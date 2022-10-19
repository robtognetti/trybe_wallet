import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('tests', () => {
  test('Texto moeda brl', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const text = screen.getByText(/brl/i);

    expect(text).toBeInTheDocument();
  });
  test('valor total', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const total = screen.getByTestId('total-field');

    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('0.00');
  });
  test('data-testid header', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');
    expect(screen.getByTestId('email-field')).toBeInTheDocument();
  });
  test('Testando funcionamento do Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const password = screen.getByTestId('password-input');
    const email = screen.getByTestId('email-input');
    const button = screen.getByRole('button', { name: /entrar/i });
    const testemail = 'teste@teste.com';
    const testpassword = '123456';

    expect(password).toBeInTheDocument();
    expect(email).toBeInTheDocument();

    userEvent.type(email, testemail);
    userEvent.type(password, testpassword);
    userEvent.click(button);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');
  });
  test('Testando funcionamento do wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText('email');
    const inputSenha = screen.getByPlaceholderText('password');
    const button = screen.getByRole('button');

    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    userEvent.type(inputEmail, 'test@test.com');
    userEvent.type(inputSenha, '12345678');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  test('Editando todas as despesas', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { location: { pathname } } = history;

    const buttonadd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');

    userEvent.type(value, '1');
    userEvent.type(description, 'coxinha');
    userEvent.click(buttonadd);
    userEvent.click(buttonadd);

    const deleteExpense = await screen.findAllByTestId('delete-btn');
    expect(deleteExpense[0]).toBeInTheDocument();
    userEvent.click(deleteExpense[0]);
    expect(deleteExpense[0]).not.toBeInTheDocument();
  });
});

// const deleteExpense = await screen.findAllByTestId('delete-btn');
// expect(deleteExpense[0]).toBeInTheDocument();
// userEvent.click(deleteExpense[0]);
// expect(deleteExpense[0]).not.toBeInTheDocument();
