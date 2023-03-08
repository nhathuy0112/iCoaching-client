import classNames from 'classnames/bind';
import styles from './Portfolio.module.scss';

import Tabs from '~/components/Tabs';
import About from './components/About';
import Photos from './components/Photos';

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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Tabs tabs={tabs} />
            </div>
        </div>
    );
};

export default Portfolio;
