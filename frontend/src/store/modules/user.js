
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
          .post('mysql/logout', { token: context.getters.TOKEN })
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
          .post(`mysql/login`, payload)
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
          .post(`mysql/register`, payload)
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
