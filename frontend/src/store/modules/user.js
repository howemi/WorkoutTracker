
import axios from "axios";
const bcrypt = require('bcryptjs')
const saltRounds = 10

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
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if(err) {
          throw err
        } else {
          bcrypt.hash(payload.password, salt, (err, hash) => {
            if(err) {
              throw err
            } else {
              payload.password = hash
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
            }
          })
        }
      })
    }, // end Register
  }
};