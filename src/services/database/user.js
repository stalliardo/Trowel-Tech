import { db } from '../../firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';

export const checkInvitations = async (recipientId) => {
    const q = query(collection(db, "invitations"), where("recipientId", "==", recipientId));
    const querySnapshot = await getDocs(q);
    const data = [];

    if(!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            console.log("data = ", doc.data());
            data.push({...doc.data(), id: doc.id});
        })
    }

    return data;
}