export default (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };

    case 'ADD_USER':
      return {
        ...state,
        users: [action.payload, ...state.users],
      };

    case 'EDIT_USER':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        }),
      };

    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'SELECT_USER':
      return {
        ...state,
        selectedUser: action.payload,
      };

    default:
      return state;
  }
};
