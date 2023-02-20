import { useState } from 'react';
import classNames from 'classnames/bind';
import { formatMoney } from '~/utils/money';
import styles from './TrainingCourseCard.module.scss';
import Modal from '~/components/Modal';

import { AiOutlineClose } from 'react-icons/ai';

const cx = classNames.bind(styles);

const TrainingCourseCard = ({ course }) => {
    const [isViewDetails, setIsViewDetails] = useState(false);

    const handleViewDetailsClick = (e) => {
        e.preventDefault();
        setIsViewDetails(true);
    };

    const handleClose = () => {
        setIsViewDetails(false);
    };

    return (
        <div className={cx('card')}>
            <h3 className={cx('name')}>{course.name}</h3>
            <span className={cx('price')}>{formatMoney(course.price)}</span>
            <button className={cx('detail-btn')} onClick={handleViewDetailsClick}>
                Xem chi tiết
            </button>
            {isViewDetails && (
                <Modal
                    open={isViewDetails}
                    onClose={handleClose}
                    modalStyle={{ background: 'none' }}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <button className={cx('closeBtn')} onClick={handleClose}>
                        <AiOutlineClose />
                    </button>
                    <div className={cx('body')}>
                        <h1>Bạn có đồng ý gửi yêu cầu cho huấn luyện viên về gói tập này?</h1>
                        <div className={cx('course-detail')}>
                            <div>
                                <label>Tên gói tập</label>
                                <span>{course.name}</span>
                            </div>
                            <div>
                                <label>Số buổi</label>
                                <span>{course.duration}</span>
                            </div>
                            <div>
                                <label>Giá</label>
                                <span>{formatMoney(course.price)}</span>
                            </div>
                            <div>
                                <label>Mô tả khóa tập</label>
                                <span>
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
                                    an unknown printer took a galley of type and scrambled it to make a type specimen
                                    book. It has survived not only five centuries, but also the leap into electronic
                                    typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                                    the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                                    with desktop publishing software like Aldus PageMaker including versions of Lorem
                                    Ipsum.
                                </span>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default TrainingCourseCard;
