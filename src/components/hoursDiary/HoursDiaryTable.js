import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getData } from '../../features/gangInfo/gangInformationSlice';

import Typography from '@mui/material/Typography';
import ExtendableTable from '../table/ExtendableTable'
import CircularIndicator from '../loadingIndicator/CircularIndicator';

const buildRowsArray = (data) => {
    let tmpArray = [];

    // The data will be different depending on whether this is an existing week or a new week.
    // If new, set all the values to 0

    data.forEach((member) => {
        tmpArray.push({
            name: member.firstName + " " + member.lastName,
            mon: 0,
            tue: 0,
            wed: 0,
            thu: 0,
            fri: 0,
            sat: 0,
            sun: 0,
            gross: 0
        });
    });

    return tmpArray;
}

const HoursDiaryTable = () => {

    const [tableData, setTableData] = useState({
        head: ["Name", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Gross Pay", "Actions"],
        rows: []
    });

    const [dataLoaded, setDataLoaded] = useState(false); // could/should i use the gangInformationSlice.dataLoaded prop to avoid unsightly page rerenders

    const gangInformation = useSelector(state => state.gangInformation);
    const userDoc = useSelector((state) => state.user.currentUser);

    const dispatch = useDispatch();

    useEffect(() => {
        // Check for members
        if (!gangInformation.members.length && userDoc?.gangId) {
            console.log("no members found but gangId found. ", userDoc.gangId);
            // Get the members from the DB
            dispatch(getData(userDoc.gangId)).unwrap().then((data) => {
                // members found. Build the table
                
                console.log("data = ", data);

                setTableData({head: tableData.head, rows: buildRowsArray(data)})

                // tableData.rows = buildRowsArray(members)


            }).catch((e) => {
                // TODO return an error instead of the table???
            })
        }
    }, [])


    return (
        gangInformation.isLoading ? <CircularIndicator /> : gangInformation.members.length ? <ExtendableTable data={tableData} editButton={true} /> : <Typography variant='h5'>No members have been found</Typography>
    )
}

export default HoursDiaryTable;


// Check if there are members in the gangInfrmation slice