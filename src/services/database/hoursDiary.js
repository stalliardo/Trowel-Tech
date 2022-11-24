import { db } from '../../firebase';
import { addDoc, collection, getDocs, getDoc, query, where, limit } from 'firebase/firestore';

export const getAllWeeks = async (gangId) => {
    const weeklyRecordsRef = collection(db, "weeklyRecord");

    const q = query(weeklyRecordsRef, where("gangId", "==", gangId));

    const querySnapshot = await getDocs(q);

    let data = [];

    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            data.push({ gangId, weekEnding: doc.data().weekEnding, id: doc.id });
        });
    }

    return data;
}

export const getUsersForWeek = async (weekId) => {
    const querySnapshot = await getDocs(collection(db, "weeklyRecord", weekId, "users"));
    const data = [];

    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        })
    }

    return data;
}


export const addWeek = async (data) => {
    const { weekId, gangId, weekEnding } = data;

    if (!weekId) {
        const weeklyRecordsRef = await addDoc(collection(db, "weeklyRecord"), {
            gangId,
            weekEnding,
        });

        const usersRef = collection(db, "weeklyRecord", weeklyRecordsRef.id, "users");
        const promises = [];

        data.users.forEach((member) => {
            promises.push(addDoc(usersRef, {
                name: member.name, userId: member.id.userId, dayRate: member.id.dayRate, mon: member.mon, tue: member.tue, wed: member.wed, thu: member.thu, fri: member.fri, sat: member.sat, sun: member.sun
            }))
        })

        await Promise.all(promises);

        return { weekId: weeklyRecordsRef.id };
    } else {

        // This is a UPDATE op...TODO
    }

}

