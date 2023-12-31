import { GET_CURRENCIES, GET_SUBMIT, RMV_EXPENSES } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  // editor: false, // valor booleano que indica de uma despesa está sendo editada
  // idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };

  case GET_SUBMIT:
    // console.log(state.wallet.expenses);
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.obj, ...{ exchangeRates: { ...action.payload } } },
      ],
    };

  case RMV_EXPENSES:
    return {
      ...state,
      expenses: action.currentExpense,
    };

  default:
    return state;
  }
};

export default wallet;
