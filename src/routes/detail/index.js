import React from "react";
import { connect } from "react-redux";
import { WhiteSpace, Card, Icon, List, Modal, NavBar } from "antd-mobile";
import { hospitalActions, selectHospitalById } from "../../redux/hospitals";
import { bindActionCreators } from "redux";
import "./style.css";
import copy_img from "../../assets/copy.png";
import phone_img from "../../assets/phone.png";

@connect(mapStateToProps, mapDispatchToProps)
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContactBox: false
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getHospitalDetail(id);
  }

  render() {
    const { hospital } = this.props;
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
                    {hospital["医院名称"]}
                  </h3>
                  <WhiteSpace />
                  <span className="detail-card-header-left-address">
                    地址： {hospital.address}
                  </span>
                </div>
                <div className="detail-card-header-right">
                  <span
                    className="detail-card-header-right-phone"
                    onClick={() => this.setState({ showContactBox: true })}
                  >
                    <img src={phone_img} alt="电话" />
                  </span>
                  <span className="detail-card-header-right-copy">
                    <img src={copy_img} alt="复制" />
                  </span>
                </div>
              </div>
            }
          />
          <Card.Body className="detail-card-body">
            {[1, 2, 3].map(i => (
              <div key={i} className="detail-card-body-category">
                <h4 className="detail-card-body-category-name">口罩</h4>
                <List className="detail-card-body-category-list">
                  {[1, 2, 3].map(i => (
                    <List.Item
                      key={i}
                      className="detail-card-body-category-list-item"
                      extra={
                        <span className="detail-card-body-category-list-item-count">
                          不限
                        </span>
                      }
                    >
                      n95防护口罩
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

function mapStateToProps(state, props) {
  return {
    hospital: state.hospitals.detail
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(hospitalActions, dispatch)
  };
}

export default Detail;
