import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  render() {
    const { coins } = this.props;
    return (
      <form>
        <label htmlFor="value">
          <input
            // name="email"
            type="number"
            id="value"
            // placeholder="email"
            data-testid="value-input"
            // onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          <input
            // name="email"
            type="text"
            id="description"
            // placeholder="email"
            data-testid="description-input"
            // onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="select">
          <select
            // name="email"
            id="select"
            data-testid="currency-input"
            // onChange={ this.handleChange }
          >
            {coins?.map((coin, i) => (
              <option key={ i }>{coin}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          <select
            // name="email"
            id="method"
            data-testid="method-input"
            // onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            // name="email"
            id="tag"
            data-testid="tag-input"
            // onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
});

WalletForm.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
