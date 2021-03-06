import { useCallback, useEffect, useState } from "react"
import { Button, Col, Container, ListGroup, Row, Spinner, Table } from "react-bootstrap"
import Moment from "react-moment"
import Rating from "react-rating"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import API, { authAxios, endpoints } from "../API"
import CommentForm from "../layouts/CommentForm"
import ButtonLike from "./ButtonLike"
import CommentItem from "./CommentItem"


const ChiTietChuyenXe = () => {
    const [chuyenXe, setChuyenXe] = useState(null)
    const { chuyenXeId } = useParams()
    const [comments, setComments] = useState([])
    const user = useSelector(state => state.user.username)


    const loadComments = useCallback(() => {
        const loadComments = async () => {
            const res = await API.get(endpoints['chuyenxe-comments'](chuyenXeId))

            setComments(res.data)
        }

        loadComments()
    }, [comments])

    useEffect(() => {
        const loadChuyenXe = async () => {
            let res = null
            if(user != null){
                res = await authAxios().get(endpoints['chi-tiet-chuyen-xe'](chuyenXeId))
            }
            else{
                res = await API.get(endpoints['chi-tiet-chuyen-xe'](chuyenXeId))
            }
            
            setChuyenXe(res.data)
        }
        
        loadChuyenXe()
        loadComments()
    }, [])
    
    const like = async (e) => {
        e.preventDefault()
        const res = await authAxios().post(endpoints['like-chuyenxe'](chuyenXeId))
        setChuyenXe(res.data)
    }

    const rate = async (r) => {
        const res = await authAxios().post(endpoints['rate-chuyenxe'](chuyenXeId), {
            'rate': r
        })
        console.info(res.data)
        setChuyenXe(res.data)
    }
    

    if(chuyenXe == null){
        return <Spinner animation="grow" />
    }

    let url = `datVe`
    return (
        <>
            <hr></hr>
            <Container>
                {/* <Row> */}
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>T??n chuy???n xe</td>
                            <td>Tuy???n xe</td>
                            <td>Kh???i h??nh</td>
                            <td>S??? l?????ng gh??? ???? ?????t</td>
                            <td>Gi?? v??</td>
                            <td>T??i x???</td>
                        </tr>
                        <tr>
                            <td>{chuyenXe.ten_chuyenxe}</td>
                            <td>{chuyenXe.tuyen_xe.diem_di} - {chuyenXe.tuyen_xe.diem_den}</td>
                            <td><Moment format="DD-MM-YYYY HH:mm">{chuyenXe.khoi_hanh}</Moment></td>
                            <td>{chuyenXe.so_ve_da_dat}/{chuyenXe.sl_ghe}</td>
                            <td>{chuyenXe.gia_ve}</td>
                            <td>{chuyenXe.tai_xe.username}</td>
                        </tr>
                    </tbody>
                </Table>
                    {/* <h2>
                        <h1 style="background-color:DodgerBlue;">Hello World</h1>
                        T??n chuy???n xe: {chuyenXe.ten_chuyenxe} <br />
                        Tuy???n xe: {chuyenXe.tuyen_xe.diem_di} - {chuyenXe.tuyen_xe.diem_den} <br />
                        Kh???i h??nh: <Moment format="DD-MM-YYYY HH:mm">{chuyenXe.khoi_hanh}</Moment> <br />
                        S??? l?????ng gh??? ???? ?????t: {chuyenXe.so_ve_da_dat}/{chuyenXe.sl_ghe} <br />
                        Gi?? v??: {chuyenXe.gia_ve} <br />
                        T??i x???: {chuyenXe.tai_xe.username} <br />
                    </h2>
                    
                    <hr /> <hr />
                </Row> */}
                <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                <Link to={url}><Button>?????t v??</Button></Link>
                <hr />
                <Row>
                    <Col>
                        {user != null && <ButtonLike chuyenxe={chuyenXe} like={like} />}
                        <br /> <br />
                        <h2>????nh gi?? chuy???n xe</h2>
                        {user != null && <Rating initialRating={chuyenXe.rating} onClick={rate} />}
                        <br /> <br />
                        {user != null && <CommentForm chuyenXeId={chuyenXeId} comments={comments} setComments={setComments} />}
                        <ListGroup>
                            {comments.map(c => <CommentItem comment={c}/>)}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    )
}




export default ChiTietChuyenXe