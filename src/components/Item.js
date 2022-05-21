import React from "react"
import { Card, Col, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const Item = ({ chuyenXe }) =>{

    let url = `chuyenXe/${chuyenXe.id}/`

    return (
        <>
            <Col md='4' >
                <Card>
                <Card.Body>
                    <Card.Title>{chuyenXe.tuyen_xe.diem_di} - {chuyenXe.tuyen_xe.diem_den}</Card.Title>
                    <Card.Text>
                        {chuyenXe.so_ve_da_dat}/{chuyenXe.sl_ghe}
                    </Card.Text>
                    <Container>
                        <Link to={url} className='nav-link' >Xem chi tiết</Link>
                    </Container>
                </Card.Body>
                </Card>
            </Col>
            
        </>
    )
}

export default React.memo(Item)