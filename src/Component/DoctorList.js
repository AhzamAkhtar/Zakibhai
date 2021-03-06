import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  updateDoc,
    getDoc,
    doc,
  collection,
  query,
  where,
  getDocs,
  Firestore,
  Timestamp,
} from "firebase/firestore";
import TypeofAssistance from "../TypeofAssistance";
import Spinner from "./Spinner";
import { Delete } from "@mui/icons-material";
firebase.initializeApp({
  apiKey: "AIzaSyBm0kPsibJol7yD3hIegei2uyWvkf9Jrgk",
  authDomain: "zakibhai-82e1f.firebaseapp.com",
  projectId: "zakibhai-82e1f",
  storageBucket: "zakibhai-82e1f.appspot.com",
  messagingSenderId: "304819231340",
  appId: "1:304819231340:web:138ecefa39bb0880455649",
  measurementId: "G-S3DTS3N8Y0",
});
const firestore = firebase.firestore();
const Allappointment = () => {
  const [first,setfirst] = useState("Doctor")
  const [second,setsecond] = useState("True")
  const [Filter,setFilter] = useState([])
  const [Admin,setAdmin] = useState()
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscribers = firestore
      .collection("Doctors")
      .where(`${first}`,"==",`${second}`)
      .onSnapshot((quearySnapshot) => {
        quearySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({ ...doc.data(), key: doc.id });
        });
        setPosts(getPostsFromFirebase);
        console.log(getPostsFromFirebase)
        setLoading(false);
      });

    return () => subscribers();
  },[first,second]);

  

 const checkforadmin=()=>{
  const tt= firestore.collection("Admin").doc("FjPti0vk37bwqH9bFMHI").get().then(dooc=>{
    console.log(dooc.data().Passward)
    setAdmin(dooc.data().Passward)
  })
  //const rr = Object.values(tt)
 }
 //checkforadmin()
 //console.log(Admin)
 /**useEffect(()=>{
  async function filter(){
    const filterArray = []
    const q = query(collection(firestore,"Patients"),where("AppointmentTime","==","14:00"));
    const quearySnapshot = await getDocs(q)
    quearySnapshot.forEach((doc)=>{
      filterArray.push({...doc.data()})
      console.log(doc.data())
    })
    setFilter(filterArray)
  }
  filter()
 },[])*/



const nc=()=>{
  setfirst("Specialty")
  setsecond("Nutrition Counselling")
}
const gn=()=>{
  setfirst("Specialty")
  setsecond("General Medicine")
}
const cp=()=>{
  setfirst("Specialty")
  setsecond("Consultant Physician")
}
const gy=()=>{
  setfirst("Specialty")
  setsecond("Gynecology")
}
const ped=()=>{
  setfirst("Specialty")
  setsecond("Pediatrics")
}
const der=()=>{
  setfirst("Specialty")
  setsecond("Dermatology")
}
const orth=()=>{
  setfirst("Specialty")
  setsecond("Orthopedics")
}
const psy=()=>{
  setfirst("Specialty")
  setsecond("Psychiatry")
}
const all=()=>{
  setfirst("Doctor")
  setsecond("True")
}


/*async function edit(idforEdit){
  const docRef = doc(firestore,"Patients",idforEdit)
  await updateDoc(docRef,{
    "Appointment":"False"
  })
}*/

  if (loading) {
    return <Spinner/>
  }
  return (
    <>
    <div className="container my-5">
    <button onClick={all} className="mx-2 my-3 btn btn-info" >All</button>
    <button onClick={nc} className="mx-2 my-3 btn btn-info" >Nutrition Counselling</button>
    <button onClick={gn} className="mx-2 my-3 btn btn-info">General Medicine</button>
    <button onClick={cp} className="mx-2 my-3 btn btn-info">Consultant Physician</button>
    <button onClick={gy} className="mx-2 my-3 btn btn-info">Gynecology</button>
    <button onClick={ped} className="mx-2 my-3 btn btn-info">Pediatrics</button>
    <button onClick={der} className="mx-2 my-3 btn btn-info">Dermatology</button>
    <button onClick={orth} className="mx-2 my-3 btn btn-info">Orthopedics</button>
    <button onClick={psy} className="mx-2 my-3 btn btn-info">Psychiatry</button>
    <>
    <div className="row" style={{border:"2px"}}>
      {posts.length > 0 ? (
        posts.map((item,index) => {
          return (
            <>
            <div className="col-md-3 my-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title" style={{color:"green"}}>{"Doctor Name : "+item.FirestName} {item.LastName}</h5>
                  <h6 class="card-title" style={{color:"red"}}>{"No of Appointment For Today  : "+item.NoOFAppointment}</h6>
                  <h6 class="card-title" style={{color:"skyblue"}}>{"Doctor Name : "+item.Email}</h6>
                  <h6 class="card-title" style={{color:"skyblue"}}>{"Specialty : "+item.Specialty}</h6>
                  
                
                </div>
              </div>
              </div>
            </>
          );
        })
      ) : (
        <h1>NO Data</h1>
      )}
      </div>
    </>
    </div>
    </>
  );
};
export default Allappointment;
