import { useCallback, useEffect, useState } from "react"
import { Col, Container, ListGroup, Row, Spinner, Table } from "react-bootstrap"
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
            <h1>Chuyen xe : {chuyenXeId}</h1>
            <Container>
                {/* <Row> */}
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>Tên chuyến xe</td>
                            <td>Tuyến xe</td>
                            <td>Khởi hành</td>
                            <td>Số lượng ghế đã đặt</td>
                            <td>Giá vé</td>
                            <td>Tài xế</td>
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
                        Tên chuyến xe: {chuyenXe.ten_chuyenxe} <br />
                        Tuyến xe: {chuyenXe.tuyen_xe.diem_di} - {chuyenXe.tuyen_xe.diem_den} <br />
                        Khởi hành: <Moment format="DD-MM-YYYY HH:mm">{chuyenXe.khoi_hanh}</Moment> <br />
                        Số lượng ghế đã đặt: {chuyenXe.so_ve_da_dat}/{chuyenXe.sl_ghe} <br />
                        Giá vé: {chuyenXe.gia_ve} <br />
                        Tài xế: {chuyenXe.tai_xe.username} <br />
                    </h2>
                    <Link to={url}>Đặt vé</Link>
                    <hr /> <hr />
                </Row> */}
                <i class="fa fa-thumbs-up" aria-hidden="true"></i>

                <Row>
                    <Col>
                        {user != null && <ButtonLike chuyenxe={chuyenXe} like={like} />}
                        <br /> <br />
                        <h2>Đánh giá chuyến xe</h2>
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