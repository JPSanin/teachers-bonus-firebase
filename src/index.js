import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, push } from 'firebase/database';

import { getFirebaseConfig } from './firebase-config';


const name= document.getElementById("name");
const code= document.getElementById("code");
const course= document.getElementById("course");
const registerBtn=document.getElementById("registerBtn");


const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);

function registerStudents(student){
    const db = getDatabase();
    const newStudentRef = push(ref(db, 'students'));
    student["id"] = newStudentRef.key
    set(newStudentRef, student);
}

const registerEvent= (e,event)=>{
    const student={
        name:name.value,
        code: code.value,
        course: course.value,
        bonus: 0
    }
    registerStudents(student);
    name.value="";
    code.value="";
    course.value="";
    
}

registerBtn.addEventListener("click", registerEvent);
