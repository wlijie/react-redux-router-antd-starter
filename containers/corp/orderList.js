import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as Actions from '../../actions/corp/orderList'

import { Table, Button, Select, Icon, Form, Input, Tabs, Row, Col, DatePicker, Radio, Tag, Tooltip } from 'antd';
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


const AdvancedSearchForm  = Form.create()(React.createClass({
  handleSearch (e) {
    e.preventDefault();
    this.pageSearch();
    let fieldsValue = this.pageSearch();
    this.props.query(null,fieldsValue);
  },
  checkMonthlyFeeSet(e) {
    let fieldsValue = this.pageSearch();
    this.props.downSelect(fieldsValue); 
  },
  pageSearch(params){
    let values = {};
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      for(let i in fieldsValue){
        if(fieldsValue[i] instanceof Array && fieldsValue[i].length){
          fieldsValue[i] = [fieldsValue[i][0].format('YYYY-MM-DD'), fieldsValue[i][1].format('YYYY-MM-DD')];
          switch(i){
            case 'contest_order_date':
              fieldsValue['start'] = fieldsValue[i][0];
              fieldsValue['end'] = fieldsValue[i][1];
              delete fieldsValue[i];
              break;
            case 'contest_pay_date':
              fieldsValue['pay_start'] = fieldsValue[i][0];
              fieldsValue['pay_end'] = fieldsValue[i][1];
              delete fieldsValue[i];
              break;
            case 'venue_order_date':
              fieldsValue['start'] = fieldsValue[i][0];
              fieldsValue['end'] = fieldsValue[i][1];
              delete fieldsValue[i];
              break;
            case 'venue_pay_date':
              fieldsValue['pay_start'] = fieldsValue[i][0];
              fieldsValue['pay_end'] = fieldsValue[i][1];
              delete fieldsValue[i];
              break;
            default:
          };
        }
        if(typeof(fieldsValue[i]) == "undefined" || fieldsValue[i] == ''){
          delete fieldsValue[i];
        }
      }
      fieldsValue['page'] = 1;
      if(params){
       fieldsValue = Object.assign(fieldsValue,params);
      }
      values = fieldsValue;
    });
    return values;
  },
  handleReset () {
    this.props.form.resetFields();
  },
  pageJumpOrder(params){
    let fieldsValue = this.pageSearch(params);
    this.props.query(null,fieldsValue);
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const { venue_item_list, sales_order_channel, order_pay_statelist, charge_type_list, tabsActiveKey, expand ,data, loading, total, size, page} = this.props.data;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    //搜索条件
    const venueSearchRequirement = [
          {
            'type':'input',
            'name':'订单号',
            'fieldDecorator':'order_sn',
            'required':false,
          }, {
            'type':'input',
            'name':'企业名称',
            'fieldDecorator':'corp_full_name',
            'required':false,
          }, {
            'type':'input',
            'name':'微信订单号',
            'fieldDecorator':'transaction_id',
            'required':false,
          }, {
            'type':'input',
            'name':'企业号',
            'fieldDecorator':'corp_name',
            'required':false,
          }, {
            'type':'input',
            'name':'服务号',
            'fieldDecorator':'app_name',
            'required':false,
          }, {
            'type':'select',
            'name':'项目',
            'fieldDecorator':'types',
            'children':venue_item_list,
            'required':false,
          }, {
            'type':'select',
            'name':'收款方式',
            'fieldDecorator':'corp_charge_type',
            'children':charge_type_list,
            'required':false,
          }, {
            'type':'select',
            'name':'订单状态',
            'fieldDecorator':'state',
            'children':order_pay_statelist,
            'required':false,
          }, {
            'type':'date',
            'name':'订单日期',
            'fieldDecorator':'venue_order_date',
            'start':'venue_start',
            'end':'venue_end',
            'required':false,
          }, {
            'type':'date',
            'name':'支付时间',
            'fieldDecorator':'venue_pay_date',
            'start':'venue_pay_start',
            'end':'venue_pay_end',
            'required':false,
          }]
    const contestSearchRequirement = [
          {
            'type':'input',
            'name':'订单号',
            'fieldDecorator':'order_sn',
            'required':false,
          }, {
            'type':'input',
            'name':'企业名称',
            'fieldDecorator':'corp_full_name',
            'required':false,
          }, {
            'type':'input',
            'name':'微信订单号',
            'fieldDecorator':'transaction_id',
            'required':false,
          }, {
            'type':'input',
            'name':'企业号',
            'fieldDecorator':'corp_name',
            'required':false,
          }, {
            'type':'input',
            'name':'服务号',
            'fieldDecorator':'app_name',
            'required':false,
          }, {
            'type':'input',
            'name':'活动名称',
            'fieldDecorator':'contest_name',
            'required':false,
          }, {
            'type':'select',
            'name':'收款方式',
            'fieldDecorator':'corp_charge_type',
            'children':charge_type_list,
            'required':false,
          },{
            'type':'select',
            'name':'销售方式',
            'fieldDecorator':'sales_order_channel',
            'children':sales_order_channel,
            'required':false,
          }, {
            'type':'select',
            'name':'订单状态',
            'fieldDecorator':'state',
            'children':order_pay_statelist,
            'required':false,
          }, {
            'type':'date',
            'name':'订单日期',
            'fieldDecorator':'contest_order_date',
            'start':'contest_start',
            'end':'contest_end',
            'required':false,
          }, {
            'type':'date',
            'name':'支付时间',
            'fieldDecorator':'contest_pay_date',
            'start':'contest_pay_start',
            'end':'contest_pay_end',
            'required':false,
          }];
    const venueColumns = [
      {
        title: '订单号',
        dataIndex: 'order_sn',
        render: (text, record) => (
            <div>
              <span>{text}</span>
              <div><Tag color={record.corp_charge_type_color}>{record.corp_charge_type}</Tag></div>
            </div>
          ),
      }, {
        title: '订单日期',
        dataIndex: 'order_time',
      }, {
        title: '订单状态',
        dataIndex: 'state',
        render: text => <span>{text}</span>,

      }, {
        title: '企业名称',
        dataIndex: 'corp_full_name',
      }, {
        title: '企业号',
        dataIndex: 'corp_name',
        render: text => <span>{text}</span>,
      }, {
        title: '服务号',
        dataIndex: 'app_name',
      }, {
        title: '微信订单号',
        dataIndex: 'transaction_id',
        render: text => <span>{text}</span>,
      }, {
        title: '支付日期',
        dataIndex: 'paid_time',
      }, {
        title: '场馆名称',
        dataIndex: 'venue_name',
      },{
        title: '项目',
        dataIndex: 'item',
        width:'130px',
        render: text => <span>{text}</span>,
      }, {
        title: '订单金额',
        dataIndex: 'amount',
        render: text => <span>{text}</span>,
      }, {
        title: '优惠金额',
        dataIndex: 'offers',
        render: text => <span>{text}</span>,
      }, {
        title: '实收金额',
        dataIndex: 'amount_pay',
        render: text => <span>{text}</span>,
      }, {
        title: '平台收益',
        dataIndex: 'platform_income',
        render: (text, record) => (
            <Tooltip title={record.platform_income_notice}><span>{text}</span></Tooltip>
          ),
      }, {
        title: '供应商结算',
        dataIndex: 'owner_settle',
        render: (text, record) => (
            <Tooltip title={record.owner_settle_notice}><span>{text}</span></Tooltip>
          )
      }];
    const contestColumns = [
      {
        title: '订单号',
        dataIndex: 'order_sn',
        render: (text, record) => (
            <div>
              <span>{text}</span>
              <div>
                <Tag color={record.corp_charge_type_color}>{record.corp_charge_type}</Tag>
                { record.is_dist == 1 ? <Tag color='#483D8B'>{record.dist_name}</Tag> :''}
              </div>
            </div>
          ),
      }, {
        title: '订单日期',
        dataIndex: 'order_time',
      }, {
        title: '订单状态',
        dataIndex: 'state',
        render: text => <span>{text}</span>,
      }, {
        title: '企业名称',
        dataIndex: 'corp_full_name',
      }, {
        title: '企业号',
        dataIndex: 'corp_name',
        render: text => <span>{text}</span>,
      }, {
        title: '服务号',
        dataIndex: 'app_name',
      }, {
        title: '微信订单号',
        dataIndex: 'transaction_id',
        render: text => <span>{text}</span>,
      }, {
        title: '支付日期',
        dataIndex: 'paid_time',
      }, {
        title: '活动名称',
        dataIndex: 'cname',
      }, {
        title: '数量',
        dataIndex: 'count',
        render: text => <span>{text}</span>,
      }, {
        title: '订单金额',
        dataIndex: 'amount',
        render: text => <span>{text}</span>,
      }, {
        title: '优惠金额',
        dataIndex: 'offers',
        render: text => <span>{text}</span>,
      }, {
        title: '实收金额',
        dataIndex: 'amount_pay',
        render: text => <span>{text}</span>,
      }, {
        title: '平台收益',
        dataIndex: 'platform_income',
        render: (text, record) => (
            <Tooltip title={record.platform_income_notice}><span>{text}</span></Tooltip>
          ),
      }, {
        title: '供应商结算',
        dataIndex: 'owner_settle',
        render: (text, record) => (
            <Tooltip title={record.owner_settle_notice}><span>{text}</span></Tooltip>
          ),
      }];
    let columns = [];
    let  searchRequirement = [];

    const pagination = {
      showSizeChanger: true,
      total: total,
      pageSize:size, 
      current: page,
      onShowSizeChange:function(current, pageSize) {
        var pageParams = {
          page:current,
          size:pageSize
        }
        this.pageJumpOrder(pageParams);
      }.bind(this),
      onChange:function(current) {
        var pageParams = {
          page:current,
        }
        this.pageJumpOrder(pageParams);
      }.bind(this),
    };

    switch(tabsActiveKey){
      case 'contest':
        searchRequirement = contestSearchRequirement;
        columns = contestColumns;
        break;
      case 'venue':
        searchRequirement = venueSearchRequirement;
        columns = venueColumns;
        break;
      default:
    };
    const children = [];
    for (let i = 0; i < searchRequirement.length; i++) {
      if(searchRequirement[i].type === 'input'){
        children.push(
          <Col span={8} key={i}>
            <FormItem {...formItemLayout} label={searchRequirement[i].name}>
              {getFieldDecorator(searchRequirement[i].fieldDecorator)(
                <Input placeholder={ `请输入${searchRequirement[i].name}`}/>
              )}
            </FormItem>
          </Col>
        );
      }
      if(searchRequirement[i].type === 'select'){
        children.push(
          <Col span={8} key={i}>
            <FormItem {...formItemLayout} label={searchRequirement[i].name}>
              {getFieldDecorator(searchRequirement[i].fieldDecorator,{
                initialValue: '',
              })(
                <Select placeholder={ `请选择${searchRequirement[i].name}`}>
                  <Option value=''>全部</Option>
                  {(()=>{
                      let selectChild = [];
                      for(let j in searchRequirement[i].children){
                        selectChild.push(<Option key={j} value={j} >{searchRequirement[i].children[j]}</Option>);
                      }
                      return selectChild;
                  })()}
                </Select>
              )}
            </FormItem>
          </Col>
        );
      }
      if(searchRequirement[i].type === 'date'){
        children.push(
          <Col span={8} key={i}>
            <FormItem {...formItemLayout} label={searchRequirement[i].name}>
              {getFieldDecorator(searchRequirement[i].fieldDecorator,{
                  rules: [{ type: 'array' }],
                })(
                <RangePicker />
              )}
            </FormItem>
          </Col>
        );
      }
    }
    const shownCount = expand ? children.length : 3;
    return (
      <div>
        <Form
          horizontal
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={40}>
            {children.slice(0, shownCount)}
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button type="ghost" onClick={this.checkMonthlyFeeSet} style={{ marginLeft: 8 }} >导出</Button>
              <Button onClick={this.handleReset} style={{ marginLeft: 8 }} >重置</Button>
              <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.props.orderScreeningToggle}>
                高级搜索 <Icon type={expand ? 'up' : 'down'} />
              </a>
            </Col>
          </Row>
        </Form>
        <div className="search-result-list">
          <Table 
            columns={columns} 
            rowKey={data.order_id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            scroll={{ x: 1350 }}
          />
        </div>
      </div>
    );
  }
}));
const orderTabs = React.createClass({
  componentWillMount(){
    this.props.getVenuteScreeningConditions();
    this.props.query();
  },
  tabsSwitch(e){
    const params = {
      page:1,
    }
    this.props.query(e,params);
    if(this.refs.getContestFromSearch){
      this.refs.getContestFromSearch.resetFields();
    } 
    if(this.refs.getvenueFromSearch){
      this.refs.getvenueFromSearch.resetFields();
    }  
  },
  render(){
    const { tabsActiveKey } = this.props.data; 
    return(
        <Tabs defaultActiveKey={tabsActiveKey} onChange={this.tabsSwitch}>
          <TabPane tab="活动报名" key="contest">
            <AdvancedSearchForm {...this.props} ref="getContestFromSearch" />
          </TabPane>
          <TabPane tab="场馆预定" key="venue">
            <AdvancedSearchForm {...this.props} ref="getvenueFromSearch" />
          </TabPane>
        </Tabs>
      )
  }
})
function mapStateToProps(state) {
  return {
    data:state.orderList,
  };
}
export default connect(
  mapStateToProps,
  Actions
)(orderTabs)

