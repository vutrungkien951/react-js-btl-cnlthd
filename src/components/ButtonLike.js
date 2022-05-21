import { memo } from "react"
import { Button } from "react-bootstrap"


const ButtonLike = ( {chuyenxe, like} ) => {
    return (
        <>
            <Button variant={chuyenxe.like == true?'primary':'outline-primary'} onClick={like}>Like</Button>
        </>
    )
}

export default memo(ButtonLike)