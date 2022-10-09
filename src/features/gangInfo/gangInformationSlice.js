import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createGangDoc, updateGangDoc, getGangData, deleteUser } from "../../services/database/gangInformation";

export const gangInformationSlice = createSlice({
    name: "gangInformation",
    initialState: {
        id: "",
        creatorId: "",
        // createdOn: new Date(),
        members: [],
        isLoading: true
    },

    extraReducers: (builder) => {
        builder.addCase(createGangInformationDocument.fulfilled, (state, action) => {
            console.log("action from saveGangInformation = ", action);
            state.members.push({
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                memberType: action.payload.memberType,
                dayRate: action.payload.dayRate,
                skill: action.payload.skill,
            })
        },

        builder.addCase(getData.fulfilled, (state, action) => {
            console.log("PAYLOAD MEMBERS DATA = ", action.payload.members);
            state.members = action.payload.members // <- FIX this wont work when more than one object in the array
            console.log("settign isLoading to false");
            state.isLoading = false;
        }),
        // builder.addCase(getData.pending, (state, action) => {
        // }),
        builder.addCase(getData.rejected, (state, action) => {
            state.isLoading = false;
        }),

        builder.addCase(updateGangInformationDocument.fulfilled, (state, action) => {
            state.members.push(action.payload.formData);
        }),

        builder.addCase(deleteMember.fulfilled, (state, action) => {
            console.log("data from delete = ", action.payload);
            console.log("members befroe delete = ", state.members);
            state.members.filter(item => item !== action.payload);
        }),
    )}


})

export const createGangInformationDocument = createAsyncThunk(
    "gangInformation/createGangInformationDocument",
    async (formData) => {
        try {
            console.log("thunk formData = ", formData);
            const id = await createGangDoc(formData);
            // need to return the form data and the new id for the gang
            return {...formData, id};
            
        } catch (error) {
            console.log("Error adding new gang. Error: ", error);
        }
    }
)

export const updateGangInformationDocument = createAsyncThunk(
    "gangInformation/updateGangInformationDocument",
    async (data) => {
        try {
            console.log("data from updateGangInformationDocument = ", data);
            await updateGangDoc(data);
            // need to return the form data and the new id for the gang
            return data;
            
        } catch (error) {
            console.log("Error adding new gang. Error: ", error);
        }
    }
)

export const deleteMember = createAsyncThunk(
    "gangInformation/deleteMember",
    async (data) => {
        try {
            console.log("data from deleteMember = ", data);
            await deleteUser(data);
            // need to return the form data and the new id for the gang
            return data;
            
        } catch (error) {
            console.log("Error deleting user . Error: ", error);
        }
    }
)

export const getData = createAsyncThunk(
    "gangInformation/getData",
    async (gangId) => {
        try {
            
            const data = await getGangData(gangId);
            // need to return the form data and the new id for the gang
           return data;
            
        } catch (error) {
            console.log("Error adding new gang. Error: ", error);
        }
    }
)

export default gangInformationSlice.reducer;