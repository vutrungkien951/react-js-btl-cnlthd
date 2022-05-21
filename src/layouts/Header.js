import React, { useState } from "react"
import { Button, Container, Form, FormControl, Image, Nav, Navbar } from "react-bootstrap"
import cookie from "react-cookies"
import { useDispatch, useSelector } from "react-redux"
import { Link, useSearchParams } from "react-router-dom"
import { login } from "../features/user/userSlice"
import { logout } from "../features/user/userSlice"
import { authAxios, endpoints } from "../API"



const Header = () => {


    const [kw, setKw] = useState("")
    const [, setSearchParams] = useSearchParams()
    const [avatar, setAvatar] = useState(null)

    const handleSearchSubmit = async (event) => {
        event.preventDefault()

        setSearchParams({ kw: kw })
        
    }

    
    const user = useSelector(state => state.user.username)
    const dispatch = useDispatch()

    const loadUsername = async () => {
        const res = await authAxios().get(endpoints['nguoidung'])

        console.log(res.data)
        dispatch(login(res.data.username))
        setAvatar(res.data.hinh_anh)
    }


    const token = cookie.load('access_token')

    if(token != null){
        loadUsername()
    }
    
    

    const handleLogOut = () => {
        cookie.remove('access_token')
        dispatch(logout())
        setAvatar(null)
    }

    const NotLoggedIn = () => {
        return (
            <>
                <Link to={'/login'} className='nav-link'>Đăng nhập</Link>
                <Link to={'/sign-up'} className='nav-link'>Đăng ký</Link>
            </>
        )
    }

    const LoggedIn = () => {
        return (
            <>
                <Image src={avatar} fluid width='40' roundedCircle/>
                <Navbar.Brand>Welcome, {user}</Navbar.Brand>
                <button onClick={handleLogOut}>Log out</button>
            </>
        )
    }

    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">TravelApp</Navbar.Brand>
            <Nav className="me-auto">
            <Link to='/' className='nav-link'>Trang chủ</Link>
            </Nav>
            
            <Form onSubmit={handleSearchSubmit} className="d-flex">
                <FormControl
                type="search"
                placeholder="Search"
                name="kw"
                className="me-2"
                aria-label="Search"
                value={kw}
                onChange={e => setKw(e.target.value)}
                />
                <Button type="submit" variant="outline-success">Search</Button>
            </Form>

            {
                (user == null)
                ? <NotLoggedIn />
                : <LoggedIn />
            }
            
            </Container>
        </Navbar>
        </>
    )
}

export default React.memo(Header)