import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  valorTotal = () => {
    const { expenses } = this.props;
    let totalDespesa = 0.00;
    if (expenses.length > 0) {
      expenses.forEach((exp) => {
        const cotacaoAtual = exp.exchangeRates[exp.currency].ask;
        totalDespesa += exp.value * cotacaoAtual;
      });
      return totalDespesa.toFixed(2);
    }
    return '0.00';
  };

  render() {
    const { email } = this.props;
    // const total = expenses.map((account) => {
    //   const cotation = Number(account.exchangeRates[account.currency].ask);
    //   const valorReal = cotation * Number(account.value);
    //   return Number(valorReal);
    // });
    // const valorTotal = total.reduce((sum, i) => sum + i, 0);

    return (
      <header>
        <span data-testid="email-field">
          { email }
        </span>
        <span data-testid="total-field">
          { this.valorTotal() }
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
  expenses: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
