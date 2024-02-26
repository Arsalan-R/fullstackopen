import { useState, forwardRef, useImperativeHandle } from "react";

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
        <button onClick={changeVisibility}>{props.buttonLable}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={changeVisibility}>{props.HideLable}</button>
      </div>
    </div>
  );
});

Toggleable.displayName = "Togglable";

export default Toggleable;
