import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../redux/actions';

// Ajuda do Queonias para realizar o requisito junto com a mentoria da Summer Hellen
class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.checkInput());
  };

  checkInput = () => {
    const { email, senha } = this.state;
    const min = 6;
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailIsTrue = email.match(mailformat);
    if (emailIsTrue && senha.length >= min) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  handleClick = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    history.push('/carteira');
    dispatch(saveEmail(email));
  };

  render() {
    const { disabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          <input
            name="email"
            type="email"
            id="email"
            placeholder="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            name="senha"
            type="password"
            id="password"
            placeholder="senha"
            data-testid="password-input"
            // maxLength="6"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
