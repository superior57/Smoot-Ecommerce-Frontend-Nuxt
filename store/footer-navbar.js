export const state = () => ({
  isProductView: false,
});

export const getters = {
  IS_PRODUCT_VIEW(state) {
    return state.isProductView;
  },
};

export const mutations = {
  SET_IS_PRODUCT_VIEW(state, payload) {
    state.isProductView = payload;
  },
};
