import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { resetAuth } from '~/features/userSlice';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

const Modal = ({ show, onClose, children, modalStyle, closeBtnStyle }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    }, [show]);

    return (
        <div className={cx('backdrop')}>
            <div className={cx('modal')} style={{ ...modalStyle }}>
                <div className={cx('content')}>
                    <button
                        onClick={() => {
                            onClose();
                            dispatch(resetAuth());
                        }}
                        id={cx('closeBtn')}
                    >
                        <AiOutlineCloseCircle />
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
