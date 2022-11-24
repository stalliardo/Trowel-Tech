import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getData } from '../../features/gangInfo/gangInformationSlice';

import Typography from '@mui/material/Typography';
import ExtendableTable from '../table/ExtendableTable'
import CircularIndicator from '../loadingIndicator/CircularIndicator';
import { getWeeks } from '../../features/hoursDiary/hoursDiarySlice';
import { isObjectEmpty } from '../../utils/dataChecks';

const buildRowsArray = (data) => {
    let tmpArray = [];

    // The data will be different depending on whether this is an existing week or a new week.
    // If new, set all the values to 0

    // How will i detect if this an edit or create operation?
    // Check the value of the hoursDiary.currentWeek object for emptyness...

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

    const userDoc = useSelector((state) => state.user.currentUser);
    const gangInformation = useSelector(state => state.gangInformation);
    const hoursDiaryData = useSelector(state => state.hoursDiary);

    const dispatch = useDispatch();

    useEffect(() => {

        // Gonna need to determine if editing or creating via the currentWeek prop
        // But, how will the current week be determined???
        // Check if the db has any records
        // if more than one record
        // get the latest week via its date
        // return the only week
        // No records in the db so must be creating
        // Only get the members if creating a week as the currentWeek would have that information


        // firstly check for an exisiting week....
        if(isObjectEmpty(hoursDiaryData.currentWeek) && userDoc?.gangId) { // no week found in state...
            console.log("no current week found. Getting weeks data...");
            dispatch(getWeeks(userDoc.gangId)).unwrap().then((data) => {
                console.log("data from get weeks = ", data);

                // if no data found ie [].length == 0, then safe to say that this is a create operation
                // OR, if data.length build the rows here with the data from the currentWeek

                // TODO -> setTableData({ head: tableData.head, rows: buildRowsArray(data) })

            }).catch((e) => {
                console.log("Error getting weeks data = ", e);
            })
        } else if (!gangInformation.members.length && userDoc?.gangId) { // <- no currentWeek found
            console.log("no current week and no members found but gangId found. ", userDoc.gangId);
            // Get the members from the DB
            dispatch(getData(userDoc.gangId)).unwrap().then((data) => {
                // members found. Build the table

                console.log("data = ", data);

                setTableData({ head: tableData.head, rows: buildRowsArray(data) })

                // tableData.rows = buildRowsArray(members)
            })
        }

        // only run this if the above is falsy
        
    }, [])


    return (
        gangInformation.isLoading ? <CircularIndicator /> : gangInformation.members.length ? <ExtendableTable data={tableData} editButton={true} /> : <Typography variant='h5'>No members have been found</Typography>
    )
}

export default HoursDiaryTable;


// Check if there are members in the gangInfrmation slice