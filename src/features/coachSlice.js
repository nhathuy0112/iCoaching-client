import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    getCoachingRequests,
    updateCoachingRequest,
    getAllContracts,
    completedContract,
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
        return response;
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
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getPortfolioPhotosAsync = createAsyncThunk('/coach/getPortfolioPhotos', async (payload) => {
    try {
        const response = await getPortfolioPhotos(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const removePortfolioPhotosAsync = createAsyncThunk('/coach/removePortfolioPhotos', async (id) => {
    try {
        await removePortfolioPhotos(id);
        return { id };
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
        return response;
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
        await deleteTrainingCourse(id);
        return { id };
    } catch (error) {
        console.log(error);
    }
});

//coaching request
export const getCoachingRequestsAsync = createAsyncThunk('coach/getCoachingRequests', async (payload) => {
    try {
        const response = await getCoachingRequests(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const updateCoachingRequestAsync = createAsyncThunk('coach/updateCoachingRequest', async (payload) => {
    try {
        const response = await updateCoachingRequest(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

//contracts
export const getAllContractsAsync = createAsyncThunk('coach/getAllContracts', async (payload) => {
    try {
        const response = await getAllContracts(payload);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const completedContractAsync = createAsyncThunk(
    'coach/completedContract',
    async (contractId, { rejectWithValue }) => {
        try {
            const response = await completedContract(contractId);
            return response;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    },
);

const initialState = {
    currentCertificationRequest: {},
    certificationImages: [],
    portfolioImages: [],
    trainingCourses: [],
    coachingRequests: [],
    contracts: [],
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
                state.status = 'Submitted';
            })
            .addCase(certificationSubmitAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get certification
            .addCase(getCertificationAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCertificationAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.currentCertificationRequest = action.payload;
            })
            .addCase(getCertificationAsync.rejected, (state, action) => {
                state.loading = false;
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
                state.loading = false;
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
                state.loading = false;
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
                state.loading = false;
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
                state.totalCount = action.payload.count;
                state.pageSize = action.payload.pageSize;
            })
            .addCase(getPortfolioPhotosAsync.rejected, (state, action) => {
                state.loading = false;
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
                state.loading = false;
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
                state.loading = false;
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
                state.loading = false;
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
                state.loading = false;
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
                state.loading = false;
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
                state.trainingCourses = state.trainingCourses.filter((course) => course.id !== action.payload.id);
            })
            .addCase(deleteTrainingCourseAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get coaching request
            .addCase(getCoachingRequestsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getCoachingRequestsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.coachingRequests = action.payload.data;
                state.pageSize = action.payload.pageSize;
                state.totalCount = action.payload.count;
            })
            .addCase(getCoachingRequestsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //update coaching request
            .addCase(updateCoachingRequestAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(updateCoachingRequestAsync.fulfilled, (state) => {
                state.loading = false;
                state.status = !state.status;
            })
            .addCase(updateCoachingRequestAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //get all contracts
            .addCase(getAllContractsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(getAllContractsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.contracts = action.payload.data;
                state.totalCount = action.payload.count;
                state.pageSize = action.payload.pageSize;
            })
            .addCase(getAllContractsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //complete contract
            .addCase(completedContractAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = '';
            })
            .addCase(completedContractAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(completedContractAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetCertificationImages, resetEditor, resetPortfolioImages, setPage } = coachSlice.actions;

export default coachSlice.reducer;
