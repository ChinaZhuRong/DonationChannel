import React from "react";
import {
  Card,
  Icon,
  List,
  Modal,
  NavBar,
  Toast
} from "antd-mobile";
import "./style.css";
import { API_GET_HOSPITAL_BY_ID, get } from "../../utils/api";
import copy from "copy-to-clipboard";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContactBox: false,
      hospital: {}
    };
  }

  componentDidMount() {
    this.fetchHospitalById(this.props.match.params.id);
  }

  fetchHospitalById(id) {
    console.log("===fetchHospitalById,发起请求===", id);
    get(API_GET_HOSPITAL_BY_ID(id)).then(res =>
      this.setState({ hospital: res.data.data[0] })
    );
  }

  copyToClickBoard = (res, type) => {
    if (copy(res)) {
      Toast.success(`${type}已复制到粘贴板`);
    } else {
      Toast.fail("复制失败");
    }
  };

  render() {
    const { hospital } = this.state;
    if (!hospital || !Object.keys(hospital).length) {
      return "";
    }
    const supplyWithCategories = divideSuppliesIntoCategories(
      hospital.supplies
    );

    return (
      <div>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.push("/hospitals");
          }}
          mode="dark"
        >
          医院需求详情
        </NavBar>
        <Card className="detail-card" full>
          <Card.Header
            title={
              <div className="detail-card-header">
                <div className="detail-card-header-left">
                  <h3 className="detail-card-header-left-name">
                    {hospital.name}
                  </h3>

                  <div className="detail-card-header-left-address">
                    <p>地址： {hospital.address}</p>
                  </div>
                </div>
                <div className="detail-card-header-right">
                  <span
                    className="detail-card-header-right-phone"
                    onClick={() => this.setState({ showContactBox: true })}
                  >
                    <i className="ai-phone" />
                  </span>
                  <span className="detail-card-header-right-copy">
                    <i
                      className="ai-home"
                      onClick={() =>
                        this.copyToClickBoard(hospital.address, "医院地址")
                      }
                    />
                  </span>
                </div>
              </div>
            }
          />
          <Card.Body className="detail-card-body">
            {supplyWithCategories
              .filter(category => category.supplies.length)
              .map(category => (
                <div key={category.name} className="detail-card-body-category">
                  <h4 className="detail-card-body-category-name">
                    {category.name}
                  </h4>
                  <List className="detail-card-body-category-list">
                    {category.supplies.map(supply => (
                      <List.Item
                        key={supply.name}
                        className="detail-card-body-category-list-item"
                        extra={
                          <span className="detail-card-body-category-list-item-count">
                            {supply.count || "不限"}
                          </span>
                        }
                      >
                        {supply.name}
                      </List.Item>
                    ))}
                  </List>
                </div>
              ))}
          </Card.Body>
        </Card>
        <Modal
          visible={this.state.showContactBox}
          transparent
          maskClosable={false}
          onClose={() => this.setState({ showContactBox: false })}
          afterClose={() => this.copyToClickBoard(hospital.phone, "联系方式")}
          title=""
          footer={[
            {
              text: "我知道了",
              onPress: () => this.setState({ showContactBox: false })
            }
          ]}
        >
          <div>{hospital.phone}</div>
        </Modal>
      </div>
    );
  }
}

function divideSuppliesIntoCategories(supplies) {
  // TODO logic need to be complete or wait back-end return new structure
  const masks = [];
  const armors = [];
  const equipments = [];
  const others = [];
  supplies.forEach(supply => {
    const { name } = supply;
    if (name.includes("口罩")) {
      masks.push(supply);
    } else if (
        name.includes("眼") ||
        name.includes("帽") ||
        name.includes("面") ||
        name.includes("衣") ||
        name.includes("服")
    ) {
      armors.push(supply);
    } else if (name.includes("设备")) {
      equipments.push(supply);
    } else {
      others.push(supply);
    }
  });
  return [
    { name: "口罩", supplies: masks },
    { name: "防护", supplies: armors },
    { name: "医用设备", supplies: equipments },
    { name: "其他", supplies: others }
  ];
}

export default Detail;
