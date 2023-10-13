import axios from "../utils/axios-customize";

export const callRegister = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};

export const callLogin = (username, password) => {
  return axios.post("/api/v1/auth/login", { username, password });
};

export const callFetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};

export const callLogout = () => {
  return axios.post("/api/v1/auth/logout");
};

export const callFetchListUser = (query) => {
  // current=1&pageSize=3
  return axios.get(`/api/v1/user?${query}`);
};

export const callCreateAUser = (fullName, email, password, phone) => {
  return axios.post(`/api/v1/user`, { fullName, email, password, phone });
};

export const callBulkCreateUser = (data) => {
  // console.log("check api data >>>", data);
  return axios.post("/api/v1/user/bulk-create", data);
};

export const callUpdateUser = (_id, fullName, phone, avatar) => {
  return axios.put("/api/v1/user", { _id, fullName, phone, avatar });
};

export const callDeleteUser = (id) => {
  return axios.delete(`/api/v1/user/${id}`);
};

// book
export const callListBook = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

export const callCreateABook = (
  mainText,
  author,
  price,
  sold,
  quantity,
  category,
  thumbnail,
  slider
) => {
  return axios.post(`/api/v1/book`, {
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
    thumbnail,
    slider,
  });
};

export const callFetchCategory = () => {
  return axios.get("/api/v1/database/category");
};

export const callUploadBookImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};

export const callUpdateBook = (
  _id,
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.put(`/api/v1/book/${_id}`, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  });
};

export const callDeleteBook = (id) => {
  return axios.delete(`/api/v1/book/${id}`);
};

export const callFetchListBook = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

export const callFetchBookById = (id) => {
  return axios.get(`/api/v1/book/${id}`);
};

export const callPlaceOrder = (data) => {
  return axios.post("/api/v1/order", {
    ...data,
  });
};

export const callHistoryOrder = () => {
  return axios.get("/api/v1/history");
};

export const callUpdateAvatar = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "avatar",
    },
  });
};

export const callUpdateUserInfo = (_id, phone, fullName, avatar) => {
  return axios.put("/api/v1/user", {
    _id,
    phone,
    fullName,
    avatar,
  });
};

export const callUpdatePassword = (email, oldpass, newpass) => {
  return axios.post("/api/v1/user/change-password", {
    email,
    oldpass,
    newpass,
  });
};

export const doPlaceOrderAction = () => {};

// http://localhost:8080/api/v1/database/dashboard
export const callFetchDashboard = () => {
  return axios.get("/api/v1/database/dashboard");
};

// http://localhost:8080/api/v1/order?current=1&pageSize=10
export const callListOrder = (query) => {
  return axios.get(`/api/v1/order?${query}`);
};
