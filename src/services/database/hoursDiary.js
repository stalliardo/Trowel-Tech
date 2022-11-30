import { db } from '../../firebase';
import { addDoc, collection, getDocs, setDoc, getDoc, query, where, limit, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getWeekTotals } from '../../utils/hoursDiaryUtils';

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
            data.push({ ...doc.data(), id: doc.id });
        })
    }

    return data;
}

export const addWeek = async (data) => {
    const { gangId, weekEnding } = data;
    const weeklyRecordsRef = await addDoc(collection(db, "weeklyRecord"), {
        gangId,
        weekEnding,
    });
    const promises = [];    

    data.users.forEach((member) => {
        promises.push(setDoc(doc(db, "weeklyRecord", weeklyRecordsRef.id, "users", member.id), {
            name: member.name,
            dayRate: member.dayRate,
            mon: member.mon,
            tue: member.tue,
            wed: member.wed,
            thu: member.thu,
            fri: member.fri,
            sat: member.sat,
            sun: member.sun,
            gross: member.gross
        }))
    })

    await Promise.all(promises);

    return weeklyRecordsRef.id;
}

export const editWeek = async (data) => {
    const userId = data.formData.id;
    
    data.formData.gross = getWeekTotals(data.formData).gross;
    
    if (userId) {
        const usersRef = doc(db, "weeklyRecord", data.weekId, "users", userId);
        await updateDoc(usersRef, data.formData);
    }
}

export const deleteWeekDoc = async(weekId) => {
    await deleteDoc(doc(db, "weeklyRecord", weekId));
}
