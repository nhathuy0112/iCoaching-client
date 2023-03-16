import { useState } from 'react';
import styles from './CoachPhoto.module.scss';
import classNames from 'classnames/bind';
import Modal from '~/components/Modal';

import { AiOutlineClose } from 'react-icons/ai';

import photo1 from '~/assets/images/coach-photo1.png';
import photo2 from '~/assets/images/coach-photo2.png';
import photo3 from '~/assets/images/coach-photo3.png';
import photo5 from '~/assets/images/LinkedIn.png';
import photo6 from '~/assets/images/service-bg.png';

const cx = classNames.bind(styles);

const CoachPhoto = () => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState('');
    const handleOpen = (e) => {
        setOpen(true);
        setFile(e);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const images = [
        {
            id: 1,
            url: photo1,
        },
        {
            id: 2,
            url: photo2,
        },
        {
            id: 3,
            url: photo3,
        },
        {
            id: 4,
            url: photo3,
        },
        {
            id: 5,
            url: photo5,
        },
        {
            id: 6,
            url: photo6,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-list')}>
            {images.map((item) => (
                <div className={cx('image-item')} key={item.id} >
                    <img onClick={() => handleOpen(item.url)} src={item.url} alt="" />
                </div>
            ))}
            </div>
           
            {open && (
                <Modal
                    open={open}
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

export default CoachPhoto;
