import ReactQuill from 'react-quill';
import classNames from 'classnames/bind';
import styles from './About.module.scss';
import 'react-quill/dist/quill.snow.css';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAboutMeAsync,
    postAboutMeAsync,
    resetEditor,
    resetCertificationImages,
    resetPortfolioImages,
} from '~/features/coachSlice';
import { useEffect, useState } from 'react';
import Spinner from '~/layouts/components/Spinner';

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

const About = () => {
    const dispatch = useDispatch();
    const { aboutMe, loading } = useSelector((state) => state.coach);
    const { currentUser } = useSelector((state) => state.user);
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

    useEffect(() => {
        if (currentUser === null) {
            dispatch(resetCertificationImages());
            dispatch(resetEditor());
            dispatch(resetPortfolioImages());
        }
    }, [currentUser, dispatch]);

    const handlePostAboutMe = (data) => {
        dispatch(postAboutMeAsync(editorValue ? editorValue : data.about));
    };

    const handleEditorChange = (value) => {
        setEditorValue(value);
    };

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit(handlePostAboutMe)} id={cx('about-form')}>
                <Controller
                    name="about"
                    control={control}
                    defaultValue={aboutMe !== '' ? aboutMe : ''}
                    render={({ field: { onChange, value } }) => (
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
                <button type="submit" id={cx('update-btn')} disabled={loading}>
                    <span>{loading ? <Spinner /> : 'Cập nhật'}</span>
                </button>
            </form>
        </div>
    );
};

export default About;
