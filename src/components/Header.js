import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Ajuda do Queonias para realizar o requisito junto com a mentoria da Summer Hellen
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

  // Ajuda do Queonias para realizar o requisito junto com a mentoria da Summer Hellen
  render() {
    const { email } = this.props;

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
