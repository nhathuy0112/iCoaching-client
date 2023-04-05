import classNames from 'classnames/bind';
import styles from './Policy.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Policy = () => {
    const clientPolicies = [
        {
            id: 1,
            content:
                'Khách hàng phải thanh toán bằng VNPay và gửi lời nhắn cho Huấn luyện viên trước khi đợi Huấn luyện viên chấp nhận yêu cầu tập luyện. Nếu không thanh toán trong vòng 2 ngày thì yêu cầu xem như bị hủy. Nếu Huấn luyện viên không đồng ý trong 2 ngày thì yêu cầu xem như bị hủy và Khách hàng được hoàn tiền.',
        },
        {
            id: 2,
            content: 'Mỗi Khách hàng chỉ có thể tập luyện với 1 gói của Huấn luyện viên trong thời gian đang tập.',
        },
        {
            id: 3,
            content:
                'Khách hàng có thể đăng kí gói tập của 1 huấn luyện viên khác khi đang tập 1 gói của huấn luyện viên mình đã đăng ký.',
        },
        {
            id: 4,
            content: 'Khách hàng có thể khiếu nại khi hợp đồng với huấn luyện viên chưa hoàn thành hết tiến độ.',
        },
        {
            id: 5,
            content:
                'Khi hợp đồng đang ở trạng thái đợi hoàn thành. Nếu khách hàng bấm nút Hoàn thành thì hợp đồng sẽ kết thúc. Trong trường hợp bấm nút Từ chối, hợp đồng sẽ được tính là khiếu nại. Nếu không bấm nút Hoàn thành hay Từ chối, hợp đồng sẽ tự động hoàn thành sau 1 ngày.',
        },
    ];

    const coachPolicies = [
        {
            id: 1,
            content:
                'Huấn luyện viên phải xác minh tài khoản bằng cách gửi ảnh chứng chỉ cho Quản lý của hệ thống. Nếu không nộp chứng chỉ thì không thể tham gia Huấn luyện khách hàng.',
        },
        {
            id: 2,
            content: 'Mỗi Huấn luyện viên chỉ có thể huấn luyện cho khách hàng đã đăng kí duy nhất 1 gói tập của mình.',
        },
        {
            id: 3,
            content:
                'Huấn luyện viên có thể Đồng ý hoặc Từ chối yêu cầu huấn luyện kèm theo lời nhắn với Khách hàng trong danh sách yêu cầu tùy theo nhu cầu của mình. Nếu Huấn luyện viên không Đồng ý hay Từ chối thì yêu cầu huấn luyện xem như bị hủy.',
        },
        {
            id: 4,
            content:
                'Huấn luyện viên phải hoàn thành hết tiến độ của gói tập trước khi hoàn thành hợp đồng với khách hàng.',
        },
        {
            id: 5,
            content:
                'Khi hợp đồng bị khiếu nại. Quản lý hệ thống sẽ xem xét và cảnh báo Huấn luyện viên. Nếu Huấn luyện viên bị cảnh báo nhiều lần, tài khoản sẽ tự động bị khóa.',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('frame')}>
                    <div className={cx('back')}>
                        <Link to="/" className={cx('back-link')}>
                            <IoIosArrowBack />
                            <span>Trang chủ</span>
                        </Link>
                    </div>
                    <h1 className={cx('title')}>Điều khoản</h1>
                    <div className={cx('main')}>
                        <div className={cx('role-info')}>
                            <h3 className={cx('role-title')}>Khách hàng</h3>
                            <ul className={cx('policy-list')}>
                                {clientPolicies.map((policy) => (
                                    <li className={cx('policy-item')} key={policy.id}>
                                        {policy.content}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={cx('role-info')}>
                            <h3 className={cx('role-title')}>Huấn luyện viên</h3>
                            <ul className={cx('policy-list')}>
                                {coachPolicies.map((policy) => (
                                    <li className={cx('policy-item')} key={policy.id}>
                                        {policy.content}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Policy;
