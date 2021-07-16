import axios from "axios";
import { BASE_URL } from "./Base";

export const getArtistByName = (name) => {
  return axios.get(`${BASE_URL}/artists/${name}?app_id=abc`, {
    ["axios-retry"]: {
      retries: 2,
    },
  });
};

export const getEventsByName = (name) => {
  return axios.get(`${BASE_URL}/artists/${name}/events?app_id=abc&date=all`, {
    ["axios-retry"]: {
      retries: 2,
    },
  });
};
