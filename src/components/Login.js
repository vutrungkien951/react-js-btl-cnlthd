import { useState } from "react"
import { Alert, Button, Form } from "react-bootstrap"
import cookie from "react-cookies"
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { login } from "../features/user/userSlice"
import API, { endpoints } from '../API'

const Login = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const nav = useNavigate()
    const goHome = () => nav('/')

    const submit = async (event) => {
        event.preventDefault();

        const res = await API.post(endpoints['login'], {
            'username': user.username,
            'password': user.password,
            'grant_type': 'password',
            'client_id' : 'jr3vz5ZeAVu2X0hYEvIFNar9UXXDXCsG0C5NBQ6T',
            'client_secret' : 'RWyuGnywzaoOXpHA6LRAj1s6OGTdipczEESO8ZmhOKFR8A6PfIrzibB88np297dqVFcU0n0LrMGKQTxEi9TZ9XhTxs4B8nCafYs62appRSsFAbmTV99Tk5i3gpDwo8iz'
        }, {
            headers: { 'Content-Type': 'mulltipart/form-data' },
            withCredentials: true
        })
        if(res.status === 200){
            dispatch(login(user.username))
            cookie.save("access_token",
            res.data.access_token)
            goHome()
        }   
        else{
            setErrorMsg("Username or password is incorrect!!!")
        }
        
    }

    const inputChange = (event) => {
        setUser({
            ...user,
            [event.target.name] : event.target.value
        })
    }

    const { username, password } = user
    const [errorMsg, setErrorMsg] = useState(null)

    return (
        <>
            <h1>Đăng nhập</h1>
            {errorMsg !== null && <Alert
             key='danger' variant='danger'>{errorMsg}
            </Alert>}
            <Form onSubmit={submit}>
            <Form.Group className="mb-3">
                <Form.Label>Tài khoản</Form.Label>
                <Form.Control placeholder="Nhập tên tài khoản" value={username} name='username' onChange={inputChange} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" value={password} controlId="formBasicPassword">
                <Form.Label>Mật khẩu:</Form.Label>
                <Form.Control type="password" placeholder="Nhập mật khẩu" name='password' onChange={inputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Đăng nhập
            </Button>
            </Form>
        </>
    )
}

export default Login