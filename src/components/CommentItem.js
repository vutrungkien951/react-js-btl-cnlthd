import { memo } from "react"
import { Image, ListGroup } from "react-bootstrap"
import Moment from "react-moment"

const CommentItem = ({ comment }) => {
    return (
        <>
            <ListGroup.Item>
                {console.log(comment.user)}
                <Image src={comment.user.hinh_anh} alt={comment.user.username} fluid with='50' roundedCircle />
                <br />&nbsp; &nbsp; &nbsp;
                {comment.noi_dung} - <Moment fromNow>{comment.created_date}</Moment> 
            </ListGroup.Item>
        </>
    )
}

export default memo(CommentItem)