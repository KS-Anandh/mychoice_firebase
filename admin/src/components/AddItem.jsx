import React from "react";
import Container from "./Container";
import { useState } from "react";
import axios from "axios";
import storage from "../config";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4 as uuidv4} from 'uuid'

const AddItem = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState(null);
  const [productCategory, setProductCategory] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productRating, setProductRating] = useState(null);
  const [image, setImage] = useState(null);
  const [productDesc, setProductDesc] = useState(null);
  const [isLoading,setIsLoading]=useState(false);

  const imageOnChange = (e) => {
    setImage(e.target.files[0]);
  };
  const getUrl = async () => {
    if (!image) return;
    const imageName = `${uuidv4()}_${image.name}`;
    const storageRef = ref(storage, `images/${imageName}`);
    var url;
    try {
      await uploadBytes(storageRef, image);
      url = await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed: " + error.message);
    }
    return url;
  };
  const sendToDB = async () => {
    try{
      setIsLoading(true);
      const url = await getUrl();
      await axios
        .post("http://localhost:9800/mychoice/product",{productName,productCategory,productPrice,productDesc,productRating,url})
        .then((res) => {
          setIsLoading(false);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
      }
    catch(err){
       console.log(err)
    }
   
  };
  return (
    <div className="container">
      <Container />
      <div className="addItem">
        <div className="imageUploader">
          <h2
            style={{
              padding: "20px",
              fontSize: "20px",
              color: "green",
              fontWeight: "700",
            }}
          >
            Add Product (MyChoice)
          </h2>
          <input
            type="text"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            placeholder="Product Name *"
          />
          <br />
          <input
            type="number"
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
            placeholder="Product price *"
          />
          <br />
          <input
            type="number"
            onChange={(e) => {
              setProductCategory(e.target.value);
            }}
            placeholder="Product category *"
          />
          <br />
          <input
            type="number"
            onChange={(e) => {
              setProductRating(e.target.value);
            }}
            placeholder="Product rating *"
          />
          <br />
          <input
            type="text"
            onChange={(e) => {
              setProductDesc(e.target.value);
            }}
            placeholder="Product desc *"
          />
          <br />
          <label htmlFor="image" className="label">
            {image? (
             <p>{image.name} <span style={{color:"red"}}> Change</span></p>
            ) : (
              <div className="file-label">upload</div>
            )}
          </label>
          <br />
          <input
            type="file"
            onChange={(e) => {
              imageOnChange(e);
            }}
            name="image"
            id="image"
          />
          <br />
          {
          isLoading?(<>
          <button className="submitBtn" style={{color:"white",background:"green",borderRadius:"10px",fontSize:"15px"}}>Loading...</button>
          </>):(<>
            <input type="submit" onClick={sendToDB} className="submitBtn" />
          </>
          )
         }

        </div>
      </div>
    </div>
  );
};

export default AddItem;
