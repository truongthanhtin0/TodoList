import React from 'react';
import { Button, Modal} from 'react-bootstrap';
import './style.css';

function ButtonDelete(progs) {

    const {isShowDeleteModal, handleCloseDelete, handleDelete} = progs;

    return(
        // vì attribute "show" là phải để kiểu boolean, nên dùng !!isShowDeleteModal để nó nhận true/false
        <Modal show={!!isShowDeleteModal} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn muốn xóa không ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Hủy
                </Button>
                <Button type="submit" variant="danger" onClick={() => handleDelete(isShowDeleteModal.index)}>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ButtonDelete;