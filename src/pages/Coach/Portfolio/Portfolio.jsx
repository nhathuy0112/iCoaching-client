import classNames from 'classnames/bind';
import styles from './Portfolio.module.scss';

import Tabs from '~/components/Tabs';
import About from './components/About';
import Photos from './components/Photos';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

const tabs = [
    {
        label: 'Giới thiệu',
        content: <About />,
    },
    {
        label: 'Ảnh',
        content: <Photos />,
    },
];

const Portfolio = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/coach/${currentUser.Id}/portfolio`);
            }
        }
    }, [id, currentUser, navigate]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Tabs tabs={tabs} />
            </div>
        </div>
    );
};

export default Portfolio;
