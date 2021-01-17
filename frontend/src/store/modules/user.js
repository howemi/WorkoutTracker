
import axios from "axios";

export default {
  state: {
    token: null,
  },
  getters: {
    TOKEN: state => {
      return state.token
    },
  },
  mutations: {
    SET_AUTH_TOKEN: (state, payload) => {
      state.token = payload
    }
  },
  actions: {
    INVALIDATE_TOKEN: (context) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/logout', { token: context.getters.TOKEN }, {headers: {origin: 'http://www.olympiate.com'}})
          .then(({ status }) => {
            if (status === 200) {
              context.commit('SET_AUTH_TOKEN', null)
              resolve(true)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    LOGIN: ({ commit }, payload) => {
      commit;
      return new Promise((resolve, reject) => {
        axios
          .post(`login`, payload, {headers: {origin: 'http://www.olympiate.com'}})
          .then((response) => {
            if (response.status === 200) {
              commit('SET_AUTH_TOKEN', response.data.token)
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    REGISTER: ({ commit }, payload) => {
      // commit;
      //hash password
      return new Promise((resolve, reject) => {
        axios
          .post(`register`, payload, {headers: {origin: 'http://www.olympiate.com'}})
          .then((response) => {
            if (response.status === 200) {
              commit('SET_AUTH_TOKEN', response.data.token)
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }, // end Register
  }
};
