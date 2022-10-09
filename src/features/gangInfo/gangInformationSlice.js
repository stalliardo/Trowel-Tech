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
        },

        builder.addCase(getData.fulfilled, (state, action) => {
            state.members = action.payload.members;
            state.isLoading = false;
        }),

        // builder.addCase(getData.pending, (state, action) => {
        // }),

        builder.addCase(getData.rejected, (state, action) => {
            state.isLoading = false;
        }),

        builder.addCase(updateGangInformationDocument.fulfilled, (state, action) => {
            const objectWithId = {...action.payload.formData, id: action.payload.id};
            state.members.push(objectWithId);
        }),

        builder.addCase(deleteMember.fulfilled, (state, action) => {
            const newMembersArray = state.members.filter(item => item.id !== action.payload.row.id);
            state.members = newMembersArray
        }),
    )}
})

export const { setIsLoading } = gangInformationSlice.actions;

export const createGangInformationDocument = createAsyncThunk(
    "gangInformation/createGangInformationDocument",
    async (formData) => {
        try {
            const id = await createGangDoc({...formData, id: Date.now()});
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

            const dataObject = {...data, id: Date.now()};
            await updateGangDoc(dataObject);

            console.log("dataObject from update = = = ", dataObject);
            return dataObject;
            
        } catch (error) {
            console.log("Error adding new gang. Error: ", error);
        }
    }
)

export const deleteMember = createAsyncThunk(
    "gangInformation/deleteMember",
    async (data) => {
        try {
            console.log("data from slice = ", data);
            await deleteUser(data);
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
           return data;
            
        } catch (error) {
            console.log("Error adding new gang. Error: ", error);
        }
    }
)

export default gangInformationSlice.reducer;