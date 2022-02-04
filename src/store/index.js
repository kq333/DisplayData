import { createStore } from "vuex";

export default createStore({

  state: {

    arrayData: [],
    showHideId: [],
    findValue: [],
    page: 1,
    perPage: 10,
    isSort: false,

  },

  mutations: {

    ApiData(state, payload) {
      state.arrayData = payload;
    },

    delateItem(state, payload) {
      const findIndex = state.arrayData.findIndex((elem) => elem === payload);
      state.arrayData.splice(findIndex, 1);
    },

    showHideText(state, payload) {
      const findNum = state.showHideId.find((elem) => elem == payload);
      const findIndex = state.showHideId.findIndex((elem) => elem == payload);

      if (findNum == undefined) {
        state.showHideId.push(payload);
      } else if (findNum) {
        state.showHideId.splice(findIndex, 1);
      }
    },

    nextBlockData(state, payload) {
      state.page = payload;
    },

    leftNumPagination(state, payload) {
      state.page = payload;
    },

    rightNumPagination(state, payload) {
      state.page = payload;
    },

    SearchValue(store, payload) {
      store.isSort = false;
      store.findValue = payload;
    },

    sortedData(state, payload) {
      state.isSort = payload;
    },
  },

  actions: {

    async getData({ commit, state }) {

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/?_page=${state.page}&_limit=${state.perPage}`
      );

      if (response.status >= 200 && response.status <= 299) {

        const fetchedData = await response.json();
        commit("ApiData", fetchedData);

      } else {
        console.log(`Error number: ${response.status}`);
      }
    },
  },

  /* modules: {
  } */
});
