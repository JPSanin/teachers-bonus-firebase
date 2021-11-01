import { getDatabase, ref, set, onValue, push } from 'firebase/database';


export class studentCard{
    constructor(student){
        this.student = student;
    }

    render(){
       

        let studentCard = document.createElement("div");
        studentCard.className="student-card";

        let course=document.createElement("p");
        course.className="card-text";
        course.innerHTML=this.student.course;

        let name = document.createElement("h4");
        name.className = "card-text";
        name.innerHTML = this.student.name;

        let code= document.createElement('h4');
        code.className="card-text";
        code.innerHTML = this.student.code;

        
        let bonus= document.createElement('h4');
        bonus.className="card-text";
        bonus.innerHTML = this.student.bonus;

        let addPointsBtn=document.createElement('button');
        addPointsBtn.className = "add-button";
        addPointsBtn.innerHTML = "+";

        let deleteBtn=document.createElement('button');
        deleteBtn.className = "delete-button";
        deleteBtn.innerHTML = "x";

       
        addPointsBtn.addEventListener("click", (e, ev)=>{
            const db = getDatabase();
            const studentRef = ref(db,'students/'+this.student.id+'/bonus');
            set(studentRef,this.student.bonus+1);
        });

        deleteBtn.addEventListener("click", (e, ev)=>{
            const db = getDatabase();
            const studentRef = ref(db,'students/'+this.student.id);
            set(studentRef, null);
        });

        studentCard.appendChild(course);
        studentCard.appendChild(name);
        studentCard.appendChild(code);
        studentCard.appendChild(bonus);
       
        studentCard.appendChild(deleteBtn);
        studentCard.appendChild(addPointsBtn);

        return studentCard;
    }

    

}