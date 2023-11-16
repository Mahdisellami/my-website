import http from "../http-common";

const getAll = () => {
  return http.get("/truths");
};

const get = id => {
  return http.get(`/truths/${id}`);
};

const create = data => {
  return http.post("/truths", data);
};

const update = (id, data) => {
  return http.put(`/truths/${id}`, data);
};

const remove = id => {
  return http.delete(`/truths/${id}`);
};

const removeAll = () => {
  return http.delete(`/truths`);
};

const findBySinger = singer => {
  return http.get(`/truths/bySinger?singer=${singer}`);
};

const TruthsService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findBySinger
};

export default TruthsService;