import { db } from '../../firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';

export const checkInvitations = async (recipientId) => {
    console.log("Check called");

    const q = query(collection(db, "invitations"), where("recipientId", "==", recipientId));
    const querySnapshot = await getDocs(q);
    const data = [];

    if(!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        })
    }

    return data;
}