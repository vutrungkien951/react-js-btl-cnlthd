import React from "react"
import { Alert } from "react-bootstrap"

const Footer = () => {
    return (
        <>
            <Alert variant="success">
            <Alert.Heading>Vũ Trung Kiên - 2022</Alert.Heading>
            <div>
                Cám ơn bạn đã quan tâm tới dịch vụ đặt vé xe khách của chúng tôi. <hr />
                Liên hệ: 
                1951012060 - Vũ Trung Kiên.
                Email: 1951012060kien@ou.edu.vn
                SĐT: 0313132232
            </div>
            <hr />
            </Alert>
        </>
    )
}


export default React.memo(Footer)