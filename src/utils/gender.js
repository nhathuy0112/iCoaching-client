export const handleRenderGenders = (gender) => {
    switch (gender) {
        case 'Male':
            return 'Nam';
        case 'Female':
            return 'Nữ';
        case 'Other':
            return 'Khác';
        default:
            return '';
    }
};

export const handleRenderGenderClassNames = (gender) => {
    switch (gender) {
        case 'Male':
            return 'male';
        case 'Female':
            return 'female';
        case 'Other':
            return 'other';
        default:
            return '';
    }
};
