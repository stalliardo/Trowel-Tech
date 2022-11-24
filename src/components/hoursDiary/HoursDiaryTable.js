import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import ExtendableTable from '../table/ExtendableTable'
import CircularIndicator from '../loadingIndicator/CircularIndicator';

import ExtendableModal from '../modal/extendableModal/ExtendableModal';
import EditHoursModal from '../modal/EditHoursModal';

const buildRowsArray = (data) => {
    let tmpArray = [];

    data.forEach((member) => {
        tmpArray.push({
            name: member.firstName ? member.firstName + " " + member.lastName : member.name,
            mon: member.mon || 0,
            tue: member.tue || 0,
            wed: member.wed || 0,
            thu: member.thu || 0,
            fri: member.fri || 0,
            sat: member.sat || 0,
            sun: member.sun || 0,
            gross: member.gross || 0,
            id: { userId: member.id, dayRate: member.dayRate }
        });
    });

    return tmpArray;
}

const HoursDiaryTable = ({ weekEnding }) => {
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

    useEffect(() => {
        if (hoursDiaryData.currentWeek.users?.length) {
            setTableData({ head: tableData.head, rows: buildRowsArray(hoursDiaryData.currentWeek.users) });
            setIsLoading(false);
        } else if (gangInformation.members.length && !hoursDiaryData.isLoading) {
            setIsLoading(false);
            setTableData({ head: tableData.head, rows: buildRowsArray(gangInformation.members) });
        }

    }, [hoursDiaryData.currentWeek.users]);

    useEffect(() => {
        if (hoursDiaryData.currentWeek.users) {
            setTableData({ head: tableData.head, rows: buildRowsArray(hoursDiaryData.currentWeek.users) });
        }
    }, [hoursDiaryData.currentWeek.users]);

    const handleEditHours = (row) => {
        setShowEditHoursModal(true);
        setEditedRow(row);
    };

    const handleModalClosed = () => {
        setShowEditHoursModal(false);
    };

    return (
        isLoading ? <CircularIndicator /> :
            tableData.rows.length ?
                <>
                    <ExtendableTable data={tableData} editButton={true} handleEdit={handleEditHours} />
                    {showEditHoursModal ?
                        <ExtendableModal title={`Edit ${editedRow.name}'s Hours`} modalClosed={handleModalClosed}>
                            <EditHoursModal modalClosed={handleModalClosed} data={editedRow} weekEnding={weekEnding} gangId={userDoc.gangId} membersData={tableData.rows} />
                        </ExtendableModal>
                        : null
                    }
                </>
                : <Typography variant='h5'>No members have been found</Typography>
    )
}

export default HoursDiaryTable;