import classNames from 'classnames/bind';
import React from 'react';
import styles from './CreateContract.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';

const cx = classNames.bind(styles);

const CreateContract = () => {
    const { currentUser } = useSelector((state) => state.admin);
    const { currentContract } = useSelector((state) => state.contract);
    const { contractId } = useParams();
    const { client } = currentContract;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title-and-back')}>
                    <Link to={`/admin/${currentUser?.Id}/reports/${contractId}`} className={cx('back-link')}>
                        <IoIosArrowBack />
                        <span>Quay lại</span>
                    </Link>
                </div>
                <form action="" className={cx('contract')}>
                    <div className={cx('client')}>
                        <label>Khách hàng</label>
                        <span>{client.fullname}</span>
                        <label>Giới tính</label>
                        <span>{client.gender}</span>
                        <label>Tuổi</label>
                        <span>{client.age}</span>
                    </div>
                    <div className={cx('coach')}>
                        <label>Huấn luyện viên</label>
                        <input type="text" name="coach" id="" />
                        <label>Khoá tập</label>
                        <input type="text" name="course" id="" />
                        <label>Mô tả hợp đồng</label>
                        <textarea name="desc" id="" cols="30" rows="10"></textarea>
                    </div>
                    <button>Tạo hợp đồng</button>
                </form>
            </div>
        </div>
    );
};

export default CreateContract;
