const initialState = {};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case 'session/loggedIn':
      return { ...action.payload};
    case 'session/loggedOut':
      return {};
    default:
      return state;
  }
}