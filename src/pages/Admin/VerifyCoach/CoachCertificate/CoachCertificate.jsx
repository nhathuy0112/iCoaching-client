import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CoachCertificate.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { handleRenderGenders, handleRenderGenderClassNames } from '~/utils/gender';
import Modal from '~/components/Modal';

import cert1 from '~/assets/images/coach-cert.png';
import cert2 from '~/assets/images/coach-cert2.jpeg';
import cert3 from '~/assets/images/cccd-mt.jpeg';
import cert4 from '~/assets/images/cccd-ms.jpeg';

const cx = classNames.bind(styles);

const CoachCertificate = ({ id }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [viewDetail, setViewDetail] = useState(false);
    const [file, setFile] = useState('');

    const handleViewDetail = (img) => {
        setViewDetail(true);
        setFile(img);
    };

    const coach = {
        id: 1,
        fullname: 'Vinhh Tran',
        gender: 'Male',
        age: 18,
        email: 'aa@gmail.com',
        phoneNumber: '0123456789',
    };

    const images = [
        {
            id: 1,
            url: cert1,
        },
        {
            id: 2,
            url: cert2,
        },
        {
            id: 3,
            url: cert3,
        },
        {
            id: 4,
            url: cert4,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-back')}>
                <div className={cx('back')}>
                    <Link to={`/admin/${currentUser?.Id}/verify-coach`} className={cx('back-link')}>
                        <IoIosArrowBack />
                        <span>Quay lại</span>
                    </Link>
                    <h3>Yêu cầu từ Huấn luyện viên hoangtlm</h3>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('profile')}>
                    <div className={cx('profile')}>
                        <div className={cx('avatar')}>
                            <img
                                src={require('~/assets/images/coach-avatar.png')}
                                alt={'avatar'}
                                className={cx('image')}
                            />
                        </div>
                        <h2 className={cx('name')}>{coach.fullname}</h2>
                        <div className={cx('gender')}>
                            <span className={cx(handleRenderGenderClassNames('Male'))}>
                                {handleRenderGenders(coach.gender)}
                            </span>
                        </div>
                        <span className={cx('age')}>{coach.age} tuổi</span>
                    </div>
                </div>
                <div className={cx('certificates')}>
                    <h3>Danh sách chứng chỉ</h3>
                    <div className={cx('img-wrapper')}>
                        {images.map((item) => (
                            <img key={item.id} src={item.url} alt="" onClick={() => handleViewDetail(item.url)} />
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx('button')}>
                <button className={cx('btn-confirm')}>
                    <BsCheckLg className={cx('icon')} />
                    Xác nhận
                </button>
                <button className={cx('btn-warn')}>
                    <BsXLg className={cx('icon')} />
                    Từ chối
                </button>
            </div>
            {viewDetail && (
                <Modal
                    open={viewDetail}
                    onClose={() => setViewDetail(false)}
                    modalStyle={{ background: 'none' }}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <button className={cx('closeBtn')} onClick={() => setViewDetail(false)}>
                        <AiOutlineClose />
                    </button>
                    <img id={cx('photo')} src={file} alt="" />
                </Modal>
            )}
        </div>
    );
};

export default CoachCertificate;
