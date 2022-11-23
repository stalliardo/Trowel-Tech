import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const getAllWeeks = async (gangId) => {

    // WIll run a query where the docs gangId is equal to the one provided
    const weeklyRecordsRef = collection(db, "weeklyRecord");

    const q = query(weeklyRecordsRef, where("gangId", "==", gangId));

    const querySnapshot = await getDocs(q);

    let data = [];

    if(!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            console.log("week.data = ", doc.data());
        })
    }

    return data;
}

