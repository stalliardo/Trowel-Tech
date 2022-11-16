import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createGangDoc, updateGangDoc, getGangData, deleteUser, overwriteMembersArray } from "../../services/database/gangInformation";

export const gangInformationSlice = createSlice({
    name: "gangInformation",
    initialState: {
        id: "",
        creatorId: "",
        members: [],
        isLoading: true,
        isEditing: false
    },

    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(createGangInformationDocument.fulfilled, (state, action) => {
            state.members.push({
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                memberType: action.payload.memberType,
                dayRate: action.payload.dayRate,
                skill: action.payload.skill,
                id: action.payload.id
            })
            state.id = action.payload.id
        },
            builder.addCase(getData.fulfilled, (state, action) => {
                state.members = action.payload.members;
                state.isLoading = false;
                state.creatorId = action.payload.creatorId;
                state.id = action.payload.id;
            }),

            builder.addCase(getData.rejected, (state, action) => {
                state.isLoading = false;
            }),

            builder.addCase(updateGangInformationDocument.fulfilled, (state, action) => {
                const objectWithId = { ...action.payload.formData, id: action.payload.id };
                state.members.push(objectWithId);
            }),

            builder.addCase(deleteMember.fulfilled, (state, action) => {
                const newMembersArray = state.members.filter(item => item.id !== action.payload.row.id);
                state.members = newMembersArray
            }),

            builder.addCase(editMember.pending, (state) => {
                state.isEditing = true;
            }),

            builder.addCase(editMember.fulfilled, (state, action) => {
                state.members = action.payload.membersArray;
                state.isEditing = false;
            }),

            builder.addCase(editMember.rejected, (state) => {
                state.isEditing = false;
            }),
        )
    }
})

export const { setIsLoading } = gangInformationSlice.actions;

export const createGangInformationDocument = createAsyncThunk(
    "gangInformation/createGangInformationDocument",
    async (formData) => {
        try {
            const id = await createGangDoc({ ...formData, id: Date.now() });
            return { ...formData, id };

        } catch (error) {
           throw error;
        }
    }
)

export const updateGangInformationDocument = createAsyncThunk(
    "gangInformation/updateGangInformationDocument",
    async (data) => {
        try {
            const dataObject = { ...data, id: Date.now() };
            await updateGangDoc(dataObject);
            return dataObject;
        } catch (error) {
           throw error;
        }
    }
)

export const editMember = createAsyncThunk(
    "gangInformation/editMember",
    async (data) => {
        try {
            await overwriteMembersArray(data);
            return data;
        } catch (error) {
            
            throw error;
        }
    }
)

export const deleteMember = createAsyncThunk(
    "gangInformation/deleteMember",
    async (data) => {
        try {
            await deleteUser(data);
            return data;
        } catch (error) {
           throw error;
        }
    }
)

export const getData = createAsyncThunk(
    "gangInformation/getData",
    async (gangId) => {
        try {
            const data = await getGangData(gangId);
            return data;

        } catch (error) {
           throw error;
        }
    }
)

export default gangInformationSlice.reducer;