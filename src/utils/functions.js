import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
const db = getFirestore();

export const createRoom = (obj) => {
  const id = new Date().getTime().toString();

  return new Promise((resolve, reject) => {
    const payload = { ...obj, id, timestamp: serverTimestamp() };

    setDoc(doc(db, "games", id), payload)
      .then(() => resolve({ roomID: id }))
      .catch((error) => reject(error));
  });
};

export const joinRoom = async (roomID, name) => {
  const docRef = doc(db, "games", roomID);
  const docSnap = await getDoc(docRef);

  let gameObj = docSnap?.data?.();

  // see which player is already in the room then enter another player accordingly
  if (gameObj.player_one) gameObj.player_two = name;
  else gameObj.player_one = name;

  return new Promise((resolve, reject) => {
    const docRef = doc(db, "games", roomID);
    const payload = { ...gameObj, updatedTimestamp: serverTimestamp() };

    updateDoc(docRef, payload)
      .then(() => resolve({ roomID }))
      .catch((error) => reject(error));
  });
};

export const getGameRoom = (id, callback) => {
  const unsub = onSnapshot(doc(db, "games", id), (doc) => {
    const data = doc.data();
    if (callback) callback(data);
  });

  return unsub;
};

export const updateGameBoard = (board, id) => {
  const docRef = doc(db, "games", id);
  const payload = { board, updatedTimestamp: serverTimestamp() };

  updateDoc(docRef, payload);
};

export const changeGameTurn = (turn, id) => {
  const docRef = doc(db, "games", id);
  const payload = { turn, updatedTimestamp: serverTimestamp() };

  updateDoc(docRef, payload);
};
