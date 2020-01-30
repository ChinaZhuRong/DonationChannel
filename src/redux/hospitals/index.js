// action
export const hospitalActions = {
  searchHospital(cityCode, supplies) {
    console.log('===发起请求===',cityCode, supplies);
    return{
      type: 'FETCH_HOSPITALS_SUCCESS',
      data: [{
        "id": 1,
        "区县": "江汉区",
        "医院名称": "华中科技大学同济医学院附属协和医院",
        "普通医用口罩": 1,
        "医用外科口罩": 1,
        "医用防护口罩 | N95口罩": 1,
        "防冲击眼罩/护目镜/防护眼镜": 1,
        "防护面罩": 1,
        "防护帽/医用帽/圆帽": 1,
        "隔离衣": null,
        "防护服": 1,
        "手术衣": null,
        "乳胶手套": null,
        "长筒胶鞋/防污染靴": null,
        "防污染鞋套": null,
        "防污染靴套": null,
        "84消毒液": null,
        "过氧乙酸": null,
        "75%酒精": null,
        "手部皮肤消毒液": null,
        "活力碘": null,
        "床罩": null,
        "医用面罩式雾化器": null,
        "测体温设备": null,
        "空气消毒设备": null,
        "医用紫外线消毒车": null,
        "官方链接": "https://mp.weixin.qq.com/s/geO3CCd0_8B3L-r_xlBbZQ",
        "医院地址": "湖北省武汉市江汉区解放大道1277号华中科技大学同济医学院附属协和医院总务处",
        "联系方式": "13807138996 吕老师 13971115010 程老师  13477037766支老师",
        "备注": null,
        "审核状态": "已审核"
      },
        {
          "id": 2,
          "区县": "红安县",
          "医院名称": "红安县人民医院",
          "普通医用口罩": 1,
          "医用外科口罩": 1,
          "医用防护口罩 | N95口罩": 1,
          "防冲击眼罩/护目镜/防护眼镜": 1,
          "防护面罩": null,
          "防护帽/医用帽/圆帽": 1,
          "隔离衣": null,
          "防护服": 1,
          "手术衣": null,
          "乳胶手套": 1,
          "长筒胶鞋/防污染靴": 1,
          "防污染鞋套": 1,
          "防污染靴套": 1,
          "84消毒液": null,
          "过氧乙酸": null,
          "75%酒精": null,
          "手部皮肤消毒液": null,
          "活力碘": null,
          "床罩": null,
          "医用面罩式雾化器": null,
          "测体温设备": null,
          "空气消毒设备": null,
          "医用紫外线消毒车": null,
          "官方链接": "https://mp.weixin.qq.com/s/geO3CCd0_8B3L-r_xlBbZQ",
          "医院地址": "红安县人民医院红安县城关镇陵园大道附50号",
          "联系方式": "0713-5242320",
          "备注": "设备科周主任13636105950",
          "审核状态": "已审核"
        }]
    }
  }
};

//reducer
const initialState = {
  ids: [],
  byId: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_HOSPITALS_SUCCESS':
      return {...state, ...rebaseHospitalData(action.data)};
    default:
      return state;
  }
}

function rebaseHospitalData(remoteData) {
  let ids = [];
  let byId = {};
  remoteData.forEach(hospital => {
    ids.push(hospital['id']);
    byId[hospital['id']] = hospital;
  });
  return {ids, byId};
}

//selector

export function selectAllHospital(hospitals) {
  return hospitals.ids.map(id => hospitals.byId[id]);
}

export function selectHospitalById(hospitals, id) {
  return hospitals.byId[Number(id)] || {};
}
