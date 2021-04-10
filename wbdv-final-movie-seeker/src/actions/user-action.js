import UserService from "../services/user-service";

const getUserByCredential = (userName, pwd, dispatch) => { // Use this for login
    UserService.getUserByCredential(userName, pwd)
        .then(user => {
            dispatch({
                type: "FIND_USER",
                currentUser: user
            })
        })
}

const updateUser = (userId, user, dispatch) => { // Use this for user update
    UserService.updateUser(userId, user)
        .then(status => dispatch({
            type: "UPDATE_USER",
            user
        }))
}

const clearCurrentUser = (dispatch) => // User this for logout
    dispatch({
        type: "DELETE_USER"
    })

const deleteUser = (user, dispatch) => // Use this for delete user
    UserService.deleteUser(user._id)
        .then(status => dispatch({
            type: "DELETE_USER"
        }))

const UserActions = {
    getUserByCredential,
    updateUser,
    clearCurrentUser,
    deleteUser
}

export default UserActions