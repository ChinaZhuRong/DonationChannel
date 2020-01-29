import React from "react";
import { connect } from "react-redux";
import { Badge, WingBlank, WhiteSpace, Card, Icon, Flex, Grid, Accordion, List, Checkbox } from "antd-mobile"
import './style.css'
import { hospitalActions, selectAllHospital } from "../../redux/hospitals";
import { bindActionCreators } from "redux";

const supplies = ["医用外科口罩", "n95口罩", "一次性医用口罩", "防护面罩", "防冲击眼罩", "防护目镜", "防护眼镜", "一次性医用帽子", "医学防护服", "手术衣", "反穿隔离衣", "医用一次性乳胶手套", "长袖橡胶手套", "长筒胶鞋", "防水防污染鞋套", "防污染靴",
  "酒精", "消毒液", "过氧乙酸", "皮肤消毒液", "测体温设备", "空气消毒设备", "医用紫外线消毒车"

];

@connect(mapStateToProps, mapDispatchToProps)
class Hospitals extends React.Component {

  componentDidMount() {
    this.props.searchHospital();
  }

  render() {
    const { hospitals, filter } = this.props;
    return (
        <div>
          <div>
            <Accordion>
              <Accordion.Panel header="物资列表">
                <List>
                  {filter.supplies.map(item => (
                      <Checkbox.CheckboxItem key={item.id}>{item.name}</Checkbox.CheckboxItem>
                  ))}
                </List>
              </Accordion.Panel>
            </Accordion>
          </div>
          <WhiteSpace />
          <div>
            <WingBlank size='md'>
              {hospitals.map(hospital =>
                  <Card className='hospital-card' key={hospital['区县']} full>
                    <Card.Header
                        title={<span style={{fontSize: '16px', textAlign: 'center', width: '100%'}}>{hospital['医院名称']}</span>}
                        // thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                        extra={<Badge text={hospital['区县']} />}
                    />
                    <Card.Body>
                      <Grid data={
                        Object.keys(hospital)
                            .filter(key => !['区县', '医院名称', '官方链接', '医院地址', '联系方式', '审核状态', '备注'].includes(key))
                            .filter(key => hospital[key])}
                          columnNum={2}
                          square={false}
                          hasLine={false}
                          renderItem={key => (
                              <div key={key} className='card-supplies'>
                                <div className='card-supplies-name'>{key}</div>
                                <WhiteSpace size='sm' />
                                <div className='card-supplies-number'>{hospital[key]}</div>
                              </div>
                          )}>
                      </Grid>
                    </Card.Body>
                    <Card.Footer content={
                      <Flex justify='end'>
                        <Flex.Item>
                          <div className='card-action-icon'>

                            <Icon size='md' type='check-circle-o' />
                          </div>
                        </Flex.Item>
                        <Flex.Item>
                          <div className='card-action-icon'>

                            <Icon size='md' type='ellipsis' />
                          </div>
                        </Flex.Item>
                      </Flex>
                    } />
                  </Card>
              )}
            </WingBlank>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hospitals: selectAllHospital(state.hospitals),
    filter: state.demand.filter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(hospitalActions, dispatch)
  };
}

export default Hospitals;
