import React, { useState } from 'react';
import { Button, ListGroup, Modal, Form as FormBootstrap} from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ButtonDelete from '../ButtonDelete';
import ButtonEdit from '../ButtonEdit'
import './style.css';

// const listItem = [
//     {
//         title: "Viết code"
//     },
//     {
//         title: "Học tiếng anh"
//     }
// ]

function ToDoList() {
    //Tạo State
    const [isShowModal, setIsShowModal] = useState(false); //State show/hite modal button thêm
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(null); //State show/hite modal button xóa
    const [isShowEditModal, setIsShowEditModal] = useState(false); //State show/hite modal button sửa
    const [newShowEditModal, setNewShowEditModal] = useState({});   //State "tạm" để chứa dữ liệu phục vụ hàm sửa

    const handleShow = () => {
        setIsShowModal(true);
    }

    const handleClose = () => {
        setIsShowModal(false);
    }
    
    const handleShowDelete = (valueIndex) => {
        setIsShowDeleteModal({ index: valueIndex});
    }

    const handleCloseDelete = () => {
        setIsShowDeleteModal(null);
    }
    //(Tự viết)
    // const handleDelete = () => {
    //     const newIndex = isShowDeleteModal.index;
    //     toDoList.splice(newIndex, 1);
    //     setToDoList([
    //         ...toDoList
    //     ])
    //     setIsShowDeleteModal(null);
    // }
    const handleDelete = (index) => {
        const newToDoList = toDoList;
        newToDoList.splice(index, 1);
        setToDoList([
            ...newToDoList
        ])
        setIsShowDeleteModal(null);
    }

    //value này là biến từ đặt
    const handleShowEdit = (value, index) => {
        setIsShowEditModal(true);
        setNewShowEditModal({value: value, index: index});
    }

    const handleCloseEdit = () => {
        setIsShowEditModal(false);
        setNewShowEditModal({});
    }

    //values này là giá trị của ô. 
    const handleEdit = (values, index) => {
    console.log("Log: -> handleEdit -> values", values)
        const newToDoList = toDoList;
        newToDoList.splice(index, 1, {title: values.title});
        setToDoList([
            ...newToDoList
        ])
        setIsShowEditModal(false);
    }

    // Tạo useState để thêm các phần tử vào
    const [toDoList, setToDoList] = useState([]);
    //Thêm phần tử vào đầu 
    const renderToDoList = (values) => {
        setToDoList([
            {
                title: values.title
            },
            ...toDoList
        ]);
        setIsShowModal(false);
    };

    //Hàm render ra các item thông qua useState
    const renderListGroupItem = () => {
        return toDoList.map( (item, itemIndex) => {
            return(
                <ListGroup.Item key={itemIndex} className="todo-list__listgroup--item">
                <p>{item.title}</p>
                <div className="todo-list__wrapper">
                    <Button 
                        className="mr-2" 
                        variant="outline-primary"
                        onClick={() => handleShowEdit(item.title, itemIndex)}
                    >
                        Sửa
                    </Button>
                    <Button 
                        className="mr-2" 
                        variant="outline-danger"
                        onClick={() => handleShowDelete(itemIndex)}
                    >
                        Xóa
                    </Button>
                </div>
            </ListGroup.Item>
            );
        })
    }

  return (
    <>
        <div className="todo-list__container">
            <div className="todo-list__content">
                <div className="todo-list__title">
                    <h3>To Do List</h3>
                    <Button variant="primary" onClick={() => handleShow()}>Thêm công việc</Button>
                </div>
                <ListGroup className="mt-2 todo-list__listgroup">
                    {renderListGroupItem()}
                </ListGroup>
            </div>
        </div>
        <Modal show={isShowModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nội dung công việc</Modal.Title>
            </Modal.Header>
            <Formik
                initialValues={ {title: ''} }
                validationSchema={Yup.object({
                    title: Yup.string()
                        .required('Nội dung công việc không được để trống')
                        .max(50, 'Nội dung công việc không được vượt quá 50 ký tự'),
                })}
                onSubmit={(values) => renderToDoList(values)} //values là là giá trị của ô
            >
                <Form>
                    <Modal.Body>
                            <FormBootstrap.Group>
                                <label htmlFor="title">Nội dung công việc:</label>
                                <Field 
                                    type="text"
                                    name="title"
                                    // className="form-control"
                                    // placeholder="Nhập nội dung công việc"
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
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button type="submit" variant="primary">
                            Thêm
                        </Button>
                    </Modal.Footer>
                </Form>
            </Formik>
        </Modal>

        <ButtonDelete 
            isShowDeleteModal={isShowDeleteModal} 
            handleCloseDelete={handleCloseDelete} 
            handleDelete={handleDelete}
        />
        <ButtonEdit 
            isShowEditModal={isShowEditModal} 
            handleCloseEdit={handleCloseEdit} 
            newShowEditModal={newShowEditModal}
            handleEdit={handleEdit}
        />
    </>
  );
}

export default ToDoList;
