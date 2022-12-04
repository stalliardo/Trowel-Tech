import { db } from '../../firebase';
import { doc, getDocs, addDoc, collection, updateDoc, deleteDoc } from 'firebase/firestore';

export const createGangDoc = async (formData) => {
    const { firstName, lastName, memberType, dayRate, skill, creatorId } = formData;

    const gangRef = await addDoc(collection(db, "gangInformation"), {
        creatorId,
    });

    const membersRef = collection(db, "gangInformation", gangRef.id, "members");
    const memberData = await addDoc(membersRef, {firstName, lastName, memberType, dayRate, skill});

    const userRef = doc(db, "users", creatorId);

    await updateDoc(userRef, {
        gangId: gangRef.id
    });

    return {gangId: gangRef.id, userId: memberData.id};
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