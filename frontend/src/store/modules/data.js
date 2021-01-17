import axios from 'axios'

export default {
  state: {
    workouts: [],
  },
  getters: {
    CURRENT_WORKOUT: state => workoutId => {
      return state.workouts.find(workout =>
        workout.workout_id === workoutId)
    },
    WORKOUTS: state => {
      return state.workouts
    },
    EXERCISE_COUNT: state => index => {
      if (index) {
        return state.workouts.find(workout =>
          workout.workout_id === index).exercises.length;
      }
    },
    WORKOUT_EXERCISES: state => index => {
      if (index) {
        let foundWorkout = state.workouts.find(workout => {
          return workout.workout_id === index
        })
        return foundWorkout.exercises
      }
    }
  },
  mutations: {
    ADD_WORKOUT: (state, payload) => {
      state.workouts.unshift(payload.workout)
    },
    ASSIGN_EXERCISE: (state, payload) => {
      Object.assign(state.workouts.find(workout =>
        workout.workout_id === payload.workoutId).exercises[payload.editedIndex], payload.editedItem)
    },
    ADD_EXERCISE: (state, payload) => {
      state.workouts.find(workout =>
        workout.workout_id === payload.workout_id).exercises
        .push(payload)
    },
    REMOVE_EXERCISE: (state, payload) => {
      state.workouts.find(workout =>
        workout.workout_id === payload.workoutId).exercises.splice(payload.index, 1)
    },
    SET_WORKOUTS: (state, payload) => {
      state.workouts = payload
    },
    SET_EXERCISES: (state, payload) => {
      state.workouts.find(workout =>
        workout.workout_id === payload.workoutId
      ).exercises = payload.exercises
    },
  },
  actions: {
    DELETE_EXERCISE: (context, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`exercises/delete`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${context.rootState.User.token}`,
              origin: 'http://www.olympiate.com',
            }
          })
          .then(({data, status}) => {
            if(status === 200 || status === 201) {
              context.commit('REMOVE_EXERCISE', payload)
              resolve({data, status})
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GET_EXERCISES: (context, { workoutId }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`exercises/${workoutId}`,
          {
            headers: {
              Authorization: `Bearer ${context.rootState.User.token}`,
              origin: 'http://www.olympiate.com',
            }
          })
          .then(({ data, status }) => {
            let exercises = {
              workoutId: workoutId,
              exercises: data
            }
            if (status === 200 || status === 201) {
              context.commit('SET_EXERCISES', exercises);
              resolve({ data, status })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GET_WORKOUTS: async (context) => {
      let { data } = await axios.get(`workouts`,
          {
            headers: {
              Authorization: `Bearer ${context.rootState.User.token}`,
              origin: 'http://www.olympiate.com',
            }
          })
      context.commit('SET_WORKOUTS', data);
    },
    POST_EXERCISE: ({ rootState, commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`exercises`,
            payload,
          {
            headers: {
              Authorization: `Bearer ${rootState.User.token}`,
              origin: 'http://www.olympiate.com',
            }
          })
          .then(({ data, status }) => {
            if (status === 200 || status === 201) {
              commit('ADD_EXERCISE', data)
              resolve({ data, status })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    UPDATE_EXERCISE: ({ rootState, commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('exercises/update',
          payload.editedItem,
          {
            headers: {
              Authorization: `Bearer ${rootState.User.token}`,
              origin: 'http://www.olympiate.com',
            }
          })
          .then(({ data, status }) => {
            if (status === 200 || status === 201) {
              payload.editedItem = data
              commit('ASSIGN_EXERCISE', payload)
              resolve({ data, status })
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    POST_WORKOUT: (context, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`workouts`,
            payload,
          {
            headers: {
              Authorization: `Bearer ${context.rootState.User.token}`,
              origin: 'http://www.olympiate.com',
            }
          })
          .then(({ data, status }) => {
            if (status === 200 || status === 201) {
              context.commit('ADD_WORKOUT', data);
              resolve({ data, status });
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  },
}
