import { db } from '../../firebase';
import { addDoc, collection, getDocs, setDoc, getDoc, query, where, limit, doc, updateDoc } from 'firebase/firestore';

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
            data.push({ ...doc.data(), docId: doc.id });
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

    const usersRef = collection(db, "weeklyRecord", weeklyRecordsRef.id, "users");
    const promises = [];

    console.log('data from db = ', data.users);
    

    // use set doc instead and set the id equal to that of the users id ie a1jv0ODa6A9UlTxTTRaT

    // data.users.forEach((member) => {
    //     promises.push(setDoc(doc(db, "weeklyRecords", weeklyRecordsRef.id, "users", member.id), {
    //         name: member.name,
    //         dayRate: member.dayRate,
    //         mon: member.mon,
    //         tue: member.tue,
    //         wed: member.wed,
    //         thu: member.thu,
    //         fri: member.fri,
    //         sat: member.sat,
    //         sun: member.sun
    //     }))
    // })

    // await Promise.all(promises);

    // return weeklyRecordsRef.id;

}

export const editWeek = async (data) => {
    const userId = data.formData.userId || data.formData.id.userId;

    console.log('data = ', data);

    const usersRef = collection(db, "weeklyRecord", data.weekId, "users");
    const q = query(usersRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    let docId = "";

    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            console.log('doc = ', doc.data());
            docId = doc.id;

        })
    }

    if (docId) {
        // update the document...
        const usersRef = doc(db, "weeklyRecord", data.weekId, "users", docId);
        delete data.formData.id;

        await updateDoc(usersRef, data.formData);
    }
}
