const backendDomain = "http://localhost:8000";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  userDetails: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logoutUser: {
    url: `${backendDomain}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/all-users`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
};

export default SummaryApi;
