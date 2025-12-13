let tableBody=document.querySelector("tbody")
let btn=document.getElementById("register-btn")

// Load data on page load
window.onload = () => {
    loadStudents();
};
// FORM SUBMIT EVENT
document.getElementById("studentForm").addEventListener("submit",(e)=>{
    e.preventDefault()
    addOrUpdateDetails()
})

let editIndex=null

// ADD OR UPDATE STUDENT
function addOrUpdateDetails(){
    let name=document.getElementById("student-name").value.trim()
    let id=document.getElementById("student-id").value.trim()
    let email=document.getElementById("student-email").value.trim()
    let contact=document.getElementById("student-contact").value.trim()
    if(!validateDetails(name,id,email,contact)){
        console.log("Validate details");
        
        return

    }
    
    let students = JSON.parse(localStorage.getItem("students")) || [];

    if(editIndex==null){
        students.push({name,id,email,contact})
    }
    else{
        students[editIndex]={name,id,email,contact}
        editIndex = null;
    }

    localStorage.setItem("students",JSON.stringify(students))
    
    loadStudents();
    document.getElementById("studentForm").reset();

}

// VALIDATION FUNCTION
function validateDetails(name,id,email,contact){
    if(!name && !id && !email && !contact){
        alert("Please fill all fields.");
        return false;
    }
    const nameRegex=/^[A-Za-z ]+$/
    const idRegex=/^[0-9]+$/
    const emailRegex=/^\S+@\S+\.\S+$/
    const contactRegex=/^[0-9]{10,}$/

    if(!nameRegex.test(name)){
        alert("Name must contain only characters.");
        return false;
    }
    if(!idRegex.test(id)){
        alert("Student ID must be numbers only.");
        return false;
    }
    if(!emailRegex.test(email)){
        alert("Enter a valid email.");
        return false;
    }
    if(!contactRegex.test(contact)){
        alert("Contact must be at least 10 digits.");
        return false;
    }
    return true
}

// DISPLAY STUDENTS IN TABLE
function loadStudents(){
    let students=JSON.parse(localStorage.getItem("students")) || []
    tableBody.innerHTML=""

    

    students.forEach((student,index)=>{
        let row=document.createElement("tr")

        row.innerHTML=`
             <td>${student.name}</td>
             <td>${student.id}</td>
             <td>${student.email}</td>
             <td>${student.contact}</td>
             <td>
                <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
             </td
            `
        tableBody.appendChild(row)
    })
    
    
    
}

// EDIT STUDENT
function editStudent(index){
    let students=JSON.parse(localStorage.getItem("students"))
    let s=students[index]
    document.getElementById("student-name").value=s.name
    document.getElementById("student-id").value=s.id
    document.getElementById("student-email").value=s.email
    document.getElementById("student-contact").value=s.contact

    editIndex=index
}

// DELETE STUDENT
function deleteStudent(index){
    let students=JSON.parse(localStorage.getItem("students"))
    students.splice(index,1)
    localStorage.setItem("students",JSON.stringify(students))

    loadStudents()
}

