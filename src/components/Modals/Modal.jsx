import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const cx = classNames.bind(styles);

const Modal = ({ show, onClose, children }) => {
    const modalRef = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    });

    const handleClick = (e) => {
        if (modalRef.current.contains(e.target)) {
            return;
        }
        onClose();
    };
    return (
        <div className={cx('backdrop')}>
            <div className={cx('modal')} ref={modalRef}>
                <div className={cx('modalContent')}>
                    <button onClick={() => onClose()} id={cx('closeBtn')}>
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
