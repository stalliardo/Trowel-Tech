import { db } from '../../firebase';
import { doc, getDoc, getDocs, setDoc, addDoc, collection, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';

export const createGangDoc = async (formData) => {
    const { firstName, lastName, memberType, dayRate, skill, creatorId, id } = formData;
    const docRef = await addDoc(collection(db, "gangInformation"), {
        creatorId,
        members: arrayUnion({
            id,
            firstName,
            lastName,
            memberType,
            dayRate,
            skill
        })
    });

    const userRef = doc(db, "users", creatorId);

    await updateDoc(userRef, {
        gangId: docRef.id
    });

    return docRef.id;
}

export const updateGangDoc = async (data) => { // need to change this to use sub colection instaed of pain in the arse array
    const ref = collection(db, "gangInformation", data.gangId, "members");

    await addDoc(ref, {...data.formData, id: data.id});
}

export const overwriteMembersArray = async (data) => {
    const gangInformationRef = doc(db, "gangInformation", data.gangId);

    await updateDoc(gangInformationRef, {
        members: data.membersArray
    })
}

export const deleteUser = async (data) => {
    const ref = doc(db, "gangInformation", data.id, "members", data.row.id);

    console.log("deleet data = ", data);

    await deleteDoc(ref);
}

// export const getGangData = async (id) => {
//     const docRef = doc(db, "gangInformation", id);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//         return {...docSnap.data(), id};
//     }
// }

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