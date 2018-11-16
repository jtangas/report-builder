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
    default:
      return state;
  }
}
