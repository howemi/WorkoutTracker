
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
    LOGIN: ({commit}, payload) => {
      commit;
      return new Promise((resolve, reject) => {
        axios
          .post(`login`, payload)
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
    REGISTER: ({commit}, payload) => {
      // commit;
      //hash password
      return new Promise((resolve, reject) => {
        axios
        .post(`register`, payload)
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