import React, { useEffect, useState } from "react"
import { Container, Pagination, Row, Spinner } from "react-bootstrap"
import API, { endpoints } from "../API"
import Item from "./Item"
import { useSearchParams } from 'react-router-dom'


const Home = () => {
    const [chuyenXe, setChuyenXe] = useState([])
    const [q] = useSearchParams()
    
    useEffect(() => {
        const loadChuyenXe = async () => {
            const res = await API.get(endpoints['chuyenxe'])
            let data = res.data
            const kw = q.get('kw')

            if(kw != null){
                data = data.filter(d => d.tuyen_xe.diem_di.indexOf(kw) > 0 || d.tuyen_xe.diem_den.indexOf(kw) > 0)
            }

            setChuyenXe(data)
        }

        
        
        loadChuyenXe()
    }, [q])

    if(false){
       return(
           <>
            <h1>Trang chủ</h1>
            <h2>Loading...</h2>
            <Spinner animation="border" />
           </>
       ) 
    }

    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
    }
    return (
        <>
            <Container>
            <Row>
                {chuyenXe.map(c => <Item chuyenXe={c} />)}
            </Row>
            <Pagination>
                {items}
            </Pagination>
            </Container>
            
        </>
    ) 
}

export default React.memo(Home)