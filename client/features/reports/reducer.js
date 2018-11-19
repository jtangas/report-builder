const initialState = {
  list: [],
  fetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_REPORTS':
      return {
        ...state,
        list: action.payload,
        fetched: true,
      };
    case 'ADD_NEW_REPORT':
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    default:
      return state;
  }
}
