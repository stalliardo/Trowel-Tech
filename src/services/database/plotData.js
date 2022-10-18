import { db } from '../../firebase';
import { doc, getDoc, setDoc, addDoc, collection, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export const getPlots = async (id) => {
    const docRef = doc(db, "plotData", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("data found");
        return docSnap.data();
    } else {
        console.log("no data found");
    }
}

// export const createGangDoc = async (formData) => {
//     const { firstName, lastName, memberType, dayRate, skill, creatorId, id } = formData;
//     const docRef = await addDoc(collection(db, "gangInformation"), {
//         creatorId,
//         members: arrayUnion({
//             id,
//             firstName,
//             lastName,
//             memberType,
//             dayRate,
//             skill
//         })
//     });

//     const userRef = doc(db, "users", creatorId);

//     await updateDoc(userRef, {
//         gangId: docRef.id
//     });

//     return docRef.id;
// }

// export const updateGangDoc = async (data) => {
//     const gangInformationRef = doc(db, "gangInformation", data.gangId);

//     await updateDoc(gangInformationRef, {
//         members: arrayUnion({...data.formData, id: data.id})
//     })
// }

// export const overwriteMembersArray = async (data) => {
//     const gangInformationRef = doc(db, "gangInformation", data.gangId);

//     await updateDoc(gangInformationRef, {
//         members: data.membersArray
//     })
// }

// export const deleteUser = async (data) => {
//     const docRef = doc(db, "gangInformation", data.id);

//     await updateDoc(docRef, {
//         members: arrayRemove(data.row)
//     })
// }

