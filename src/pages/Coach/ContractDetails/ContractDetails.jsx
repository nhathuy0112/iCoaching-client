import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Tabs from '~/components/Tabs';
import Information from './components/Information';
import Program from './components/Program';
import Progress from './components/Progress';
import styles from './ContractDetails.module.scss';

const cx = classNames.bind(styles);

const ContractDetails = () => {
    const { id, contractId } = useParams();

    const tabs = [
        {
            label: 'Thông tin',
            content: <Information />,
        },
        {
            label: 'Chương trình tập luyện',
            content: <Program />,
        },
        {
            label: 'Tiến độ',
            content: <Progress />,
        },
    ];

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/coach/${currentUser.Id}/my-clients/view-details/${contractId}`);
            }
        }
    }, [id, currentUser, navigate, contractId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-back')}>
                <div className={cx('back')}>
                    <div className={cx('back-link')}>
                        <Link to={`/coach/${id}/my-clients`} className={cx('back-link')}>
                            <IoIosArrowBack />
                            <span>Quay lại</span>
                        </Link>
                    </div>
                </div>
                <h2 className={cx('title')}>Chi tiết hợp đồng</h2>
            </div>
            <div className={cx('content')}>
                <Tabs tabs={tabs} />
            </div>
        </div>
    );
};

export default ContractDetails;
