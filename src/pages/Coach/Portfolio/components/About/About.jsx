import ReactQuill from 'react-quill';
import classNames from 'classnames/bind';
import styles from './About.module.scss';
import 'react-quill/dist/quill.snow.css';
import { useForm, Controller } from 'react-hook-form';

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
    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit(onSubmit)} id={cx('about-form')}>
                <Controller
                    name="about"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <ReactQuill
                            value={value}
                            onChange={onChange}
                            modules={modules}
                            formats={formats}
                            bounds={'.app'}
                            className={cx('editor')}
                            placeholder="Viết gì đó về bản thân bạn..."
                        />
                    )}
                />
                <button type="submit" id={cx('update-btn')}>
                    Cập nhật
                </button>
            </form>
        </div>
    );
};

export default About;
