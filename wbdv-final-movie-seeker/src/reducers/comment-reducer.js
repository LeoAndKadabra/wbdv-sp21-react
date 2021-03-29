const initialState = {
    comments: [
        {}
    ]
}

const commentReducer = (state=initialState, action) => {
    switch (action.type) {
        case "CREATE_COMMENT":
            return {
                ...state,
                comments: [
                    ...state.comments,
                    action.comment
                ]
            }
        case "FIND_COMMENTS":
            return {
                ...state,
                comments: action.comments
            }
        case "CLEAR_COMMENTS":
            return {
                ...state,
                comments: []
            }
        case "DELETE_COMMENT":
            const newState1 = {
                comments: state.comments.filter(comment => {
                    if(comment.id === action.commentToDelete.id) {
                        return false
                    } else {
                        return true
                    }
                })
            }
            return newState1
        case "UPDATE_COMMENT":
            return {
                comments: state.comments.map(comment => {
                    if(comment.id === action.comment.id) {
                        return action.comment
                    } else {
                        return comment
                    }
                })
            }
        default:
            return state
    }
}

export default commentReducer