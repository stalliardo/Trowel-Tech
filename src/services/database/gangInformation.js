import { db } from '../../firebase';
import { doc, getDocs, addDoc, collection, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

export const createGangDoc = async (formData) => {
    const { firstName, lastName, memberType, dayRate, skill, creatorId } = formData;

    const gangRef = await addDoc(collection(db, "gangInformation"), {
        creatorId,
    });

    const membersRef = collection(db, "gangInformation", gangRef.id, "members");
    const memberData = await addDoc(membersRef, { firstName, lastName, memberType, dayRate, skill });

    const userRef = doc(db, "users", creatorId);

    await updateDoc(userRef, {
        gangId: gangRef.id
    });

    return { gangId: gangRef.id, userId: memberData.id };
}

export const updateGangDoc = async (data) => {
    const ref = collection(db, "gangInformation", data.gangId, "members");

    const memberData = await addDoc(ref, { ...data.formData });

    return memberData.id;
}

export const editMemberDoc = async (data) => {
    const memberRef = doc(db, "gangInformation", data.gangId, "members", data.id);

    await updateDoc(memberRef, {
        dayRate: data.dayRate,
        firstName: data.firstName,
        lastName: data.lastName,
        memberType: data.memberType,
        skill: data.skill
    })
}

export const deleteUser = async (data) => {
    const ref = doc(db, "gangInformation", data.gangId, "members", data.userId);
    await deleteDoc(ref);
}

export const getGangData = async (id) => {
    const querySnapshot = await getDocs(collection(db, "gangInformation", id, "members"));
    const data = [];

    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
    }

    return data;
}

export const search = async (searchTerm) => {
    const usernameRef = collection(db, "usernames");
    const searchQuery = query(usernameRef, where("lowerCaseUsername", "==", searchTerm.toLowerCase()));
    const usernames = [];
    const querySnapshot = await getDocs(searchQuery);

    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            console.log("doc.data() = ", doc.data());
            usernames.push(doc.data());
        })
    }
    return usernames;
}

export const addInvitation = async (recipientId, username, senderData) => {
    const data = {
        gangId: senderData.gangId,
        sendersName: senderData.name,
        recipientsName: username,
        recipientId,
        status: "Pending"
    }

    const invitationRef = await addDoc(collection(db, "invitations"), data);

    return { ...data, inviteId: invitationRef.id };
}

export const checkInvitations = async (gangId) => {

    const q = query(collection(db, "invitations"), where("gangId", "==", gangId));
    const querySnapshot = await getDocs(q);

    const invitations = [];

    if(!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            invitations.push({...doc.data(), id: doc.id});
        })
    }

    return invitations;
}