import {
  deleteDoc,
  onSnapshot,
  setDoc,
  getFirestore,
  doc,
  addDoc,
  //   getDoc,
  collection,
} from "firebase/firestore";
import accountFunc from "./accountFunc.js";

export default function () {
  //スナップショットするのかな（Room.vueで実行）
  const onMembersChage = (roomId) => {
    const db = getFirestore();
    let tmp = [];
    console.log("1tmp is:", tmp);
    onSnapshot(collection(db, "rooms", `${roomId}`, "roomMembers"), (docs) => {
      let tmp2 = [];
      console.log("snapshotted", tmp2);
      docs.forEach((doc) => {
        tmp2.push(doc.data());
      });
      console.log("snapshotted2", tmp2);
      tmp = tmp2;
      console.log("tmp is", tmp);
      return tmp;
    });
  };

  //作業を開始する際に実行するフロントの処理(Room.vueで実行)
  const startTask = (then) => {
    window.localStorage.setItem("currentExtendedLifespan", 10);
    window.localStorage.setItem("today", formatday(new Date()));

    //タイマーをスタートさせる処理
    then();
  };
  //
  const endTask = (userId, then) => {
    // const db = getFirestore();
    // const data = {
    //     count:window.localStorage.getItem("currentExtendedLifespan"),
    //     date:window.localStorage.getItem("today")
    // }
    // console.log("data is",data)
    // setDoc(collection(db,"users",`${userId}`,"histories"),data);
    window.localStorage.removeItem("currentExtendedLifespan");
    window.localStorage.removeItem("today");
    window.localStorage.removeItem("isAlone");
    window.localStorage.removeItem("roomId");
    then();
  };

  // window.onbeforeunload=function(){
  //     const isAlone = window.localStorage.getItem("isAlone");
  //     const userId = window.localStorage.getItem("userId");
  //     const roomId = window.localStorage.getItem("roomId");
  //     if(isAlone){
  //         endTask(userId,()=>{});
  //     }else{
  //         getOutRoom(userId,roomId,()=>{});
  //     }
  //     return null;
  // }

  //ルームさくせいするときに使用(複数人)
  const createRoom = async (userId, taskTime, restTime, then) => {
    const db = getFirestore();
    const { getMyUserData } = accountFunc();
    const user = {
      username: null,
      icon: null,
      extendedLifespan: null,
    };
    getMyUserData(userId).then((value) => {
      console.log("userData is", value);
      user.username = value.userName;
      user.icon = value.icon;
      user.extendedLifespan = value.extendedLifespan;
    });
    const docRef = await addDoc(collection(db, "rooms"), {
      ownerId: userId,
      restTime: restTime,
      taskTime: taskTime,
    });
    console.log("docid is:", docRef.id);
    await setDoc(doc(db, "rooms", `${docRef.id}`, "roomMembers", `${userId}`), {
      extendedLifespan: user.extendedLifespan,
      icon: user.icon,
      userId: userId,
      userName: user.username,
    });
    window.localStorage.setItem("roomId", docRef.id);
    window.localStorage.setItem("isAlone", false);
    then();
    // return docRef.id
  };

  //ルームを出る（複数人用）
  const getOutRoom = (userId, roomId, then) => {
    const db = getFirestore();
    deleteDoc(doc(db, "rooms", `${roomId}`, "roomMembers", `${userId}`));
    endTask(userId, () => {});
    then();
  };

  //自分が参加する時（複数人）
  const joinRoom = (roomId, userId, then) => {
    const db = getFirestore();
    const { getMyUserData } = accountFunc();
    const user = {
      username: null,
      icon: null,
      extendedLifespan: null,
    };
    getMyUserData(userId).then((value) => {
      console.log("userData is", value);
      user.username = value.userName;
      user.icon = value.icon;
      user.extendedLifespan = value.extendedLifespan;
      console.log("username", user.username);
      setDoc(doc(db, "rooms", `${roomId}`, "roomMembers", `${userId}`), {
        extendedLifespan: user.extendedLifespan,
        icon: user.icon,
        userId: userId,
        userName: user.username,
      });
      window.localStorage.setItem("roomId", roomId);
      window.localStorage.setItem("isAlone", false);
      then();
    });
  };

  //ルームに入る（一人）
  const gotoRoom = (then) => {
    window.localStorage.setItem("isAlone", true);
    then();
  };

  const formatday = (date) => {
    const formattedday = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    console.log("today is:", formattedday);
    return formattedday;
  };
  return {
    onMembersChage,
    startTask,
    endTask,
    createRoom,
    joinRoom,
    gotoRoom,
    getOutRoom,
  };
}
