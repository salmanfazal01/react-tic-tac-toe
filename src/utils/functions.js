import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  collection,
  where,
  limit,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { calculateWinner } from "./game";
const db = getFirestore();

export const DEFAULT_BOARD = Array(9).fill(0);

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
  let gameObj = null;
  if (roomID) {
    const q = doc(db, "games", roomID);
    const docSnap = await getDoc(q);
    gameObj = docSnap?.data?.();
  } else {
    const q = query(
      collection(db, "games"),
      where("random", "==", true),
      limit(1)
    );
    const docSnap = await getDocs(q);
    gameObj = docSnap?.docs?.[0]?.data();
  }

  return new Promise((resolve, reject) => {
    if (!gameObj?.id && !roomID)
      reject({
        error: "NO_GAME",
        message:
          "No Game Available! Start a new game and wait for someone to join.",
      });
    if (!gameObj?.id)
      reject({
        error: "NOT_FOUND",
        message: "Game Not Found. Please check your game ID again.",
      });

    const _id = gameObj.id;

    gameObj.player_two = name === gameObj.player_one ? name + " 2" : name;
    gameObj.random = false;

    const docRef = doc(db, "games", _id);
    const payload = { ...gameObj, updatedTimestamp: serverTimestamp() };

    updateDoc(docRef, payload)
      .then(() => resolve({ roomID: _id, username: gameObj.player_two }))
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

export const updateGameBoard = (board, id, room) => {
  const docRef = doc(db, "games", id);
  const payload = { board, updatedTimestamp: serverTimestamp() };

  const _winner = calculateWinner(board);
  if (_winner?.player) updateGameWinner(_winner?.player, id, room);

  updateDoc(docRef, payload);
};

export const changeGameTurn = (turn, id) => {
  const docRef = doc(db, "games", id);
  const payload = { turn, updatedTimestamp: serverTimestamp() };

  updateDoc(docRef, payload);
};

export const updateGameWinner = (winner, id, room) => {
  const docRef = doc(db, "games", id);

  const p1Wins = room.player_one_wins || 0;
  const p2Wins = room.player_two_wins || 0;
  const draws = room.draws || 0;

  const payload = {
    updatedTimestamp: serverTimestamp(),
    player_one_wins: winner === "X" ? p1Wins + 1 : p1Wins,
    player_two_wins: winner === "O" ? p2Wins + 1 : p2Wins,
    draws: winner === "D" ? draws + 1 : draws,
    game_over: true,
    winner:
      winner === "X"
        ? room.player_one
        : winner === "O"
        ? room.player_two
        : false,
    draw: winner === "D",
  };

  updateDoc(docRef, payload);
};

export const setNewGame = (id, first_turn) => {
  const docRef = doc(db, "games", id);
  const payload = {
    board: DEFAULT_BOARD,
    first_turn,
    turn: first_turn,
    game_over: false,
    draw: false,
    winner: false,
    updatedTimestamp: serverTimestamp(),
  };

  updateDoc(docRef, payload);
};
