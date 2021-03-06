import { useState, useEffect } from "react";
import {
  ref,
  getStorage,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "./Firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import { v4 } from "uuid";
import "./index.css"
import { async } from "@firebase/util";
function Upload() {
  const firestore = firebase.firestore()
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [progess,setProgress] = useState(0)
  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    /*uploadBytes(imageRef,imageUpload).then(()=>{
      alert("Image UPloaded")
    })
  }*/
    
    uploadBytesResumable(imageRef, imageUpload).then((snapshot) => {
      const conprogress = Math.round((
        snapshot.bytesTransferred/snapshot.totalBytes
      )*100)
      setProgress(conprogress)
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url)
        setImageUrls((prev) => [...prev, url]);
        addToFirebase(url)
      });
    });
  };

  /*useEffect(() => {
    setImageUrls([])
   // const getdata = []
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log(url)
          //getdata.push(url)
          setImageUrls((prev)=>[...prev,url])
        });
        
      });
      //setImageUrls(getdata)
    });
  },[])*/


  function bro(){
    setImageUrls([])
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log(url)
          //getdata.push(url)
          setImageUrls((prev)=>[...prev,url])
        
        });
        
      });
      //setImageUrls(getdata)
    });
  }

  const addToFirebase=(url)=>{
    firestore.collection("images").add({
      Image:url
    })
  }
  
  return (
    <div className="Appop">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button className="btn btn-info" onClick={uploadFile}> Upload Image</button>
      <progess>Progress {progess} %</progess>
      <button className="btn btn-warning" onClick={bro}>Show All Images</button>
      {imageUrls.map((url) => {
        return <img src={url} />;
      })}
      {/*imageUrls.map((url) => {
        return <iframe src={url} style={{width:"50%",height:"500px"}}/>
      })*/}
      {/*<iframe src={url} 
      style={{width:"100%",height:"500px"}}>
      </iframe>*/}
  
    </div>
  );
}

export default Upload