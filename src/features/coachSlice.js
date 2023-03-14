import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    certificationSubmit,
    getCertificationRequest,
    postAboutMe,
    getAboutMe,
    postPortfolioPhotos,
    getPortfolioPhotos,
    removePortfolioPhotos,
    addTrainingCourse,
    getTrainingCourses,
    editTrainingCourse,
    deleteTrainingCourse,
    getTrainingCourseById,
} from '~/services/coachService';

//Certification
export const certificationSubmitAsync = createAsyncThunk('/coach/certificationSubmit', async (payload) => {
    try {
        const response = await certificationSubmit(payload);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getCertificationAsync = createAsyncThunk('/coach/getCertificationRequest', async () => {
    try {
        const response = await getCertificationRequest();
        return response;
    } catch (error) {
        console.log(error);
    }
});

// Portfolio
export const postAboutMeAsync = createAsyncThunk('/coach/postAboutMe', async (data) => {
    try {
        const response = await postAboutMe(data);
        if (response) {
            toast.success('Cập nhật hồ sơ thành công!');
            return response;
        }
    } catch (error) {
        console.log(error);
    }
});

export const getAboutMeAsync = createAsyncThunk('/coach/getAboutMe', async () => {
    try {
        const response = await getAboutMe();
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const postPortfolioPhotosAsync = createAsyncThunk('/coach/postPortfolioPhotos', async (payload) => {
    try {
        const response = await postPortfolioPhotos(payload);
        if (response) {
            toast.success('Thêm ảnh thành công!');
            return response;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getPortfolioPhotosAsync = createAsyncThunk('/coach/getPortfolioPhotos', async () => {
    try {
        const response = await getPortfolioPhotos();
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const removePortfolioPhotosAsync = createAsyncThunk('/coach/removePortfolioPhotos', async (id) => {
    try {
        const response = await removePortfolioPhotos(id);
        if (response) {
            toast.success('Xóa ảnh thành công!');
            return { id };
        }
    } catch (error) {
        console.log(error);
    }
});

//Training Course
export const addTrainingCourseAsync = createAsyncThunk('/coach/addTrainingCourse', async (payload) => {
    try {
        const response = await addTrainingCourse({
            name: payload.name,
            price: payload.price,
            duration: payload.duration,
            description: payload.description,
        });
        if (response) {
            toast.success('Thêm gói tập thành công!');
            return response;
        }
    } catch (error) {
        console.log(error);
    }
});

export const getTrainingCourseAsync = createAsyncThunk('/coach/getTrainingCourse', async (payload) => {
    try {
        const response = await getTrainingCourses(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const getTrainingCourseByIdAsync = createAsyncThunk('/coach/getTrainingCourseById', async (id) => {
    try {
        const response = await getTrainingCourseById(id);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const editTrainingCourseAsync = createAsyncThunk('/coach/editTrainingCourse', async (payload) => {
    try {
        const response = await editTrainingCourse(payload.id, {
            name: payload.name,
            price: payload.price,
            duration: payload.duration,
            description: payload.description,
        });
        return { id: payload.id, name: response.name, price: response.price, duration: response.duration };
    } catch (error) {
        console.log(error);
    }
});

export const deleteTrainingCourseAsync = createAsyncThunk('/coach/deleteTrainingCourse', async (id) => {
    try {
        const response = await deleteTrainingCourse(id);
        if (response) {
            toast.success('Xóa gói tập thành công!');
            return { id };
        }
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    certificationImages: [],
    portfolioImages: [],
    trainingCourses: [],
    currentTrainingCourse: {},
    pageSize: 6,
    pageIndex: 1,
    totalCount: null,
    loading: false,
    error: null,
    message: '',
    status: null,
    aboutMe: '',
};

export const coachSlice = createSlice({
    name: 'coach',
    initialState,
    reducers: {
        resetCertificationImages: (state) => {
            state.certificationImages = [];
        },
        resetEditor: (state) => {
            state.aboutMe = '';
        },
        resetPortfolioImages: (state) => {
            state.portfolioImages = [];
        },
        setPage: (state, action) => {
            state.pageIndex = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            //submit certification
            .addCase(certificationSubmitAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(certificationSubmitAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.certificationImages = action.payload.urls;
                state.status = action.payload.status;
            })
            .addCase(certificationSubmitAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //get certification
            .addCase(getCertificationAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCertificationAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.certificationImages = action.payload.urls;
                state.status = action.payload.status;
            })
            .addCase(getCertificationAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //post about me
            .addCase(postAboutMeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postAboutMeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(postAboutMeAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //get about me
            .addCase(getAboutMeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAboutMeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.aboutMe = action.payload;
            })
            .addCase(getAboutMeAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //post photos of portfolio
            .addCase(postPortfolioPhotosAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(postPortfolioPhotosAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.portfolioImages = state.portfolioImages.concat(action.payload);
            })
            .addCase(postPortfolioPhotosAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //get photos of portfolio
            .addCase(getPortfolioPhotosAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getPortfolioPhotosAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.portfolioImages = action.payload.data;
            })
            .addCase(getPortfolioPhotosAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            // remove photos of portfolio
            .addCase(removePortfolioPhotosAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(removePortfolioPhotosAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.portfolioImages = state.portfolioImages.filter((image) => image.id !== action.payload.id);
            })
            .addCase(removePortfolioPhotosAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //add training course
            .addCase(addTrainingCourseAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(addTrainingCourseAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.trainingCourses.push(action.payload);
            })
            .addCase(addTrainingCourseAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //get training course
            .addCase(getTrainingCourseAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getTrainingCourseAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.trainingCourses = action.payload.data;
                state.pageSize = action.payload.pageSize;
                state.pageIndex = action.payload.pageIndex;
                state.totalCount = action.payload.count;
            })
            .addCase(getTrainingCourseAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //get training course by id
            .addCase(getTrainingCourseByIdAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getTrainingCourseByIdAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTrainingCourse = action.payload;
            })
            .addCase(getTrainingCourseByIdAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //edit training course
            .addCase(editTrainingCourseAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(editTrainingCourseAsync.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.trainingCourses.findIndex((course) => course.id === action.payload.id);
                state.trainingCourses[index].name = action.payload.name;
                state.trainingCourses[index].price = action.payload.price;
                state.trainingCourses[index].duration = action.payload.duration;
                state.trainingCourses[index].description = action.payload.description;
            })
            .addCase(editTrainingCourseAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            })

            //delete training course
            .addCase(deleteTrainingCourseAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(deleteTrainingCourseAsync.fulfilled, (state, action) => {
                state.loading = false;
                return state.trainingCourses.filter((course) => course.id !== action.payload.id);
            })
            .addCase(deleteTrainingCourseAsync.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            });
    },
});

export const { resetCertificationImages, resetEditor, resetPortfolioImages, setPage } = coachSlice.actions;

export default coachSlice.reducer;
