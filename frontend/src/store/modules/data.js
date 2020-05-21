import Vue from "vue"
import axios from "axios"

export default {
  state: {
    workouts: []
  },
  getters: {
    WORKOUTS: state => {
      return state.workouts
    },
    EXERCISE_COUNT: state => index => {
      if (index) {
        return state.workouts.find(workout => workout.id === index).exercises.length;
      }
    },
  },
  mutations: {
    SET_WORKOUTS: (state, payload) => {
      state.workouts = payload
    },
    ADD_WORKOUT: (state, payload) => {
      state.workouts.unshift(payload)
    },
  },
  actions: {
    POST_WORKOUT: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`workouts`, payload)
          .then(({ data, status }) => {
            commit("ADD_WORKOUT", data);
            if (status === 200 || status === 201) {
              resolve({ data, status });
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GET_WORKOUTS: async ({ commit }) => {
      //let { data } = await axios.get(`workouts`);
      let data = [
        {
          id: '1',
          date: 'today',
          exercises: [],
        }
      ]
      commit("SET_WORKOUTS", data);
    },
  },
}