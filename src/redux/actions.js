import {
  GET_DATA,
  UPDATE_COUNT,
} from './constants';

export const getNames = (num) => {
  const url = `https://randomuser.me/api/?results=${num}&seed=rx-react&nat=us&inc=name&noinfo`;
  const request = fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.log('err.response', err);
      return err;
    })

  return {
    type: GET_DATA,
    payload: request
  };
};

export const udpateCount = count => {
  return {
    type: UPDATE_COUNT,
    payload: count
  };
}