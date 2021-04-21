import UserService from "../services/user-service";

const getUserByCredential = (dispatch, userName, pwd, setLoginSuccess) => { // Use this for login
    UserService.login({
        username: userName,
        password: pwd
    })
        .then(user => {
            dispatch({
                type: "FIND_USER",
                currentUser: user
            })
            console.log("currentUser:", user)

            if (user)
                setLoginSuccess(true)
        })
}

const updateUser = (user, dispatch) => { // Use this for user update
    UserService.updateUser(user)
        .then(status => {
            dispatch({
            type: "UPDATE_USER",
            currentUser: user
        })
    })
}

const clearCurrentUser = (user, dispatch) => {// User this for logout
    UserService.logout()
    dispatch({
        type: "DELETE_USER"
    })
}

const deleteUser = (user, dispatch) => // Use this for delete user
    UserService.deleteUser(user)
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