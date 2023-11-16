import React, { useState } from "react";
import TruthsDataService from "../services/TruthsService";

const AddTruth = () => {
  const initialTruthState = {
    id: null,
    text: "",
    song: "",
    singer: ""
  };
  const [truth, setTruth] = useState(initialTruthState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTruth({ ...truth, [name]: value });
  };

  const saveTruth = () => {
    var data = {
      text: truth.text,
      song: truth.song,
      singer: truth.singer
    };

    TruthsDataService.create(data)
      .then(response => {
        setTruth({
          id: response.data.id,
          text: response.data.text,
          song: response.data.song,
          singer: response.data.singer
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTruth = () => {
    setTruth(initialTruthState);
    setSubmitted(false);
  };

return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTruth}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              className="form-control"
              id="text"
              required
              value={truth.text}
              onChange={handleInputChange}
              name="text"
            />
          </div>

          <div className="form-group">
            <label htmlFor="song">Song</label>
            <input
              type="text"
              className="form-control"
              id="song"
              value={truth.song}
              onChange={handleInputChange}
              name="song"
            />
          </div>

          <div className="form-group">
            <label htmlFor="singer">Singer</label>
            <input
              type="text"
              className="form-control"
              id="singer"
              required
              value={truth.singer}
              onChange={handleInputChange}
              name="singer"
            />
          </div>

          <button onClick={saveTruth} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTruth;