import { Fragment, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Tabs.module.scss';

const cx = classNames.bind(styles);

const TabContent = ({ content }) => {
    return <Fragment>{content}</Fragment>;
};

const Tabs = ({ tabs }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabClick = (index) => {
        setActiveTabIndex(index);
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('tab-list')}>
                {tabs.map((tab, index) => (
                    <li
                        key={index}
                        className={cx('tab', `${index === activeTabIndex ? 'active' : ''}`)}
                        onClick={() => {
                            handleTabClick(index);
                            if (tab.onClick) {
                                tab.onClick();
                            }
                        }}
                    >
                        {tab.label}
                    </li>
                ))}
            </ul>
            <TabContent content={tabs[activeTabIndex].content} />
        </div>
    );
};

export default Tabs;
