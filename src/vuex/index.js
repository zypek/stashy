import * as actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
  tickers: {},
  prices: {},
  assets: {},
};

export default {
  state,
  actions,
  getters,
  mutations,
};