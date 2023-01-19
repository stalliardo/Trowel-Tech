import React, { useEffect, useState } from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import { useDispatch } from 'react-redux'
import { searchUsernames } from '../../features/gangInfo/gangInformationSlice'

const InviteMemberForm = () => {

    const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [selectedMember, setSelectedMember] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [noUserFoundText, setNoUserFoundText] = useState("");

    const dispatch = useDispatch();
    // const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        if (e.target.value.length > 2) {
            setSearchButtonDisabled(false);
        } else {
            setSearchButtonDisabled(true);
        }

        setSearchValue(e.target.value);
    }

    const onSearch = () => {
        dispatch(searchUsernames(searchValue)).unwrap().then((result) => {
            setSearchResult(result);
            if(!result.length) setNoUserFoundText("No member was found with that username!");
        }).catch((e) => {
            console.log("an error occured while getting the usernames. Error: ", e);
        })

    }

    return (
        <Container maxWidth="xl" sx={{ mt: "30px", padding: "20px", backgroundColor: "backDrop.dark", borderRadius: "5px" }}>
            <Box textAlign="left">
                <Typography variant='h5' textAlign="left" mb="10px">Invite Members</Typography>
                <Paper elevation={4}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
                        <TextField label="Members Username" onChange={handleChange} sx={{ width: "30%" }} />
                        <Button variant="contained" disabled={searchButtonDisabled} onClick={onSearch} sx={{ height: "40px" }}>Search</Button>
                    </Box>
                    {
                        searchResult.length ?
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 20px 20px", width: "29%"}}>
                                <Typography variant='h5'>{searchResult[0]}</Typography>
                                <Button variant="contained" disabled={searchButtonDisabled} onClick={onSearch} sx={{ height: "40px" }}>Invite</Button>
                            </Box>
                            : <Box sx={{padding: "0px 20px 20px"}}>
                                <Typography variant='h5'>{noUserFoundText}</Typography>
                            </Box>
                    }
                </Paper>
            </Box>
        </Container>
    )
}

export default InviteMemberForm