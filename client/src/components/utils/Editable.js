import React, { useState, useEffect } from "react";

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const Editable = ({
  text,
  type,
  placeholder,
  children,
  childRef,
  handleBlur,
  ...props
}) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
  // Exercise: It can be made dynamic by accepting initial state as props outside the component
  const [isEditing, setEditing] = useState(false);
  /* 
    using use effect, when isEditing state is changing, check whether it is set to true, if true, then focus on the reference element
  */
  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const confirmKeys = ["Enter", "Tab"];

    /* 
    - For textarea, check only Escape and Tab key and set the state to false
    - For everything else, all three keys will set the state to false
  */
    if (confirmKeys.indexOf(key) > -1) {
      //   console.log(event.target);
      handleBlur(event.target);
      setEditing(false);
    } else if (key === "Escape") {
      //   children.props.value = text;
      setEditing(false);
    }
  };

  /*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
*/
  return (
    <div {...props} className="editable-input">
      {isEditing ? (
        <div
          onBlur={e => {
            setEditing(false);
            handleBlur(e.target);
          }}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div onDoubleClick={() => setEditing(true)}>
          {placeholder}:{" "}
          <span>{text || placeholder || "Editable content"}</span>
        </div>
      )}
    </div>
  );
};
export default Editable;
