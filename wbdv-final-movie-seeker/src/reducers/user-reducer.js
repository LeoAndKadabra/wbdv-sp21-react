const initialState = {
    currentUser: {}
}

const UserReducer = (state=initialState, action) => {
    switch (action.type) {
        case "FIND_USER": // get user by cred
            return {
                ...state,
                currentUser: action.currentUser
            }
        case "DELETE_USER": // delete current user / logout
            const newState1 = {
                currentUser: {}
            }
            return newState1
        case "UPDATE_USER": // update user
            return {
                currentUser: action.currentUser
            }
        default:
            return state
    }
}

export default UserReducer