import { useEffect, useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { authAxios, endpoints } from "../API"

const DatVe = () => {
    const { chuyenXeId } = useParams()
    const [user, setUser] = useState(null)
    const [soLuongVe, setSoLuongVe] = useState(0)


    useEffect(() => {
        const loadUser = async () => {
            const res = await authAxios().get(endpoints['nguoidung'])
    
            setUser(res.data)
        }

        loadUser()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const datXe = async () => {
            const res = await authAxios().post(endpoints['datve'], {
                'nguoi_dat': user.id,
                'chuyen_xe': chuyenXeId,
                'so_luong_ve': soLuongVe 
            }
            )
            console.log(res.data)
        }

        datXe()
        

        alert("Đặt vé thành công!")
    }


    return (
        <>
            <Container>
                <Row>
                    <Form onSubmit={handleSubmit}>
                        <h1>Chuyến xe: {chuyenXeId}</h1>
                        <Form.Group className="mb-3">
                        <Form.Label>Nhập số lượng vé</Form.Label>
                        <Form.Control type="number" value={soLuongVe} onChange={(e) => setSoLuongVe(e.target.value)} placeholder="Nhập số lượng vé" required/>
                        <hr />
                        </Form.Group>
                        <Button type='submit'>Đặt vé</Button>
                    </Form>
                    <Link to='url' className="nav-link">Thanh toán</Link>
                </Row>
            </Container>
        </>
    )
}


export default DatVe