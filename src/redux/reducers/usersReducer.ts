import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {usersAPI} from "../../api/usersAPI";
import {
    AddStudentGroupType,
    AuthorizationType,
    CreateGroupType, CreateLessonsType,
    CreateMonthType,
    CreateSpecialtyType,
    GroupType, LessonsType,
    MonthsType, PostReportCardType,
    SpecialityType, UpdateUserRoleType,
    UserType
} from "../../types/types";

//THUNK
export const login = createAsyncThunk(
    "userReducer/login",
    async (data: AuthorizationType, thunkAPI) => {
        try {
            const response = await usersAPI.login(data);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const getPayers = createAsyncThunk(
    "userReducer/getPayers",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getPayers();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const logout = createAsyncThunk(
    "userReducer/logout",
    async (__, thunkAPI) => {
        try {
            return await usersAPI.logout();
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "userReducer/getAllUsers",
    async (__, thunkAPI) => {
        try {
            return await usersAPI.getAllUsers();
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getUserDetail = createAsyncThunk(
    "userReducer/getUserDetail",
    async (id: number, thunkAPI) => {
        try {
            const response = await usersAPI.getUserDetail(id);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getGroupDetail = createAsyncThunk(
    "userReducer/getGroupDetail",
    async (id: number, thunkAPI) => {
        try {
            const response = await usersAPI.getGroupDetail(id);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getAllGroups = createAsyncThunk(
    "userReducer/getAllGroups",
    async (__, thunkAPI) => {
        try {
            const response = await usersAPI.getAllGroups();
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);


export const createStudent = createAsyncThunk(
    "userReducer/createStudent",
    async (data: UserType, thunkAPI) => {
        try {
            return await usersAPI.createStudent(data);
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const createGroup = createAsyncThunk(
    "userReducer/createGroup",
    async (data: CreateGroupType, thunkAPI) => {
        try {
            return await usersAPI.createGroup(data);
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const updateGroup = createAsyncThunk(
    "userReducer/updateGroup",
    async (data: GroupType, thunkAPI) => {
        try {
            return await usersAPI.updateGroup(data);
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getSpecialty = createAsyncThunk(
    "userReducer/getSpecialty",
    async (__, thunkAPI) => {
        try {
            return await usersAPI.getSpecialty();
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const createSpecialty = createAsyncThunk(
    "userReducer/createSpecialty",
    async (data: CreateSpecialtyType, thunkAPI) => {
        try {
            return await usersAPI.createSpecialty(data);
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getGroupMonth = createAsyncThunk(
    "userReducer/getGroupMonth",
    async (__, thunkAPI) => {
        try {
            return await usersAPI.getGroupMonth()
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const createGroupMonth = createAsyncThunk(
    "userReducer/createGroupMonth",
    async (data: CreateMonthType, thunkAPI) => {
        try {
            return await usersAPI.createGroupMonth(data)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getProfile = createAsyncThunk(
    "userReducer/getProfile",
    async (__, thunkAPI) => {
        try {
            return await usersAPI.getProfile()
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getMonthDetail = createAsyncThunk(
    "userReducer/getMonthDetail",
    async (id:number, thunkAPI) => {
        try {
            return await usersAPI.getMonthDetail(id)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const deleteSpecialty = createAsyncThunk(
    "userReducer/deleteSpecialty",
    async (id:number, thunkAPI) => {
        try {
            return await usersAPI.deleteSpecialty(id)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const addStudentGroup = createAsyncThunk(
    "userReducer/addStudentGroup",
    async (data: AddStudentGroupType, thunkAPI) => {
        try {
            return await usersAPI.addStudentGroup(data)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getStudentGroup = createAsyncThunk(
    "userReducer/getStudentGroup",
    async (id: number, thunkAPI) => {
        try {
            return await usersAPI.getStudentGroup(id)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const createLessons = createAsyncThunk(
    "userReducer/createLessons",
    async (data: CreateLessonsType, thunkAPI) => {
        try {
            return await usersAPI.createLessons(data)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getGroupStudents = createAsyncThunk(
    "userReducer/getGroupStudents",
    async (id: number, thunkAPI) => {
        try {
            return await usersAPI.getGroupStudents(id)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getStudents = createAsyncThunk(
    "userReducer/getStudents",
    async (__, thunkAPI) => {
        try {
            return await usersAPI.getStudents()
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const getTeachers = createAsyncThunk(
    "userReducer/getTeachers",
    async (__, thunkAPI) => {
        try {
            return await usersAPI.getTeachers()
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const postReportCard = createAsyncThunk(
    "userReducer/postReportCard",
    async (data:PostReportCardType, thunkAPI) => {
        try {
            return await usersAPI.postReportCard(data)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const sendSMS = createAsyncThunk(
    "userReducer/sendSMS",
    async (id: number, thunkAPI) => {
        try {
            return await usersAPI.sendSMS(id)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);
export const deleteUser = createAsyncThunk(
    "userReducer/deleteUser",
    async (id: number, thunkAPI) => {
        try {
            return await usersAPI.deleteUser(id)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const updateUserRole = createAsyncThunk(
    "userReducer/updateUserRole",
    async (data: UpdateUserRoleType, thunkAPI) => {
        try {
            return await usersAPI.updateUserRole(data)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const updateSpecialty = createAsyncThunk(
    "userReducer/updateSpecialty",
    async (data: SpecialityType, thunkAPI) => {
        try {
            return await usersAPI.updateSpecialty(data)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const updateGroupMonth = createAsyncThunk(
    "userReducer/updateGroupMonth",
    async (data: CreateMonthType, thunkAPI) => {
        try {
            return await usersAPI.updateGroupMonth(data)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    "userReducer/updateUser",
    async (data: UserType, thunkAPI) => {
        try {
            return await usersAPI.updateUser(data)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    }
);

//STATE TYPE
type InitialStateType = {
    userData: UserType | null;
    allUsers: Array<UserType> | null;
    userDetail: UserType | null;
    isLoading: boolean;
    groups: Array<GroupType> | null;
    groupDetail: GroupType | null;
    groupStudents: Array<UserType>
    specialty: Array<SpecialityType> | null
    groupMonth: Array<MonthsType> | null
    monthDetail: Array<LessonsType> | null
    students: Array<UserType> | null
    teachers: Array<UserType> | null
    payers: Array<UserType> | null
};

//INITIAL STATE
const initialState: InitialStateType = {
    userData: null,
    allUsers: null,
    userDetail: null,
    isLoading: true,
    groups: null,
    groupDetail: null,
    groupMonth: null,
    monthDetail: null,
    groupStudents: [],
    specialty: null,
    students: null,
    teachers: null,
    payers: null,
} as InitialStateType;

//SLICE
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        updateGroupStudentsIsAvailable: (state, action) => {
            state.groupStudents[action.payload.index].is_available = action.payload.newState
        },
        updateGroupStudentsHomework: (state, action) => {
            state.groupStudents[action.payload.index].homework_done = action.payload.newState
        },
        clearUserDetail: (state) => {
            state.userDetail = null
        },
    },
    extraReducers: {
        [login.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.userData = action.payload;
            localStorage.setItem("Token", action.payload.token);
        },
        [logout.fulfilled.type]: (state) => {
            state.userData = null;
            localStorage.removeItem("Token");
        },
        [logout.rejected.type]: (state) => {
            state.userData = null;
            localStorage.removeItem("Token");
        },
        [getAllUsers.fulfilled.type]: (state, action: PayloadAction<[UserType]>) => {
            state.allUsers = action.payload;
        },
        [getUserDetail.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.userDetail = action.payload;
        },
        [getGroupDetail.fulfilled.type]: (state, action: PayloadAction<GroupType>) => {
            state.groupDetail = action.payload;
        },
        [getSpecialty.fulfilled.type]: (state, action: PayloadAction<[SpecialityType]>) => {
            state.specialty = action.payload;
        },
        [getAllGroups.fulfilled.type]: (state, action: PayloadAction<[GroupType]>) => {
            state.groups = action.payload;
        },
        [getGroupMonth.fulfilled.type]: (state, action: PayloadAction<[MonthsType]>) => {
            state.groupMonth = action.payload;
        },
        [getProfile.fulfilled.type]: (state, action: PayloadAction<UserType>) => {
            state.userData = action.payload;
        },
        [getMonthDetail.fulfilled.type]: (state, action: PayloadAction<Array<LessonsType>>) => {
            state.monthDetail = action.payload;
        },
        [getGroupStudents.fulfilled.type]: (state, action: PayloadAction<[UserType]>) => {
            state.groupStudents = action.payload;
        },
        [getStudents.fulfilled.type]: (state, action: PayloadAction<[UserType]>) => {
            state.students = action.payload;
        },
        [getTeachers.fulfilled.type]: (state, action: PayloadAction<[UserType]>) => {
            state.teachers = action.payload;
        },
        [getPayers.fulfilled.type]: (state, action: PayloadAction<[UserType]>) => {
            state.payers = action.payload;
        },
        [getStudentGroup.fulfilled.type]: (state, action: PayloadAction<[UserType]>) => {
            state.students = action.payload;
        },
    },
});

export const {setIsLoading, updateGroupStudentsHomework, updateGroupStudentsIsAvailable, clearUserDetail} = usersSlice.actions;
export default usersSlice.reducer;
