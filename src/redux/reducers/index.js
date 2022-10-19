// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
// Ajuda do Queonias para realizar o requisito junto com a mentoria da Summer Hellen
const rootReducer = combineReducers({ user, wallet });

export default rootReducer;
