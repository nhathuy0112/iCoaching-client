import classNames from 'classnames/bind';
import styles from './Reports.module.scss';

import { handleRenderGenders } from '~/utils/gender';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Reports = () => {
    const users = [
        {
            id: 1,
            username: 'thedevil',
            fullname: 'Trần Lê Minh Hoàng',
            gender: 'Male',
            age: 18,
            email: 'aa@gmail.com',
            phoneNumber: '0123456789',
        },
        {
            id: 2,
            username: 'thedevil',
            fullname: 'Ngô Hiểu Khánh',
            gender: 'Female',
            age: 22,
            email: 'example@gmail.com',
            phoneNumber: '0987654321',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <form className={cx('search')}>
                    <div className={cx('search-box')} type="submit">
                        <AiOutlineSearch className={cx('search-icon')} />
                        <input type="text" placeholder="Tìm kiếm" />
                    </div>
                </form>

                <table className={cx('tb-users')}>
                    <thead>
                        <tr>
                            <th>Tên đăng nhập</th>
                            <th>Họ và tên</th>
                            <th>Giới tính</th>
                            <th>Tuổi</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr>
                                <td>{user.username}</td>
                                <td>{user.fullname}</td>
                                <td>{handleRenderGenders(user.gender)}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>
                                    <Link to={`${user.id}`}>
                                        <button className={cx('btn-info')}>
                                            Xem chi tiết <MdOutlineKeyboardArrowRight className={cx('icon')} />
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;
