const githubReducer = (state, action) => {
    switch (action.type) {
        case "GET_USERS":
            return {
                ...state,     // This in all the cases represents the already set states, i.e all the 
                              // other states will remain as it is except for users & loading here.
                users: action.payload,
                loading: false,
            };

        case "GET_USER":
            return {
                ...state,
                user: action.payload,
                loading: false,
            };

        case "GET_REPOS":
            return {
                ...state,
                repos: action.payload,
                loading: false,
            };

        case "SET_LOADING":
            return {
                ...state,
                loading: true,
            };
        case "CLEAR_USERS":
            return {
                ...state,
                users: [],
            };

        default:
            return state;
    }
};

export default githubReducer;
