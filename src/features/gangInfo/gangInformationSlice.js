import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewGang } from "../../services/database/gangInformation";

export const gangInformationSlice = createSlice({
    name: "gangInformation",
    initialState: {
        id: "",
        gangName: "",
        creatorId: "",
        // createdOn: new Date(),
        members: [],
    },


})

export const createGang = createAsyncThunk(
    "gangInformation/createGang",
    async (formData) => {
        try {
            console.log("thunk formData = ", formData);
            const document = await createNewGang(formData);
            return document;
        } catch (error) {
            console.log("Error adding new gang. Error: ", error);
        }
    }
)

export default gangInformationSlice.reducer;