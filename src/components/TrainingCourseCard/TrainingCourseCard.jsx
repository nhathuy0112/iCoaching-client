import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TrainingCourseCard.module.scss';
import Modal from '~/components/Modal';

import { BsCheckLg } from 'react-icons/bs';
import { BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrainingCourseAsync, getTrainingCourseAsync, getTrainingCourseByIdAsync } from '~/features/coachSlice';

const cx = classNames.bind(styles);

const TrainingCourseCard = ({ course }) => {
    const {id, name, price, duration, description} = course;
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user);
    const {currentTrainingCourse} = useSelector(state => state.coach);
    const [isViewDetails, setIsViewDetails] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleViewDetailsClick = (e) => {
        e.preventDefault();
        setIsViewDetails(true);
    };

    const handleClose = () => {
        setIsViewDetails(false);
    };

    const handleOpenEditModal = (courseId) => {
        setIsEdit(true);
        dispatch(getTrainingCourseByIdAsync(courseId));
    }

    const handleOpenDeleteModal = (course) => {
        setIsDelete(true);
        setSelectedCourse(course);
    }

    const handleDeleteCourse = (courseId) => {
        dispatch(deleteTrainingCourseAsync(courseId));
        setIsDelete(false);
        dispatch(getTrainingCourseAsync({pageIndex: 1, pageSize: 20}));
    };

    return (
        <div className={cx('card')}>
            <h3 className={cx('name')}>{name}</h3>
            <span className={cx('price')}>{price}</span>
            {currentUser?.role === 'COACH' ? (
                <div className={cx('action')}>
                    <button onClick={() => handleOpenEditModal(id)}>
                        Chỉnh sửa
                    </button>
                    <button onClick={() => handleOpenDeleteModal(course)}>
                        Xóa
                    </button>
                </div>
            ):<button className={cx('detail-btn')} onClick={handleViewDetailsClick}>
                Xem chi tiết
            </button>}
           
            {isViewDetails && (
                <Modal open={isViewDetails} onClose={handleClose} modalStyle={{}} closeBtnStyle={{ display: 'none' }}>
                    <div className={cx('body')}>
                        <h1>iCoaching</h1>
                        <h2>Bạn có đồng ý gửi yêu cầu cho huấn luyện viên về gói tập này?</h2>
                        <div className={cx('course-detail')}>
                            <div>
                                <label>Tên gói tập</label>
                                <span>{name}</span>
                            </div>
                            <div>
                                <label>Số buổi</label>
                                <span>{duration}</span>
                            </div>
                            <div>
                                <label>Giá</label>
                                <span>{price}</span>
                            </div>
                            <div>
                                <label>Mô tả khóa tập</label>
                                <span>
                                   {description}
                                </span>
                            </div>
                        </div>
                        <div className={cx('button')}>
                            <button className={cx('btn-confirm')}>
                                <BsCheckLg className={cx('icon')} />
                                Đồng ý
                            </button>
                            <button className={cx('btn-warn')} onClick={() => setIsViewDetails(false)}>
                                <BsXLg className={cx('icon')} /> Huỷ bỏ
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {isEdit && 
                <Modal 
                    id={cx('add-modal')} 
                    show={isEdit}  
                    modalStyle={{}} 
                    closeBtnStyle={{ display: 'none' }}>
                        <div className={cx('header')}>
                            <h1>iCoaching</h1>
                        </div>
                        <div className={cx('body')}>
                            <h2 className={cx('title')}>Thông tin gói tập</h2>
                            <form id={cx('add-form')}autoComplete='off'>
                                <div className={cx('input-group')}>
                                    <label htmlFor="name">Tên gói tập</label>
                                    <input type="text" value={currentTrainingCourse.name}/>
                                </div>
                            
                                <div className={cx('input-group')}>
                                    <label htmlFor="price">Giá</label>
                                    <input type="text" value={currentTrainingCourse.price}/>
                                </div>
                                <div className={cx('input-group')}>
                                    <label htmlFor="duration">Số buổi</label>
                                    <input type="text"  value={currentTrainingCourse.duration}/>
                                </div>
                                <div className={cx('input-group', 'description')}>
                                    <label htmlFor="description">Mô tả</label>
                                    <textarea>{currentTrainingCourse.description}</textarea>
                                </div>
                                <div className={cx('modal-action')}>
                                    <button id={cx('agree-btn')} type='submit'>
                                        <BsCheckLg/>
                                        <span>Chỉnh sửa</span>
                                    </button>
                                    <button id={cx('cancel-btn')} onClick={()=>setIsEdit(false)}>
                                        <BsXLg/>
                                        <span>Hủy bỏ</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                }
                {isDelete && 
                    <Modal 
                        id={cx('add-modal')} 
                        show={isDelete}  
                        modalStyle={{}} 
                        closeBtnStyle={{ display: 'none' }}>
                            <div className={cx('header')}>
                                <h1>iCoaching</h1>
                            </div>
                            <div className={cx('body')}>
                                <h2 className={cx('title')}>Bạn có đồng ý xóa gói tập <span style={{color: '#1A97CC'}}>{selectedCourse.name}</span>?</h2>
                                <div className={cx('modal-action')}>
                                    <button id={cx('agree-btn')} type='submit' onClick={() => handleDeleteCourse(selectedCourse.id)}>
                                        <BsCheckLg/>
                                        <span>Đồng ý</span>
                                    </button>
                                    <button id={cx('cancel-btn')} onClick={()=>setIsDelete(false)}>
                                        <BsXLg/>
                                        <span>Hủy bỏ</span>
                                    </button>
                                </div>
                            </div>
                    </Modal>
                }
        </div>
    );
};

export default TrainingCourseCard;
