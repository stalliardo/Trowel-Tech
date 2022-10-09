import { db } from '../../firebase';
import { doc, getDoc, setDoc, addDoc, collection, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export const createGangDoc = async (formData) => {
    const { firstName, lastName, memberType, dayRate, skill, creatorId } = formData;

    console.log("Form Data from create doc = ", formData);

    const docRef = await addDoc(collection(db, "gangInformation"), {
        creatorId,
        members: [
            {
                firstName,
                lastName,
                memberType,
                dayRate,
                skill
            }
        ]
    });

    const userRef = doc(db, "users", creatorId);

    await updateDoc(userRef, {
        gangId: docRef.id
    });

    return docRef.id;
}

export const updateGangDoc = async (data) => {
    console.log("UPDATE SERVICE CALLED. Data = ", data);
    const gangInformationRef = doc(db, "gangInformation", data.gangId);

    await updateDoc(gangInformationRef, {
        members: arrayUnion(data.formData)
    })
   

    // https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array <- for updating arrays
}

export const deleteUser = async (data) => {
    const docRef = doc(db, "gangInformation", data.id);

    await updateDoc(docRef, {
        members: arrayRemove(data.row)
    })
}

export const getGangData = async (id) => {
    const docRef = doc(db, "gangInformation", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("doc exists. data = ", docSnap.data());
        return docSnap.data();
    }
}

// Need seperate functions for
    // Create
    // Update
    // Delete