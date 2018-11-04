import React from 'react';
import './FaceRecognition.css'; 

const FaceRecognition = ({imageUrl, box})=>{
    return(
        <div className='center ma'>
            <img id="inputImage" width = "500px" height ="auto" alt="" src={imageUrl}/>
            <div style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}} className="bounding_box"> </div>    
        </div>

    )
}

export default FaceRecognition 