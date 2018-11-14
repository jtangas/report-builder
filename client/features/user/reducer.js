const initialState = {
  firstName: null,
  lastName: null,
  id: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_ACTION':
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        id: action.payload.userId,
      };
    case 'LOGOUT_ACTION':
      return {
        ...state,
        firstName: null,
        lastName: null,
        id: null,
      };
    default:
      return state;
  }
}
