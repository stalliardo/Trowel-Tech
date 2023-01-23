import { db } from '../../firebase';
import { getDocs, collection, query, where, updateDoc, doc } from 'firebase/firestore';

export const checkInvitations = async (recipientId) => {
    const q = query(collection(db, "invitations"), where("recipientId", "==", recipientId));
    const querySnapshot = await getDocs(q);
    const data = [];

    if(!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            
           if(doc.data().status !== "Accepted") data.push({...doc.data(), id: doc.id});
        })
    }

    // only return the none accepted ones. They will be deleted via the admin / gang member

    return data;
}

export const acceptInvite = async (data) => {
    const inviteRef = doc(db, "invitations", data.inviteId);

    // will alos need to update their doc to inclue the gangId

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