import React from 'react'
import Comment from '../../models/comment'
import Rating from '@material-ui/lab/Rating';

const MovieComment = (comments) => {
    return(
        <div>
            <table className="table">
                <head>
                <tr className="border-3">
                    <th className="wbdv-table-width-title">User</th>
                    <th className="wbdv-table-width-other d-none d-sm-table-cell">Comment</th>
                    <th className="wbdv-table-width-other d-none d-md-table-cell">Rating</th>
                </tr>
                </head>

                <body>
                {
                    comments.map(comment =>
                        <tr>
                            <td>{comment.user}</td>
                            <td>{acomment.content}</td>
                            <td><Rating name="read-only" value={comment.rating} readOnly /></td>
                        </tr>)
                }
                </body>
            </table>
        </div>
    )
}

export default MovieComment