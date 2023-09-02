import { db } from '../../firebase';
import { getDocs, collection, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';

export const checkInvitations = async (recipientId) => {
    const q = query(collection(db, "invitations"), where("recipientId", "==", recipientId));
    const querySnapshot = await getDocs(q);
    const data = [];

    if(!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            
           if(doc.data().status === "Pending") data.push({...doc.data(), id: doc.id});
        })
    }
    return data;
}

export const acceptInvite = async (data) => {
    const inviteRef = doc(db, "invitations", data.inviteId);
    const promises = [];

    const acceptInvitePromise = await updateDoc(inviteRef, {
        status: "Accepted"
    });

    const userRef = doc(db, "users", data.userId);
    
    const addGangIdToDocPromise = await updateDoc(userRef, {
        gangId: data.gangId
    });

    return Promise.all(promises);
}

export const declineInvite = async (inviteId) => {
    const inviteRef = doc(db, "invitations", inviteId);

    return await updateDoc(inviteRef, {
        status: "Declined"
    });   
}