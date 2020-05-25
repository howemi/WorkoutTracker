import axios from 'axios'

export default {
  state: {
    workouts: [],
  },
  getters: {
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
      if(index) {
        let foundWorkout = state.workouts.find(workout => {
          return workout.workout_id === index
        })
        return foundWorkout.exercises
      }
    }
  },
  mutations: {
    SET_WORKOUTS: (state, payload) => {
      state.workouts = payload
    },
    SET_EXERCISES: (state, payload) => {
      state.workouts.find(workout => 
        workout.workout_id === payload.workoutId
      ).exercises = payload.exercises
    },
    ADD_WORKOUT: (state, payload) => {
      state.workouts.unshift(payload)
    },
  },
  actions: {
    POST_WORKOUT: (context, payload) => {
      return new Promise((resolve, reject) => {
        axios
        .post(`workouts`, payload,
        { headers: {Authorization: `Bearer ${context.rootState.User.token}` }})
        .then(({ data, status }) => {
          context.commit("ADD_WORKOUT", data);
          if (status === 200 || status === 201) {
            resolve({ data, status });
          }
        })
        .catch(error => {
          reject(error);
        });
      });
    },
    GET_EXERCISES: (context, { workoutId }) => {
      return new Promise((resolve, reject) => {
        axios
        .get(`exercises/${workoutId}`, 
        { headers: { Authorization: `Bearer ${context.rootState.User.token}` } })
          .then(({data, status}) => {
            data = {
              workoutId: 4,
              exercises: [
              {
                set_id: 0,
                name: 'Pullups',
                type: 'Strength',
                weight: 0,
                reps: 10,
              },
              {
                set_id: 1,
                name: 'Mile',
                type: 'Endurance',
                dur: 7.30,
              },
              {
                set_id: 0,
                name: 'Pullups',
                type: 'Strength',
                weight: 0,
                reps: 10,
              },
              {
                set_id: 1,
                name: 'Mile',
                type: 'Endurance',
                dur: 7.30,
              },
            ]}
            context.commit("SET_EXERCISES", data);
            if(status === 200 || status === 201) {
              resolve({data, status})
            }
          })
          .catch(error => {
            reject(error)
          })
        })
    },
    GET_WORKOUTS: async (context) => {
      let { data } = await axios.get(`workouts`,
        { headers: {Authorization: `Bearer ${context.rootState.User.token}` }});
      context.commit("SET_WORKOUTS", data);
    },
  },
}