import { useState } from "react";

const Toggleable = (props) => {
    const [visible, setVisible] = useState(false)

    const changeVisibility = () =>{
        setVisible(!visible)
    }

    const hideWhenVisible = {display : visible? 'none' : ''}
    const showWhenVisible = {display : visible? '' : 'none'}

    return(
        <div>
            <div style={hideWhenVisible}>
            <button onClick={changeVisibility}>{props.buttonLable}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={changeVisibility}>Cancel</button>
            </div>     
        </div>
    )
}

export default Toggleable