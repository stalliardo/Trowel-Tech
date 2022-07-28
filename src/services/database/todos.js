import  { db } from '../../firebase';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const todoCollectionRef = collection(db, "todos");

export const getTodos = () => {
    return getDocs(collection(db, "todos"));
}

export const addTodo = (newTodo) => {
    console.log('add calle');
    
    return addDoc(todoCollectionRef, newTodo);
}

export const updateTodo = (id, updatedTodo) => {
    const todoDoc = doc(db, "todos", id);

    return updateDoc(todoDoc, updatedTodo);
}