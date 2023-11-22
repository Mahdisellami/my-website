import {
  CREATE_TRUTH,
  RETRIEVE_TRUTHS,
  UPDATE_TRUTH,
  DELETE_TRUTH,
  DELETE_ALL_TRUTHS,
} from "./types";

import TruthDataService from "../services/TruthsService";

export const createTruth = (text, singer) => async (dispatch) => {
  try {
    const res = await TruthDataService.create({ text, singer });

    dispatch({
      type: CREATE_TRUTH,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveTruths = () => async (dispatch) => {
  try {
    const res = await TruthDataService.getAll();

    dispatch({
      type: RETRIEVE_TRUTHS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTruth = (id, data) => async (dispatch) => {
  try {
    const res = await TruthDataService.update(id, data);

    dispatch({
      type: UPDATE_TRUTH,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteTruth = (id) => async (dispatch) => {
  try {
    await TruthDataService.remove(id);

    dispatch({
      type: DELETE_TRUTH,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllTruths = () => async (dispatch) => {
  try {
    const res = await TruthDataService.removeAll();

    dispatch({
      type: DELETE_ALL_TRUTHS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findTruthsBySinger = (singer) => async (dispatch) => {
  try {
    const res = await TruthDataService.findBySinger(singer);

    dispatch({
      type: RETRIEVE_TRUTHS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};