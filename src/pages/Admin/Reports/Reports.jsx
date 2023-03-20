import classNames from 'classnames/bind';
import styles from './Reports.module.scss';
import { useState } from 'react';

import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import Modal from '~/components/Modal';
import photo1 from '~/assets/images/cccd-mt.jpeg';
import photo2 from '~/assets/images/cccd-ms.jpeg';
import photo3 from '~/assets/images/coach-cert.png';

import { AiOutlineClose } from 'react-icons/ai';
const cx = classNames.bind(styles);

const Reports = () => {
    const [viewDetail, setViewDetail] = useState(false);
    const [file, setFile] = useState('');
    const users = [
        {
            id: 1,
            fullname: 'Trần Lê Minh Hoàng',
            photos: [photo1, photo2, photo3],
            details:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        },
        {
            id: 2,
            fullname: 'Ngô Hiểu Khánh',
            photos: [photo1, photo2],
            details:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        },
    ];
    const handleViewDetail = (img) => {
        setFile(img);
        setViewDetail(true);
    };
    const handleClose = (e) => {
        setViewDetail(false);
        setFile(null);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <form className={cx('search')}>
                    <div className={cx('search-box')} type="submit">
                        <AiOutlineSearch className={cx('search-icon')} />
                        <input type="text" placeholder="Tìm kiếm" />
                    </div>
                </form>
                <div className={cx('list-reports')}>
                    {users.map((user) => (
                        <div className={cx('rp')}>
                            <label>{user.fullname}</label>
                            <div className={cx('photos')}>
                                {user.photos.map((photo) => (
                                    <img src={photo} alt="report" onClick={() => handleViewDetail(photo)} />
                                ))}
                            </div>
                            <p>{user.details}</p>
                            <Link to={`${user.id}`}>
                                <button className={cx('btn-info')}>
                                    Xem chi tiết <MdOutlineKeyboardArrowRight className={cx('icon')} />
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            {viewDetail && (
                <Modal
                    open={viewDetail}
                    onClose={handleClose}
                    modalStyle={{ background: 'none' }}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <button className={cx('closeBtn')} onClick={handleClose}>
                        <AiOutlineClose />
                    </button>
                    <img id={cx('photo')} src={file} alt="" />
                </Modal>
            )}
        </div>
    );
};

export default Reports;
