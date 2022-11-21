import { db } from '../../firebase';
import { doc, getDocs, addDoc, collection, updateDoc, deleteDoc } from 'firebase/firestore';

export const createGangDoc = async (formData) => {
    const { firstName, lastName, memberType, dayRate, skill, creatorId, id } = formData;

    const docRef = await addDoc(collection(db, "gangInformation"), {
        creatorId,
    });

    const membersRef = collection(db, "gangInformation", docRef.id, "members");
    await addDoc(membersRef, {id, firstName, lastName, memberType, dayRate, skill});

    const userRef = doc(db, "users", creatorId);

    await updateDoc(userRef, {
        gangId: docRef.id
    });

    return docRef.id;
}

export const updateGangDoc = async (data) => {
    const ref = collection(db, "gangInformation", data.gangId, "members");

    await addDoc(ref, {...data.formData, id: data.id});
}

// TODO below

export const overwriteMembersArray = async (data) => {
    const gangInformationRef = doc(db, "gangInformation", data.gangId);

    await updateDoc(gangInformationRef, {
        members: data.membersArray
    })
}

export const deleteUser = async (data) => {
    const ref = doc(db, "gangInformation", data.id, "members", data.row.id);
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