import "./styles.css";
import {
  forwardRef,
  Fragment,
  useRef,
  useState,
  useImperativeHandle
} from "react";
export default function App() {
  const childRef = useRef(null);

  const onSave = (value) => {
    console.log(value, "parent");
  };

  const getChildFormStatus = () => {
    // checking if there the ref has value
    if (childRef.current) {
      console.log(childRef.current.getCurrentStatus());
    }
  };

  return (
    <div className="App">
      <h1>forwardRef ref useImperativeHandle</h1>
      <Form ref={childRef} onSave={onSave} />
      <button onClick={getChildFormStatus}>click from parent</button>
    </div>
  );
}

const Form = forwardRef(({ onSave }, ref) => {
  const info = {
    name: "",
    value: ""
  };
  const [state, setState] = useState(info);

  const handleSubmit = () => {
    onSave(state);
    setState(info);
  };

  useImperativeHandle(ref, () => ({
    getCurrentStatus: () => {
      return { state };
    }
  }));

  return (
    <Fragment>
      <label>name</label>
      <input
        type="text"
        value={state.name}
        onChange={(e) => setState({ ...state, name: e.target.value })}
      />
      <br />
      <label>value</label>
      <input
        type="text"
        value={state.value}
        onChange={(e) => setState({ ...state, value: e.target.value })}
      />
      <br />
      <button onClick={(e) => handleSubmit()}>click from Child</button>
    </Fragment>
  );
});
