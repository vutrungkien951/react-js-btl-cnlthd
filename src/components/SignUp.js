import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import API, { endpoints } from '../API'


const SignUp = () => {

    const [data, setData] = useState({
        username: null,
        password: null,
        email: null,
        hinh_anh: null
    })

    const { username, password, email } = data 

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setData(prevalue => {
            return {
                ...prevalue,
                [name]: value
            }
        })
    }

    const handleImageChange = (e) => {
        let newData = { ...data}
        newData['hinh_anh'] = e.target.files[0]
        setData(newData)
    }

    const nav = useNavigate()

    const handleSubmit = async (event) => {
        console.log(data)
        event.preventDefault()
        let form_data = new FormData()
        if(data.hinh_anh)
            form_data.append("hinh_anh", data.hinh_anh, data.hinh_anh.name)
        form_data.append("username", data.username)
        form_data.append("password", data.password)
        form_data.append("email", data.email)
        const res = await API.post(endpoints['sign-up'], form_data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        if(res.status === 400){
            console.log(res.data)
            alert("Đăng ký thất bại!")
        }
        else{
            alert("Đăng ký thành công!!")
            nav('/')
        }
    }

    return (
        <>
            <h1>Đăng ký</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Tài khoản</Form.Label>
                <Form.Control placeholder="Nhập tên tài khoản" name="username" value={username}
                onChange={e => handleChange(e)} required />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mật khẩu:</Form.Label>
                <Form.Control type="password" placeholder="Nhập mật khẩu" name="password" value={password}
                onChange={e => handleChange(e)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" placeholder="Nhập email" name="email" value={email} 
                onChange={e => handleChange(e)} required/>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Ảnh của bạn</Form.Label>
                    <Form.Control
                        type="file"
                        name="image_url"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={(e) => {
                            handleImageChange(e)
                        }}
                        required
                        />
            </Form.Group>
            <Button variant="primary" type="submit">
                Đăng ký
            </Button>
            </Form>
        </>
    )
}


export default SignUp