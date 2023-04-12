import classNames from 'classnames/bind';
import styles from './UpdatePortfolio.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAboutMeAsync, postAboutMeAsync } from '~/features/coachSlice';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { IoIosArrowBack } from 'react-icons/io';
import Spinner from '~/components/Spinner';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block'],
    ],
};

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block',
];

const UpdatePortfolio = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { aboutMe, loading } = useSelector((state) => state.coach);
    const { control, handleSubmit } = useForm();
    const [editorValue, setEditorValue] = useState('');

    useEffect(() => {
        dispatch(getAboutMeAsync());
    }, [dispatch]);

    useEffect(() => {
        if (aboutMe) {
            setEditorValue(aboutMe);
        }
    }, [aboutMe]);

    const handleEditorChange = (value) => {
        setEditorValue(value);
    };

    const handlePostAboutMe = (data) => {
        dispatch(postAboutMeAsync(editorValue ? editorValue : data.about))
            .unwrap()
            .then(() => {
                navigate(`/coach/${id}/portfolio`);
                toast.success('Cập nhật hồ sơ thành công!');
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-back')}>
                <div className={cx('back')}>
                    <Link to={`/coach/${id}/portfolio`} className={cx('back-link')}>
                        <IoIosArrowBack />
                        <span>Quay lại</span>
                    </Link>
                </div>
                <h2 className={cx('title')}>Giới thiệu bản thân</h2>
            </div>
            <div className={cx('content')}>
                <form onSubmit={handleSubmit(handlePostAboutMe)} id={cx('about-form')}>
                    <Controller
                        name="about"
                        control={control}
                        defaultValue={aboutMe !== '' ? aboutMe : ''}
                        render={({ field: { onChange } }) => (
                            <ReactQuill
                                value={editorValue}
                                onChange={handleEditorChange}
                                modules={modules}
                                formats={formats}
                                bounds={'.app'}
                                className={cx('editor')}
                                placeholder="Viết gì đó về bản thân bạn..."
                            />
                        )}
                    />
                    <button type="submit" id={cx('save-btn')} disabled={loading}>
                        <span>{loading ? <Spinner /> : 'Lưu'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePortfolio;
