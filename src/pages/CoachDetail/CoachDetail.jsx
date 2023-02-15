import React from 'react';
import classNames from 'classnames/bind';
import styles from './CoachDetail.module.scss';

import Tabs from '~/components/Tabs/Tabs';
import AboutMe from '~/components/AboutMe/AboutMe';
import CoachPhoto from '~/components/CoachPhoto/CoachPhoto';
import TrainingCourse from '~/components/TrainingCourse/TrainingCourse';

const cx = classNames.bind(styles);
const CoachDetail = () => {
    const tabs = [
        {
            label: 'Giới thiệu',
            content: <AboutMe />,
        },
        {
            label: 'Ảnh',
            content: <CoachPhoto />,
        },
        {
            label: 'Gói tập',
            content: <TrainingCourse />,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <h1>Hồ sơ Huấn luyện viên</h1>
            <div className={cx('content')}>
                <div className={cx('coach-info')}>
                    <img src={require('~/assets/images/coach-avatar.png')} alt="coach avatar" />
                    <p>
                        <label>Họ và tên</label>
                        <span>Adam Smith</span>
                    </p>
                    <p>
                        <label>Giới tính</label>
                        Nam
                    </p>
                    <p>
                        <label>Tuổi</label>
                        32
                    </p>
                    <p>
                        <label>Email</label>
                        adamsmt@email.com
                    </p>
                    <p>
                        <label>Số điện thoại</label>
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
