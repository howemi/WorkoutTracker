export default {
  state: {
    newWorkoutForm: false,
    notification: {
      display: false,
      text: "Notification placeholder text",
      timeout: 3000,
      class: "success"
    },
  },
  getters: {
    NEW_WORKOUT_FORM: state => {
      return state.newWorkoutForm
    },
    NOTIFICATION: state => {
      return state.notification;
    },
  },
  mutations: {
    SET_NEW_WORKOUT_FORM: (state, payload) => {
      state.newWorkoutForm = payload;
    },
    SET_NOTIFICATION: (state, { display, text, alertClass }) => {
      state.notification.display = display;
      state.notification.text = text;
      state.notification.class = alertClass;
    },
  },
  actions: {},
}