import { db } from '../../firebase';
import { addDoc, collection, doc } from 'firebase/firestore';

export const addDeduction = (data) => {
    // Subcollection -> plotData/id/deductions/doc
    const ref = collection(db, "plotData", data.plotId, "deductions");
    return addDoc(ref, data);
}