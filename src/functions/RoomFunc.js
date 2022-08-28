import {updateDoc,setDoc, getFirestore, doc, addDoc,getDoc,query,collection,getDocs } from 'firebase/firestore'
import accountFunc from "./accountFunc.js";


export default function(){
    
    //スナップショットするのかな
    const onMembersChage=(memberdata)=>{
        
    }
    
    //ルームさくせいするときに使用
    const createRoom = async(userId,taskTime,restTime)=>{
        const db = getFirestore();
        const docRef = await addDoc(doc(db, 'rooms'),{
            ownerId:userId,
            restTime:restTime,
            taskTime:taskTime,
        })
        console.log("docid is:",docRef.id);
        setDoc(doc(db,'rooms',`${docRef.id}`,'roomMembers'),{
            
        })
        return docRef.id
    }
    
    //自分が参加する時
    const joinRoom =async(roomId,userId)=>{
        const db = getFirestore();
        const {getMyUserData} = accountFunc();
        const user = {
            username:null,
            icon:null,
            extendedLifespan:null,
        }
        getMyUserData(this.user.userId).then((value)=>{
            console.log("userData is",value)
            user.username = value.userName;
            user.icon = value.icon;
            user.extendedLifespan = value.extendedLifespan;
        })
        await setDoc(doc(db,"rooms",`${roomId}`,"roomMembers",`${userId}`),{
            extendedLifespan:user.extendedLifespan,
            icon:user.icon,
            userId:userId,
            userName:user.username
        }) 
    }
    return {
        
    }
}