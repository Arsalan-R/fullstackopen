import { useState, forwardRef, useImperativeHandle } from "react";
import Button from '@mui/material/Button';

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const changeVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      changeVisibility,
    };
  });

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div className="toggle">
      <div style={hideWhenVisible}>
        <Button variant='contained' onClick={changeVisibility}>{props.buttonLable}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outlined" onClick={changeVisibility}>{props.HideLable}</Button>
      </div>
    </div>
  );
});

Toggleable.displayName = "Togglable";

export default Toggleable;
