import { memo, useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { authAxios, endpoints } from "../API"

const CommentForm = ({ chuyenXeId, comments, setComments }) => {
    const [content, setContent] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loadUser = async () => {
            const res = await authAxios().get(endpoints['nguoidung'])
    
            setUser(res.data)
        }

        loadUser()
    }, [])

    const addComment = async (event) => {
        event.preventDefault()
        alert(content)
        alert(chuyenXeId)
        alert(user.id)

        const res = await authAxios().post(endpoints['comments'], {
            'noi_dung': content, 
            'chuyen_xe': chuyenXeId,
            'user': user.id
        })

        setComments([...comments, res.data])
    }

    

    return (
        <Form onSubmit={addComment}>
            <Form.Group className="mb-3">
                <Form.Control type="text" value={content} onChange={(evt) => setContent(evt.target.value)} placeholder="Nhap binh luan" />
            </Form.Group>
        
            <Button variant="primary" type="submit">
                Them binh luan
            </Button>
        </Form>
    )
}

export default memo(CommentForm)