import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.map((account) => {
      const cotacao = Number(account.exchangeRates[account.currency].ask);
      const valorReal = cotacao * Number(account.value);
      return Number(valorReal);
    });
    const valorTotal = total.reduce((sum, i) => sum + i, 0);
    return (
      <header>
        <span data-testid="email-field">
          { email }
        </span>
        <span data-testid="total-field">
          { valorTotal.toFixed(2) }
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.shape,
}.isRequired;

export default connect(mapStateToProps)(Header);
