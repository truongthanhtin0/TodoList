import React from 'react';
import { Button, Modal, Form as FormBootstrap} from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './style.css';

function ButtonEdit(progs) {

    const {isShowEditModal, handleCloseEdit, newShowEditModal, handleEdit, toDoList} = progs;

    return(
        <Modal show={!!isShowEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
            <Modal.Title>Nội dung công việc</Modal.Title>
        </Modal.Header>
        <Formik
            initialValues={ {title: newShowEditModal.value} }  
            validationSchema={Yup.object({
                title: Yup.string()
                    .required('Nội dung công việc không được để trống')
                    .max(50, 'Nội dung công việc không được vượt quá 50 ký tự'),
            })}
            onSubmit={(values) => handleEdit(values, newShowEditModal.index)} //values là là giá trị của ô
        >
            <Form>
                <Modal.Body>
                        <FormBootstrap.Group>
                            <label htmlFor="title">Nội dung công việc:</label>
                            <Field 
                                type="text"
                                name="title"
                                className="form-control"
                                render={(progs) => {
                                    const {field,meta} = progs;
                                    return(
                                        <input 
                                            {...field} 
                                            className={`form-control ${meta.error && 'border border-danger'}`}
                                            placeholder="Nhập nội dung công việc"
                                        />
                                    )
                                }}
                            />
                            <div className="text-danger">
                                <ErrorMessage name="title" />
                            </div>
                        </FormBootstrap.Group>
                </Modal.Body>
                 <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Hủy
                    </Button>
                    <Button type="submit" variant="primary">
                        Lưu
                    </Button>
                </Modal.Footer>
            </Form>
        </Formik>
    </Modal>
    );
}

export default ButtonEdit;