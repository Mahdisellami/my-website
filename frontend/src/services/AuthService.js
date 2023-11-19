import http from "../http-common";

const verify = data => {
  return http.post("/auth", data);
};

const signup = data => {
  return http.post("/auth/signup", data);
};

const login = data => {
  return http.post("/auth/login", data);
};

const TruthsService = {
  verify,
  signup,
  login
};

export default TruthsService;