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
            const [toDoList, setToDoList] = useState([]); // Tạo useState để thêm các phần tử vào
            const [isShowModal, setIsShowModal] = useState(false); //State show/hite modal button thêm
            const [isShowDeleteModal, setIsShowDeleteModal] = useState(null); //State show/hite modal button xóa
            const [isShowEditModal, setIsShowEditModal] = useState(false); //State show/hite modal button sửa
            const [newShowEditModal, setNewShowEditModal] = useState({});   //State "tạm" để chứa dữ liệu phục vụ hàm sửa
            const [valueSearch, setValueSearch] = useState(''); //State lưu values của ô input search
            const [isShowMore, setIsShowMore] = useState(false); //State để Show More Item
            
    const newToDoListData = toDoList.filter( (item, index) => {
        return (item.title.toLowerCase()).indexOf(valueSearch.toLowerCase()) !== -1;
    })

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

    //values này là giá trị của ô. !!!!!!!!!!
    const handleEdit = (values, index) => {
    console.log("Log: -> handleEdit -> values", values)
        const newToDoList = toDoList;
        newToDoList.splice(index, 1, {title: values.title});
        setToDoList([
            ...newToDoList
        ])
        setIsShowEditModal(false);
    }

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

    // Viết hàm search. Lấy values thông qua onChang()
    const handleSearch = (e) => {
        const {value} = e.target;
        setValueSearch(value);
    }


    //Hàm render ra các item thông qua useState
    const renderListGroupItem = () => {
        return newToDoListData.map( (item, itemIndex) => {
            if(!isShowMore && itemIndex > 4) //đúng điều kiện thì ẩn item trước đó. Sau ở hàm onClick button sửa isShowMore=true => sai điều kiện => hiển thị item
                return null;
            return(
                <ListGroup.Item 
                    key={itemIndex} 
                    className="todo-list__listgroup--item"
                >
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
                <h3 className="todo-list__title">To Do List</h3>
                <div className="todo-list__title">
                    <input 
                        type="text" 
                        className="form-control todo-list__search" 
                        placeholder="Tìm kiếm ..."
                        onChange={(e) => handleSearch(e)}
                    />
                    <Button 
                        variant="primary" 
                        onClick={() => handleShow()}
                    >
                        Thêm công việc
                    </Button>
                </div>
                <ListGroup className="mt-2 todo-list__listgroup">
                    {renderListGroupItem()}
                    {/* isShowMore=flase => !isShowMore=true. và length>5 thì hiển thị button  */}
                    {(!isShowMore && newToDoListData.length > 5) && (
                        <div className="d-flex justify-content-center mt-2">
                            <button 
                                variant="outline-secondary" 
                                className="rounded-pill"
                                onClick={() => setIsShowMore(true)} //isShowMore=true. => điều kiện !isShowMore=flase => sai => ẩn đi
                            >
                                Hiển thị thêm
                            </button>   
                        </div>
                    )}
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
