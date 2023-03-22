import {
    GrDocumentCsv,
    GrDocumentExcel,
    GrDocumentPdf,
    GrDocumentTxt,
    GrDocumentWindows,
    GrDocumentWord,
    GrDocumentZip,
} from 'react-icons/gr';

export const getFileExtension = (filename) => {
    const dotPosition = filename.lastIndexOf('.');
    if (dotPosition === -1) return '';
    return filename.substring(dotPosition + 1);
};

export const handleRenderFileIcon = (filename) => {
    switch (getFileExtension(filename)) {
        case 'txt':
            return <GrDocumentTxt />;
        case 'pdf':
            return <GrDocumentPdf />;
        case 'csv':
            return <GrDocumentCsv />;
        case 'doc' || 'docx':
            return <GrDocumentWord />;
        case 'exe':
            return <GrDocumentWindows />;
        case 'zip':
            return <GrDocumentZip />;
        case 'xlsx':
            return <GrDocumentExcel />;
        default:
            return;
    }
};
