const initialState = {
    currentUser: {}
}

const commentReducer = (state=initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                currentUser: action.currentUser
            }
        case "FIND_USER":
            return {
                ...state,
                currentUser: action.currentUser
            }
        case "DELETE_USER":
            const newState1 = {
                currentUser: {}
            }
            return newState1
        case "UPDATE_USER":
            return {
                currentUser: action.currentUser
            }
        default:
            return state
    }
}

export default commentReducer