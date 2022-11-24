import { db } from '../../firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

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

export const addWeek = async (data) => {
    const {weekId, gangId, weekEnding, dayRate, userId, nonEditedMembers, name, mon, tue, wed, thu, fri, sat, sun} = data;

    console.log("data inside service file - ", data);

    // gonna need to loop members and for each one create a new sub collection if this is a CREATE
    // how will UPDATE work?
        // members will already be present in the subcollection, will just need to find that one by id the set()
    

    // if(!weekId) {

    //     console.log("\n\nno week id found");
       
    //     const weeklyRecordsRef = await addDoc(collection(db, "weeklyRecord"), {
    //         gangId,
    //         weekEnding,
    //     });

    //     console.log("\nweeklyRecord created. id = ", weeklyRecordsRef.id);
        
    //     // Now add the user to the subcollection

    //     const usersRef = collection(db, "weeklyRecord", weeklyRecordsRef.id, "users");
    //     await addDoc(usersRef, {
    //         name, userId, dayRate, mon, tue, wed, thu, fri, sat, sun
    //     });

    //     console.log("users subcollection created");

    //     // need to return the new id for the created week and append that to the data passed in here

    //     return {weekId: weeklyRecordsRef.id, weekEnding};



    // } else {
    //     // This is a UPDATE op...
    // }
    
}

