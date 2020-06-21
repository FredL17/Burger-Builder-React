import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerbuilder-5437d.firebaseio.com/"
});

export default instance;
