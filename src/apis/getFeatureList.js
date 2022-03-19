import axios from "axios";

export const getFeatureList = async () => {
  return axios.get(`https://node.wingeat.com/test-api/features`);
};
