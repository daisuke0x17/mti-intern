import {updateDoc,setDoc, getFirestore, doc, addDoc,getDoc,query,collection,getDocs } from 'firebase/firestore'

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
    const joinRoom =(roomId)=>{
        
    }
    return {
        
    }
}