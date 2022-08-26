// import {reactive} from 'vue';
import { getAuth, 
// onAuthStateChanged,
signInWithEmailAndPassword,
createUserWithEmailAndPassword
} from 'firebase/auth';
export default function(){
    
    //ログイン処理（メアド、パスワード、ログイン後の処理）
    const logIn=(email,password,then)=>{
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email,password)
            .then((userCredential)=>{
                console.log("ログイン成功");
                alert("ログインしました！");
                window.localStorage.setItem("userId",userCredential.user.uid);
                then();
            })
            .catch((error)=>{
                console.log(error);
                alert(error.message);
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
        signUp
    }
}