import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, push } from 'firebase/database';

import { getFirebaseConfig } from './firebase-config';
import { studentCard } from './student-card';


const name= document.getElementById("name");
const code= document.getElementById("code");
const course= document.getElementById("course");
const registerBtn=document.getElementById("registerBtn");

const no_bonus=document.getElementById("no_bonus");
const silver_bonus=document.getElementById("silver_bonus");
const gold_bonus=document.getElementById("gold_bonus");



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

function getStudents(){
    const db = getDatabase();
    const dbRef =ref(db, 'students');
    onValue(dbRef, (snapshot) =>{
        const data = snapshot.val();
        updateStudents(data);
    });
}


function updateStudents(info){
    
    if (info) {
        no_bonus.innerHTML="";
        let title1=document.createElement("h1");
        title1.innerHTML="No Bonus"
        no_bonus.appendChild(title1);

        silver_bonus.innerHTML="";
        let title2=document.createElement("h1");
        title2.innerHTML="Silver Bonus +0.3";
        silver_bonus.appendChild(title2);

        gold_bonus.innerHTML="";
        let title3=document.createElement("h1");
        title3.innerHTML="Gold Bonus +0.5";
        gold_bonus.appendChild(title3);

        Object.keys(info).forEach((k, index)=>{
            //console.log(k, index);
            //console.log("Objeto", info[k]);
            
            const student = new studentCard(info[k]);
            if(info[k].bonus<=5){
                no_bonus.appendChild(student.render());
            }else if(info[k].bonus>5 && info[k].bonus<=10){
                silver_bonus.appendChild(student.render());
            }else if(info[k].bonus>10){
                gold_bonus.appendChild(student.render());
            }
           
           
        });

    } else {
        let noStudents1=document.createElement("p");
        noStudents1.innerHTML="No students here...";
        let noStudents2=document.createElement("p");
        noStudents2.innerHTML="No students here...";
        let noStudents3=document.createElement("p");
        noStudents3.innerHTML="No students here...";

        no_bonus.innerHTML="";
        let title1=document.createElement("h1");
        title1.innerHTML="No Bonus";
        no_bonus.appendChild(title1);
        no_bonus.appendChild(noStudents1);


        silver_bonus.innerHTML="";
        let title2=document.createElement("h1");
        title2.innerHTML="Silver Bonus +0.3";
        silver_bonus.appendChild(title2);
        silver_bonus.appendChild(noStudents2);

        gold_bonus.innerHTML="";
        let title3=document.createElement("h1");
        title3.innerHTML="Gold Bonus +0.5";
        gold_bonus.appendChild(title3);
        gold_bonus.appendChild(noStudents3);

    }
}



registerBtn.addEventListener("click", registerEvent);
getStudents();
