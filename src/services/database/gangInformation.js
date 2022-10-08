import { db } from '../../firebase';
import { doc, getDoc, setDoc, addDoc, collection, updateDoc } from 'firebase/firestore';

export const createNewGang = async(formData) => {
    const {firstName, lastName, memberType, dayRate, skill, creatorId, gangId} = formData;
    if(!gangId) {

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
    } else {
        const gangInformationRef = doc(db, "gangInformation", gangId);
        // update the exisiting ganginformation doc
        // await updateDoc(gangInformationRef, {
        //     members:
        // })
    }
}

export const getGangData = async(id) => {
    const docRef = doc(db, "gangInformation", id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
        console.log("doc exists. data = ", docSnap.data());
        return docSnap.data();
    }
}


// Calling add member should not create a new doc each time.
// Need to first check if a gang id has been provided
// if not create new gang, add the formData to the members array