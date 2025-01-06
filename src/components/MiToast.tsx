import React from "react"
import { Toast, ToastContainer } from "react-bootstrap"

export const MiToast = ({show, onClose, message}: {show: boolean, onClose: () => void, message: string}) => {
    return(
        <ToastContainer>
            <Toast>
                <Toast.Header>
                    <strong className="me-auto">Inventario</strong>
                </Toast.Header>

                <Toast.Body> {message} </Toast.Body>

            </Toast>
        </ToastContainer>
    )
}