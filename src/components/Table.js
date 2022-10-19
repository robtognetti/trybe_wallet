import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

// Ajuda do Lucca para realizar o requisito junto com a mentoria da Summer Hellen
class Table extends Component {
  deleteButton = (id) => {
    const { expenses, dispatch } = this.props;
    console.log(id);
    const currentExpense = expenses.filter((exp) => (exp.id !== id));
    console.log(currentExpense);
    dispatch(deleteExpense(currentExpense));
  };

  // Ajuda do Lucca para realizar o requisito junto com a mentoria da Summer Hellen
  render() {
    const { expenses } = this.props;
    return (
      <table className="main-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        { expenses.map((expense) => {
          const moeda = expense.exchangeRates[expense.currency];
          return (
            <tbody key={ expense.id }>
              <tr>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{moeda.name}</td>
                <td>{(Math.round(moeda.ask * 100) / 100).toFixed(2)}</td>
                <td>{(expense.value * moeda.ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <div>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteButton(expense.id) }
                      className="delete-button"
                    >
                      Excluir
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      className="edit-button"
                    >
                      Editar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          );
        }) }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array),
}.isRequired;

export default connect(mapStateToProps)(Table);
