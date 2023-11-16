import React, { useState, useEffect } from "react";
import TruthsDataService from "../services/TruthsService";
import { Link } from "react-router-dom";

const TruthsList = () => {
  const [truths, setTruths] = useState([]);
  const [currentTruth, setCurrentTruth] = useState({});
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchSinger, setSearchSinger] = useState("");

  useEffect(() => {
    retrieveTruths();
  }, []);

  const onChangeSearchSinger = e => {
    const searchSinger = e.target.value;
    setSearchSinger(searchSinger);
  };

  const retrieveTruths = () => {
    TruthsDataService.getAll()
      .then(response => {
        setTruths(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTruths();
    setCurrentTruth({});
    setCurrentIndex(-1);
  };

  const setActiveTruth = (truth, index) => {
    setCurrentTruth(truth);
    setCurrentIndex(index);
  };

  const removeAllTruths = () => {
    TruthsDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findBySinger = () => {
    TruthsDataService.findBySinger(searchSinger)
      .then(response => {
        setTruths(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by singer"
            value={searchSinger}
            onChange={onChangeSearchSinger}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findBySinger}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Truths List</h4>

        <ul className="list-group">
          {truths &&
            truths.map((truth, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTruth(truth, index)}
                key={index}
              >
                {truth.text}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTruths}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {truths ? (
          <div>
            <h4>Truth</h4>
            <div>
              <label>
                <strong>Text:</strong>
              </label>{" "}
              {currentTruth.text}
            </div>
            <div>
              <label>
                <strong>Song:</strong>
              </label>{" "}
              {currentTruth.song}
            </div>
            <div>
              <label>
                <strong>Singer:</strong>
              </label>{" "}
              {currentTruth.singer}
            </div>

            <Link
              to={"/truths/" + currentTruth.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Truth...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TruthsList;