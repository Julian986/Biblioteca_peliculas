import { Toast, ToastContainer } from "react-bootstrap"

export const MiToast = ({message}: {show: boolean, onClose: () => void, message: string}) => {
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