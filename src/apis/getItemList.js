import axios from "axios";

export const getItemList = async ({ pageNumber = 1 }) => {
  return axios.get(
    `https://node.wingeat.com/test-api/items?page=${pageNumber}`
  );
};
