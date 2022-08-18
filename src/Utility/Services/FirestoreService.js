import { empireDB } from "../Firestore";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  setDoc,
  addDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

async function getRoom(roomID) {
  if (roomID == "" || roomID == null) {
    return { error: "roomID empty" };
  }
  const docSnap = await getDoc(doc(empireDB, "room", roomID));
  if (docSnap.data() == null) {
    return { error: "Room " + roomID + " not Found" };
  }
  const results = { id: docSnap.id, ...docSnap.data() };

  return results;
}

async function getAllRooms() {
  const roomRef = collection(empireDB, "room");
  const q = query(roomRef);

  const querySnapshot = await getDocs(q);
  const results = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    results.push({ id: doc.id, ...doc.data() });
  });

  return results;
}

async function getAllNames(roomID) {
  if (roomID == "" || roomID == null) {
    return { error: "roomID empty" };
  }

  const roomRef = collection(empireDB, "name");
  const q = query(roomRef, where("roomID", "==", roomID));

  const querySnapshot = await getDocs(q);
  const results = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    results.push({ id: doc.id, ...doc.data() });
  });

  return results;
}

const subNames = (setStateFunction) => {
  const nameRef = collection(db, "name");
  //real time update
  onSnapshot(nameRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data());
    setStateFunction(data);
  });
};

async function addName(nameData) {
  nameData = { ...nameData, creationTstamp: Date.now() };
  const docRef = await addDoc(collection(empireDB, "name"), nameData);
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
}

async function addRoom(roomID) {
  const roomData = { creationTstamp: Date.now() };
  const docRef = await setDoc(doc(empireDB, "room", roomID), roomData);
  // console.log("Document written with ID: ", docRef.id);
  return docRef;
}

async function updateName(id, data) {
  const nameRef = doc(empireDB, "name", id);
  const result = setDoc(nameRef, data, { merge: true });
  return result;
}

async function deleteRoom(id) {
  const roomRef = collection(empireDB, "name");
  const q = query(roomRef, where("roomID", "==", id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    deleteName(doc.id);
  });

  const result = await deleteDoc(doc(empireDB, "room", id));

  return result;
}

async function deleteName(id) {
  const result = await deleteDoc(doc(empireDB, "name", id));
  return result;
}

export default {
  getRoom,
  getAllRooms,
  addRoom,
  deleteRoom,
  getAllNames,
  addName,
  updateName,
  deleteName,
  subNames,
};
