import React from 'react';
import classNames from 'classnames/bind';
import styles from './CoachDetail.module.scss';

import Tabs from '~/components/Tabs/Tabs';
import Tab1 from '~/components/AboutMe/AboutMe';
import Tab2 from '~/components/CoachPhoto/CoachPhoto';
import Tab3 from '~/components/TrainingCourse/TrainingCourse';

const cx = classNames.bind(styles);
const CoachDetail = () => {
    const tabs = [
        {
            label: 'Giới thiệu',
            content: <Tab1 />,
        },
        {
            label: 'Ảnh',
            content: <Tab2 />,
        },
        {
            label: 'Gói tập',
            content: <Tab3 />,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <h1>Hồ sơ Huấn luyện viên</h1>
            <div className={cx('content')}>
                <div className={cx('coach-info')}>
                    <img src={require('~/assets/images/coach-avatar.png')} alt="coach avatar" />
                    <p>
                        <label className={cx('label')}>Họ và tên</label>
                        <span>Adam Smith</span>
                    </p>
                    <p>
                        <label className={cx('label')}>Giới tính</label>
                        Nam
                    </p>
                    <p>
                        <label className={cx('label')}>Tuổi</label>
                        32
                    </p>
                    <p>
                        <label className={cx('label')}>Email</label>
                        adamsmt@email.com
                    </p>
                    <p>
                        <label className={cx('label')}>Số điện thoại</label>
                        012345678
                    </p>
                </div>
                <div className={cx('tabs')}>
                    <Tabs tabs={tabs}></Tabs>
                </div>
            </div>
        </div>
    );
};

export default CoachDetail;
