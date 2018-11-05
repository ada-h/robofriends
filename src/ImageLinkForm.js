import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onSubmit})=>{
    return(
        <div>
            <p className="f3"> Muhahahha! Roll a die, it's a Dare!. 
                i'll detect the faces on your pictures. if i can't, it's a bot!
            </p>
            <div className= "center">
                <div className="pa4 br3 shadow-5 form center">
                    <input className="f4 pa2 w-70 center" type="text" onChange= {onInputChange}></input>
                    <button className="w-30 grow f4 link ph3 dib white bg-light-purple" type="submit" onClick={onSubmit}> Detect </button>
                </div>
            </div>            
        </div>
    )
}
export default ImageLinkForm