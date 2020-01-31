import { get, API_GET_HOSPITALS } from "../../utils/api";
// action
export const hospitalActions = {
  searchHospital(filter) {
    console.log("===发起请求===", filter.cityCode, filter.supplies);
    return dispatch =>
      get(API_GET_HOSPITALS, {
        city: "武汉" || filter.cityName,
        page: 1,
        size: 10
      }).then(res => dispatch(fetchHospitalsSuccess(res.data.data)));
  },
  getHospitalDetail(id) {
    console.log("===发起请求===", id);
    return dispatch =>
      get(`${API_GET_HOSPITALS}/${id}`).then(res =>
        dispatch(fetchHospitalDetailSuccess(res.data.data))
      );
  }
};

// action creator
function fetchHospitalsSuccess(data) {
  return {
    type: "FETCH_HOSPITALS_SUCCESS",
    data
  };
}

function fetchHospitalDetailSuccess(data) {
  return {
    type: "FETCH_HOSPITAL_DETAIL_SUCCESS",
    data
  };
}

//reducer
const initialState = {
  ids: [],
  byId: {}, // TODO: should be removed
  detail: {} // TODO: should return detail not length one list
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_HOSPITALS_SUCCESS":
      return { ...state, ...rebaseHospitalData(action.data) };
    case "FETCH_HOSPITAL_DETAIL_SUCCESS":
      return { ...state, detail: action.data.length && action.data[0] };
    default:
      return state;
  }
}

function rebaseHospitalData(remoteData) {
  let ids = [];
  let byId = {};
  remoteData.forEach(hospital => {
    ids.push(hospital["id"]);
    byId[hospital["id"]] = hospital;
  });
  return { ids, byId };
}

//selector

export function selectAllHospital(hospitals) {
  return hospitals.ids.map(id => hospitals.byId[id]);
}

export function selectHospitalById(hospitals, id) {
  return hospitals.byId[Number(id)] || {};
}
