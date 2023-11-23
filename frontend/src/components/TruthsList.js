import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveTruths,
  findTruthsBySinger,
  deleteAllTruths,
} from "../actions/truths";
import { Link } from "react-router-dom";

const TruthsList = () => {
  const [currentTruth, setCurrentTruth] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchSinger, setSearchSinger] = useState("");

  const truths = useSelector(state => state.truths);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveTruths());
  }, []);

  const onChangeSearchSinger = e => {
    const searchSinger = e.target.value;
    setSearchSinger(searchSinger);
  };

  const refreshData = () => {
    setCurrentTruth(null);
    setCurrentIndex(-1);
  };

  const setActiveTruth = (truth, index) => {
    setCurrentTruth(truth);
    setCurrentIndex(index);
  };

  const removeAllTruths = () => {
    dispatch(deleteAllTruths())
      .then(response => {
        console.log(response);
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findBySinger = () => {
    refreshData();
    dispatch(findTruthsBySinger(searchSinger));
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
        {currentTruth ? (
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