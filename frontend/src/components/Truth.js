import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TruthsDataService from "../services/TruthsService";

const Truth = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialTruthState = {
    id: null,
    text: "",
    song: "",
    singer: ""
  };
  const [currentTruth, setCurrentTruth] = useState(initialTruthState);
  const [message, setMessage] = useState("");

  const getTruth = id => {
    TruthsDataService.get(id)
      .then(response => {
        setCurrentTruth(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getTruth(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTruth({ ...currentTruth, [name]: value });
  };

  const updateTruth = () => {
    TruthsDataService.update(currentTruth.id, currentTruth)
      .then(response => {
        console.log(response.data);
        setMessage("The truth was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTruth = () => {
    TruthsDataService.remove(currentTruth.id)
      .then(response => {
        console.log(response.data);
        navigate("/truths");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTruth ? (
        <div className="edit-form">
          <h4>Truth</h4>
          <form>
            <div className="form-group">
              <label htmlFor="text">Text</label>
              <input
                type="text"
                className="form-control"
                id="text"
                name="text"
                value={currentTruth.text}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="song">Song</label>
              <input
                type="song"
                className="form-control"
                id="song"
                name="song"
                value={currentTruth.song}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="singer">Singer</label>
              <input
                type="singer"
                className="form-control"
                id="singer"
                name="singer"
                value={currentTruth.singer}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteTruth}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTruth}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Truth...</p>
        </div>
      )}
    </div>
  );
};

export default Truth;