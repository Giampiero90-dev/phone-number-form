import React, { useState } from "react";
import './App.css';

const PHONE_SUBMISSION_API =
  "https://0ct5ps.sse.codesandbox.io/api/v1/trigger-pin";
const PIN_SUBMISSION_API =
  "https://0ct5ps.sse.codesandbox.io/api/v1/verify-pin";

function App() {
  const [val, setVal] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState("");
  const [userHasPin, setUserHasPin] = useState("");
  const [verified, setVerified] = useState("");
  const [error, setError] = useState(false);

  const setValue = (e) => {
    if (isNaN(e.target.value)) 
    {
      alert("Input entry must be only numbers");
      return false;
    }
    setVal(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(PHONE_SUBMISSION_API, {
      method: "POST",
      body: JSON.stringify({
        msisdn: val,
        user_id: "Giampiero",
        country: "NL",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.success)
        if(data.success === true) {
          setUserHasPin(true);
          setLoading(false);
          setPin(data.pin)
          console.log(data)
        } else {
          setError(true)
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const submitPinForm = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(PIN_SUBMISSION_API, {
      method: "POST",
      body: JSON.stringify({
        pin: pin,
        user_id: "Giampiero",
        country: "NL",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if(data.success === true) {
        setVerified(true);
        setLoading(false);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="form-container">
          {!userHasPin ? (
            <form onSubmit={submitForm}>
              <input
                placeholder="Insert your number"
                type="input"
                value={val}
                onChange={setValue}
              />
              <button type="submit">Submit</button>
            </form>
          ) : (
            <>
              {error ? (
                <div className="erorr"> Ops! Something went wrong </div>
              ) : (
                <></>
              )}
              {verified ? (
                <div>{verified ? <p>✅ Thank you! Your number has been verified</p> : <></>}</div>
              ) : (
                <form onSubmit={submitPinForm}>
                <p>Awesome! We already have inserted your pin for you, please submit.</p>
                <input
                  placeholder="Insert your PIN"
                  type="input"
                  value={pin}
                  onChange={setPin}
                />
                <button type="submit">Submit Pin</button>
              </form>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
