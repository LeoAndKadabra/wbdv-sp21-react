import UserService from "../services/user-service";

const getUserByCredential = (dispatch, userName, pwd, setLoginSuccess, setShowLoginFail) => { // Use this for login
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

            if (user.username !== "") {
                setLoginSuccess(true)
                setShowLoginFail(false)
            }
            else
                setShowLoginFail(true)
        })
}

const updateUser = (user, dispatch, setUpdateSuccess) => { // Use this for user update
    UserService.updateUser(user)
        .then(updatedUser => {
            dispatch({
            type: "UPDATE_USER",
            currentUser: user
        })
            console.log("updatedUser:", updatedUser)
            if(updatedUser)
                setUpdateSuccess(true)
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