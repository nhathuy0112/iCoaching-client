import classNames from 'classnames/bind';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import Tabs from '~/components/Tabs';
import Information from './components/Information';
import Program from './components/Program';
import Progress from './components/Progress';
import styles from './ContractDetails.module.scss';

const cx = classNames.bind(styles);

const ContractDetails = () => {
    const { id } = useParams();

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-back')}>
                <Link to={`/coach/${id}/my-clients`} className={cx('back-link')}>
                    <IoIosArrowBack />
                    <span>Quay lại</span>
                </Link>
                <h2 className={cx('title')}>Chi tiết hợp đồng</h2>
            </div>
            <div className={cx('content')}>
                <Tabs tabs={tabs} />
            </div>
        </div>
    );
};

export default ContractDetails;
