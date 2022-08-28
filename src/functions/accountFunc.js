// import {reactive} from 'vue';
import { getAuth,
// onAuthStateChanged,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
updateEmail,
updatePassword
} from 'firebase/auth';
import {updateDoc, getFirestore, doc, setDoc,getDoc,query,collection,getDocs } from 'firebase/firestore'
export default function(){
    
    const getMyUserData = async(userId)=>{
        const db = getFirestore();
        const docsnap = await getDoc(doc(db,'users',`${userId}`));
        return docsnap.data();
    }
    
    const getMyAccountData = ()=>{
        const auth = getAuth();
        const user = auth.currentUser;
        return user.email;
    }
    
    
    const getMyHistories =async(userId)=>{
        const db = getFirestore();
        const docsnap =await getDocs(query(collection(db,'users',`${userId}`,'histories')));
        const docs = [];
        await docsnap.forEach((doc)=>{
            docs.push(doc.data());
        })
        return docs;
    }
    
    
    const changeUserData =async(userId,username,icon)=>{
        const db = getFirestore();
        await updateDoc(doc(db,"users",`${userId}`),{
            userName:username,
            icon:icon
        })
    }
    
    
    const changeEmail = (email)=>{
        const auth = getAuth();
        updateEmail(auth.currentUser,email).then(()=>{
            alert("メールアドレスを更新しました！");
        }).catch((error)=>{
            console.log("Error updating user:",error);
        })
    }
    
    const changePassword =(password)=>{
        const auth =getAuth();
        updatePassword(auth.currentUser,password).then(()=>{
            alert("パスワードを更新しました！");
        }).catch((error)=>{
            console.log("Error updating user:",error);
        })
    }
    //ログイン処理（メアド、パスワード、ログイン後の処理）
    const logIn=(email,password,then)=>{
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email,password)
            .then((userCredential)=>{
                console.log("ログイン成功");
                alert("ログインしました！",);
                window.localStorage.setItem("userId",userCredential.user.uid);
                then();
            })
            .catch((error)=>{
                console.log(error);
                alert(error.message);
            });
    };
    
    const logout = (then)=>{
        const auth = getAuth();
                auth.signOut().then(()=>{
                    console.log("logout")
                    window.localStorage.removeItem("token");
                window.localStorage.removeItem("userId");
                then();
                })
    }
    //新規登録処理（メアド、パスワード、firestoreに登録するデータ、新規登録後の処理）
    const signUp =(email,password,userData,then)=>{
        const auth = getAuth();
        console.log("userData is:",userData);
        createUserWithEmailAndPassword(auth,email,password)
            .then((userCredential)=>{
                // 成功時の処理
                const user = userCredential.user;
                console.log("create user success."+user.uid);
                const db = getFirestore();
                const data = setDoc(doc(db, 'users',`${user.uid}`),{
                    userName:userData.name,
                    icon:"aiueo",
                    userId:user.uid,
                    extendedLifespan:0,
                })
                console.log(data)
                window.localStorage.setItem("userId",user.uid);
                then();
            })
            .catch((error)=>{
                // エラー時の処理
                alert(error.message);
                console.log(error);
            });
    }
    
    
    return {
        logIn,
        signUp,
        getMyUserData,
        getMyHistories,
        changeEmail,
        changePassword,
        changeUserData,
        getMyAccountData,
        logout
    }
}