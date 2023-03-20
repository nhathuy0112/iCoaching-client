import classNames from 'classnames/bind';
import styles from './ContractDetails.module.scss';

const cx = classNames.bind(styles);

const ContractDetails = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('contract-info')}>
                    <div className={cx('f-col')}>
                        <label>Khách hàng</label>
                        <span>Hoang Trần</span>
                        <label>Huấn luyện viên</label>
                        <span>Huy Trần</span>
                        <label>Gói tập</label>
                        <span>Gói luxury premium</span>
                    </div>
                    <div className={cx('col')} id={cx('sm')}>
                        <label>Giới tính</label>
                        <span>Nam</span>
                        <label>Giới tính</label>
                        <span>Nữ</span>
                        <label>Số buổi tập</label>
                        <span>60</span>
                    </div>
                    <div className={cx('col')}>
                        <label>Email</label>
                        <span>client@gmail.com</span>
                        <label>Email</label>
                        <span>coach@gmail.com</span>
                        <label>Trạng thái</label>
                        <span>Đang tập</span>
                    </div>
                    <div className={cx('col')}>
                        <label>SĐT</label>
                        <span>0918171615</span>
                        <label>SĐT</label>
                        <span>0987654321</span>
                        <label>Giá</label>
                        <span>30.000.000VNĐ</span>
                    </div>
                </div>
                <div className={cx('description')}>
                    <label>Mô tả gói tập</label>
                    <p>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                        only five centuries, but also the leap into electronic typesetting, remaining essentially
                        unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                        Ipsum passages, and more recently with desktop public...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContractDetails;
