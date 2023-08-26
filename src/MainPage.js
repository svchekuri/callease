import React, { useState } from "react";

const MainPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [savedNumbers, setSavedNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [callLog, setCallLog] = useState([]);
  const [isValid, setIsValid] = useState(true);

  // USA number format validation (including toll-free numbers)
  const validateNumber = (number) => {
    const regex =
      /^(?:\+?1[-.●]?)?\(?([2-9][0-8][0-9])\)?[-.●]?([2-9][0-9]{2})[-.●]?([0-9]{4})$/;
    return regex.test(number);
  };

  const addToLog = (message) => {
    setCallLog([...callLog, message]);
  };

  const initiateCall = () => {
    if (validateNumber(phoneNumber)) {
      setIsValid(true);
      setIsLoading(true);
      addToLog("Initiating call...");

      if (!savedNumbers.includes(phoneNumber)) {
        setSavedNumbers([...savedNumbers, phoneNumber]);
      }

      // Simulate the API call
      setTimeout(() => {
        setIsLoading(false);
        addToLog("Call connected.");
      }, 200000);
    } else {
      setIsValid(false);
      addToLog("Invalid number format.");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            CallEase
          </a>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-12">
            <div className="input-group mb-3">
              <input
                list="savedNumbers"
                type="text"
                className={`form-control ${isValid ? "" : "is-invalid"}`}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isLoading}
                placeholder="Please enter a phone number, ex: 1234567890"
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={initiateCall}
                disabled={isLoading}
              >
                {isLoading ? "Calling..." : "Call"}
              </button>
              <datalist id="savedNumbers">
                {savedNumbers.map((num, index) => (
                  <option key={index} value={num} />
                ))}
              </datalist>
            </div>
            {!isValid && (
              <small className="text-danger">
                Please enter a valid USA phone number.
              </small>
            )}

            {/* Call log section */}
            <div className="bg-dark text-white p-3">
              <h5 className="text-center">Call Log</h5>
              {callLog.map((log, index) => (
                <p key={index}>{log}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
