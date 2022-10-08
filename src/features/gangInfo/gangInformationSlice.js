import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewGang, getGangData } from "../../services/database/gangInformation";

export const gangInformationSlice = createSlice({
    name: "gangInformation",
    initialState: {
        id: "",
        gangName: "",
        creatorId: "",
        // createdOn: new Date(),
        members: [],
    },

    extraReducers: (builder) => {
        builder.addCase(createGang.fulfilled, (state, action) => {
            console.log("action from createGang = ", action);
            state.members.push({
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                memberType: action.payload.memberType,
                dayRate: action.payload.dayRate,
                skill: action.payload.skill,
            })
        },

        builder.addCase(getData.fulfilled, (state, action) => {
            
            console.log("action from getData = ", action);
            state.members.push(action.payload.members[0]) // <- FIX this wont work when more than one object in the array
            
        }),
    )}


})

export const createGang = createAsyncThunk(
    "gangInformation/createGang",
    async (formData) => {
        try {
            console.log("thunk formData = ", formData);
            const id = await createNewGang(formData);
            // need to return the form data and the new id for the gang
            return {...formData, id};
            
        } catch (error) {
            console.log("Error adding new gang. Error: ", error);
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