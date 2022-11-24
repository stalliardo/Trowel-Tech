import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getData } from '../../features/gangInfo/gangInformationSlice';

import Typography from '@mui/material/Typography';
import ExtendableTable from '../table/ExtendableTable'
import CircularIndicator from '../loadingIndicator/CircularIndicator';

import { getWeeks } from '../../features/hoursDiary/hoursDiarySlice';

import { isObjectEmpty } from '../../utils/dataChecks';

import ExtendableModal from '../modal/extendableModal/ExtendableModal';
import EditHoursModal from '../modal/EditHoursModal';

const buildRowsArray = (data) => {
    let tmpArray = [];

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
            gross: 0,
            id: {userId: member.id, dayRate: member.dayRate}
        });
    });

    return tmpArray;
}

const HoursDiaryTable = ({weekEnding}) => {
    const [tableData, setTableData] = useState({
        head: ["Name", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Gross Pay", "Actions"],
        rows: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [showEditHoursModal, setShowEditHoursModal] = useState(false);
    const [editedRow, setEditedRow] = useState(null);

    const userDoc = useSelector((state) => state.user.currentUser);
    const gangInformation = useSelector(state => state.gangInformation);
    const hoursDiaryData = useSelector(state => state.hoursDiary);

    const dispatch = useDispatch();

    useEffect(() => {

        // firstly check for an exisiting week....
        if (isObjectEmpty(hoursDiaryData.currentWeek) && userDoc?.gangId) { // no week found in state...
            console.log("no current week found. Getting weeks data...");
            dispatch(getWeeks(userDoc.gangId)).unwrap().then((data) => {
                console.log("data from get weeks = ", data);


                if (data.length) { // there is a current week...
                    console.log("\n\nweeks found, returning weeks...");
                    // TODO -> setTableData({ head: tableData.head, rows: buildRowsArray(data) })
                    // To avoid an error in the next then call, return the weeks data
                    return data;
                }


                // data == [].....
                if (!data.length && !gangInformation.members.length && userDoc?.gangId) { // <- no currentWeek found
                    console.log("\n\nno weeks found. Getting the members from the gang information", userDoc.gangId);
                    // Get the members from the DB
                    return dispatch(getData(userDoc.gangId)).unwrap();
                }

                if (!data.length && gangInformation.members.length) {
                    return gangInformation.members;
                }


            }).then((members) => { // <- will this throw an error if a week is found as there will be no return statement
                console.log("set data called. Members = ", members);
                setTableData({ head: tableData.head, rows: buildRowsArray(members) })
            }).catch((e) => {
                console.log("Error getting weeks data = ", e);
            }).finally(() => {
                setIsLoading(false);
            })
        }
    }, []);

    const handleEditHours = (row) => {
        console.log("row = ", row);
        setShowEditHoursModal(true);
        setEditedRow(row);
    }

    const handleModalClosed = () => {
        setShowEditHoursModal(false);
    }

   


    return (
        isLoading ? <CircularIndicator /> :
            gangInformation.members.length ?
                <>
                    <ExtendableTable data={tableData} editButton={true} handleEdit={handleEditHours} />
                    {showEditHoursModal ?
                    <ExtendableModal title={`Edit ${editedRow.name}'s Hours`} modalClosed={handleModalClosed}>
                        {/* <AddMemberModal modalClosed={handleModalClosed} userDoc={userDoc} /> */}
                        <EditHoursModal modalClosed={handleModalClosed} data={editedRow} weekEnding={weekEnding} gangId={userDoc.gangId} membersData={tableData.rows}/>
                    </ExtendableModal>
                    : null
                }

                </>
                : <Typography variant='h5'>No members have been found</Typography>
    )
}

export default HoursDiaryTable;


// Check if there are members in the gangInfrmation slice