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
        return state.workouts.find(workout => workout.id === index).exercises.length;
      }
    },
  },
  mutations: {
    SET_WORKOUTS: (state, payload) => {
      state.workouts = payload
    },
    SET_EXERCISES: (state, payload) => {
      state.workouts.find(workout => {
        workout.id === payload.id
      // }).exercises = payload.exercises
    }).exercises = 9
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
    GET_EXERCISES: async (context, { workoutID }) => {
      let { data } = await axios.get(`exercises/${workoutID}`, 
      { headers: { Authorization: `Bearer ${context.rootState.User.token}` } });
      context.commit("SET_EXERCISES", data);
    },
    GET_WORKOUTS: async ({ commit }) => {
      //let { data } = await axios.get(`workouts`);
      let data = [
        {
          id: '1',
          date: 'today',
          exercises: [],
        },
        {
          id: '2',
          date: 'today',
          exercises: [],
        },
        {
          id: '3',
          date: 'today',
          exercises: [],
        },
        {
          id: '4',
          date: 'today',
          exercises: [],
        },
        {
          id: '5',
          date: 'today',
          exercises: [],
        },
        {
          id: '6',
          date: 'today',
          exercises: [],
        },
        {
          id: '7',
          date: 'today',
          exercises: [],
        },
        {
          id: '8',
          date: 'today',
          exercises: [],
        },
      ]
      commit("SET_WORKOUTS", data);
    },
  },
}