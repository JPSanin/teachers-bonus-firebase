const firebaseConfig = {
    apiKey: "AIzaSyAd-tEjkwEmoF7XYLsMEua27wxfpAhOKls",
    authDomain: "teachers-bonus.firebaseapp.com",
    projectId: "teachers-bonus",
    storageBucket: "teachers-bonus.appspot.com",
    messagingSenderId: "718746267309",
    appId: "1:718746267309:web:2d1648621e4a5e7ce3a024"
};

export function getFirebaseConfig(){
    if (!firebaseConfig || !firebaseConfig.apiKey){
        throw new Error("Firebase configuration error");
    } else {
        return firebaseConfig;
    }
}