
import axios from "axios";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    LOGIN: ({commit}, payload) => {
      commit;
      return new Promise((resolve, reject) => {
        axios
          .post(`login`, payload)
          .then(({ status }) => {
            if (status === 200) {
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    REGISTER: ({commit}, payload) => {
      commit;
      //hash password
      return new Promise((resolve, reject) => {
        axios
        .post(`register`, payload)
        .then(({ status }) => {
          if (status === 201) {
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