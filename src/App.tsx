import "./styles.css";

import React from "react";

const App: React.FC = () => {
  /**
   * console whenever the component renders
   */
  console.debug("render: App");

  /**
   * useRefs
   */
  const nameRef = React.useRef<HTMLInputElement>(null);
  const ageRef = React.useRef<HTMLInputElement>(null);

  /**
   * useStates
   */
  const [subscribe, setSubscribe] = React.useState(false);

  /**
   * update state based on the checkbox `checked` attribute
   */
  const handleSubscribeChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setSubscribe(ev.target.checked);
    },
    []
  );

  /**
   * fetch & use values when required
   */
  const handleSubmit = React.useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      const input = {
        subscribe,
        age: ageRef.current?.value || undefined,
        name: nameRef.current?.value || undefined
      };
      console.debug(input);
    },
    [subscribe]
  );

  /**
   * when the form is reset, it will reset the states
   */
  const handleReset = React.useCallback(() => {
    setSubscribe(false);
  }, []);

  /**
   * returns/renders
   */
  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <label className="label">*Enter your name:</label>
      <input type="text" placeholder="Enter your name" ref={nameRef} required />
      <div className="flex">
        <input
          type="checkbox"
          id="inputSubscribe"
          checked={subscribe}
          onChange={handleSubscribeChange}
        />
        <label htmlFor="inputSubscribe">
          I want to subscribe to newsletter
        </label>
      </div>
      {subscribe && (
        <div className="flex">
          <label>Enter your age: </label>
          <input
            type="number"
            placeholder="Age"
            min={0}
            max={100}
            ref={ageRef}
          />
        </div>
      )}
      <div className="flex">
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
};

export default App;
