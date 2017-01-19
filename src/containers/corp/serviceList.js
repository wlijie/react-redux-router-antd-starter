import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Table, Button, Icon, Popconfirm, Menu, Tabs, Radio, Form, Select, Modal, Input, DatePicker} from 'antd';
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

import * as Actions from '../../actions/corp/serviceList'

const AsideTable = React.createClass({
  componentWillMount(){
    this.props.queryServiceList(this.props.params.id);
    this.props.getCorpInfo(this.props.params.id);
  },
  callback(key){
    this.props.queryServiceList(this.props.params.id,key)
  },
  render() {
    const { tabsCorpActiveKey, corp_name } = this.props.data;
    return (
        <div>
          <h3 style={{ marginBottom:'10px' }}>{corp_name}</h3>
          <Tabs defaultActiveKey={ tabsCorpActiveKey } onChange={this.callback} >
            <TabPane tab='收款设置' key="receipt">
              <ReceiptSettings {...this.props}/>
            </TabPane>
            <TabPane tab='服务设置' key="service">
              <ServiceSettings {...this.props}/>
            </TabPane>
          </Tabs>
        </div>
      )
  }
});
const ServiceSettings = React.createClass({
  confirm(record,state) {
      this.props.editServiceState(record.corp_service_id,state,record.corp_id);
  },
  render(){
    const serviceColumns = [
          {
            title: '服务',
            dataIndex: 'service_name',
          }, {
            title: '服务状态',
            dataIndex: 'state',
            render: (text, record) => (
                <span>
                    {(function(){
                        if(record.state == 2){
                            return <span className="foreground">{serviceState[text]}</span>;
                        }else{
                            return  <span >{serviceState[text]}</span>;
                        }
                    }.bind(this))()}
                </span>
            )
          }, {
            title: '操作',
            dataIndex: 'corp_service_id',
            render: (text, record) => (
                <span>
                    {(function(){
                      if(record.state == 2){
                        return (
                          <Popconfirm title="确认停用?" onConfirm={(objrecord,state)=>this.confirm(record,1)} >
                            <Button type="ghost" size="small">停用</Button>
                          </Popconfirm>
                        )
                      }else{
                        return (
                          <Popconfirm title="确认启用" onConfirm={(objrecord,state)=>this.confirm(record,2)} >
                            <Button type="ghost" size="small">启用</Button>
                          </Popconfirm>
                        )
                      }
                    }.bind(this))()}
                </span>
            )
          }]
    const { serviceData, loading, corp_name } = this.props.data;
    const serviceState = this.props.serviceState;
    return(
        <div>
          <div className="ant-advanced-management-form ">
            <Button type="primary" size='default' onClick={(corp_id)=>this.props.initializeService(this.props.params.id)}>初始化</Button>
          </div>
          <div className="search-result-list">
            <Table
              columns={serviceColumns}
              rowKey={record => record.corp_service_id}
              dataSource={serviceData}
              pagination={false}
              loading={loading} 
            />
          </div>
        </div>
      )
  }
})


const FromReceiptType = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['corp_id'] = this.props.params.id;
        this.props.setReceiptModeSettings(values)
      }
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const {  chargeType } = this.props.data;
    const receiptType = this.props.receiptType;
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('charge_type', {
            rules: [{ required: true, message: '请选择收款平台类型!' }],
            initialValue: chargeType,
          })(
            <RadioGroup>
              {(()=>{
                  let selectChild = [];
                  for(let i in receiptType){
                    selectChild.push(<Radio key={i} value={i} >{receiptType[i]}</Radio>);
                  }
                  return selectChild;
              })()}
            </RadioGroup>
          )}
        </FormItem>
        <FormItem style={{float: 'right'}}>
          <Button type="primary" size='default' htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    );
  },
}));

const ReceiptSettings = React.createClass({
  render(){    
    const receiptColumns = [
      {
        title: '服务',
        dataIndex: 'service_name',
        key: 'service_name',
        render: text => <span>{text}</span>,
      }, {
        title: '收费方式',
        dataIndex: 'charge_form',
        key: 'charge_form',
        render: text => <span>{feesType[text]}</span>,
      }, {
        title: '手续费',
        dataIndex: 'charge_rate',
        key: 'charge_rate',
        render: text => <span>{text}</span>,
      }, {
        title: '月费下限',
        dataIndex: 'charge_min',
        key: 'charge_min',
        render: text => <span>{text}</span>,
      }, {
        title: '月费上限',
        dataIndex: 'charge_max',
        key: 'charge_max',
        render: text => <span>{text}</span>,
      }, {
        title: '计费时间',
        dataIndex: 'charge_start_time',
        key: 'charge_start_time',
        render: (text, record) => (
          <span>
              {record.charge_start_time}-{record.charge_end_time}
          </span>
        ),
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            {(()=>{
              if(record.corp_charge_dist_id){
                return(
                  <span>
                    <Button type="ghost" size="small" onClick={()=>this.props.showSetCorpModal('changesReceiptSettings',record)}>修改</Button>
                    <span className="ant-divider" />
                    <Button type="ghost" size="small" onClick={()=>this.props.showSetCorpModal('renewalReceiptSettings',record)}>续期</Button>
                    <span className="ant-divider" />
                    <Button type="ghost" size="small" onClick={()=>this.props.viewReceiptSettingsLog(record)}>日志</Button>
                  </span>
                )
              }else{
                return(
                  <Button type="ghost" size="small" onClick={()=>this.props.showSetCorpModal('addReceiptSettings',record)}>设置</Button>
                )
              }
            })()}
          </span>
        ),
      }
    ];
    const {  loading, visible ,receiptData, visibleReceiptSetLog} = this.props.data;
    const feesType = this.props.feesType;
    return(
        <div>
          <div className="ant-advanced-management-form clearfix">
            <FromReceiptType {...this.props}/>
          </div>
          <div className="search-result-list">
            <Table
              rowKey={record => record.service_id}
              columns={receiptColumns}
              dataSource={receiptData}
              pagination={false}
              loading={loading} />
          </div>
          {(()=>{
            if(visible){
              return <ElasticLayer {...this.props}/>
            }
            if(visibleReceiptSetLog){
              return <ReceiptSetLogTable {...this.props}/>
            }
          })()}
        </div>
      )
  }
})
const ReceiptSetLogTable = React.createClass({
  render() {
    const { loading, receiptSetData, logData,  total, size, page } = this.props.data;
    const logActionsStatus = this.props.logActionsStatus;
    const feesType = this.props.feesType;
    const columnsReceiptSetLog = [
        {
          title: '收费方式',
          dataIndex: 'charge_form',
          render: text => <span>{feesType[text]}</span>,
        }, {
          title: '手续费',
          dataIndex: 'charge_rate',
        }, {
          title: '月费下限',
          dataIndex: 'charge_min',
        }, {
          title: '月费上限',
          dataIndex: 'charge_max',
        }, {
          title: '计费时间',
          dataIndex: 'charge_start_time',
          key: 'charge_start_time',
          render: (text, record) => (
            <span>
              {record.charge_start_time}-{record.charge_end_time}
            </span>
          ),
        }, {
          title: '操作',
          dataIndex: 'state',
          render: text => <span>{logActionsStatus[text]}</span>,
        }, {
          title: '操作时间',
          dataIndex: 'ctime',
        } 
    ];
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
        this.props.viewReceiptSettingsLog(receiptSetData,pageParams);
      }.bind(this),
      onChange:function(current) {
        var pageParams = {
          page:current,
        }
        this.props.viewReceiptSettingsLog(receiptSetData,pageParams);
      }.bind(this),
    };
    return (
      <div>
        <Modal
          visible={true}
          title={receiptSetData.service_name}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={false}
          width={1100}
        >
          <Table 
            rowKey={record => record.corp_service_id}
            columns={columnsReceiptSetLog} 
            dataSource={logData}
            pagination={pagination}
            loading={loading}
            size="small" 
          />
        </Modal>
      </div>
    );
  },
});

const ElasticLayer = React.createClass({
  render() {
    const { loading, receiptSetData } = this.props.data;
    return (
      <div>
        <Modal
          visible={true}
          title={receiptSetData.service_name}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={false}
        >
        <RegistrationForm {...this.props}/>
        </Modal>
      </div>
    );
  },
});

const RegistrationForm = Form.create()(React.createClass({
  getInitialState() {
    const value = this.props.data.receiptSetData || {};
    return {
      chargeFormValue: value.charge_form || '1',
      passwordDirty: true,
    };
  },
  changeMonthlyUnits(rule, value, callback) {
    if (value) {
      this.setState({
        chargeFormValue: value,
      });
      callback();
    } else {
      callback();
    }
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        for(let i in values){
          if(values[i] instanceof Array && values[i].length){
            values[i] = [values[i][0].format('YYYY-MM-DD'), values[i][1].format('YYYY-MM-DD')];
            switch(i){
              case 'charge_date':
                values['charge_start_time'] = values[i][0];
                values['charge_end_time'] = values[i][1];
                delete values[i];
                break;
              default:
            };
          }
          if(typeof(values[i]) == "undefined" || values[i] == ''){
            delete values[i];
          }
        }
        this.props.modalReceiptSettingsChanges(values);
      }
    });
  },
  disabledDate(current) {
    const minDate = this.props.data.initialRenewalMethodDate[0];
    return current && current.valueOf() <= (new Date(minDate)).valueOf()-(60*60*24*1000);
  },
  handleMonthlyFeeBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  },
  checkMonthlyFee(rule, value, callback) {
    const form = this.props.form;
    if (value && parseFloat(value) < parseFloat(form.getFieldValue('charge_min'))) {
      callback('月费下限不能大于月费上限!');
    } else {
      callback();
    }
  },
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['charge_max'], { force: true });
    }
    callback();
  },
  changeProportionFee(rule, value, callback){
    var feesTypeUnit = this.props.feesTypeUnit;
    if(feesTypeUnit[this.state.chargeFormValue] !== '%'){
      callback();
      return;
    }
    if (parseFloat(value) >= 0 && parseFloat(value) <= 100) {
      callback();
      return;
    }
    callback('手续费不能小于0,不能大于100!');
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const { receiptSetData, receiptSetType, initialRenewalMethodType , receiptSetInputDisabled, initialRenewalMethodDate, receiptSetDateDisabled } = this.props.data;
    const feesType = this.props.feesType;
    const feesTypeUnit = this.props.feesTypeUnit;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 10},
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 10,
        offset: 8,
      },
    };
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        {(()=>{
          if(receiptSetType === 'renewalReceiptSettings'){
            return (
              <FormItem
                {...formItemLayout}
                label="续期方式"
              >
                {getFieldDecorator('charge_method', {
                  rules: [{
                    required: true, message: '请选择收费方式',
                  }, {
                    validator: this.props.changeRenewalMethod,
                  }],
                  initialValue:initialRenewalMethodType.toString(),
                })(
                  <RadioGroup>
                    <Radio value='1'>按原配置</Radio>
                    <Radio value='2'>按新配置</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            );
          }
        })()}
        <FormItem
          {...formItemLayout}
          label="收费方式"
        >
          {getFieldDecorator('charge_form', {
            rules: [{
              required: true, message: '请选择收费方式',
            }, {
              validator: this.changeMonthlyUnits,
            }],
            initialValue: this.state.chargeFormValue.toString() ,
          })(
            <RadioGroup disabled = { receiptSetInputDisabled } >
              {(()=>{
                  let selectChild = [];
                  for(let i in feesType){
                    selectChild.push(<Radio key={i} value={i} >{feesType[i]}</Radio>);
                  }
                  return selectChild;
              })()}
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手续费"
          hasFeedback
        >
          {getFieldDecorator('charge_rate', {
            rules: [{
              required: true, message: '请填写手续费',
            }, {
              validator: this.changeProportionFee,
            }],
            initialValue: receiptSetData.charge_rate.toString(),
          })(
            <Input placeholder="请填写手续费" disabled = { receiptSetInputDisabled } style={{ width: '75%', marginRight: 8 }}/>
          )}
          <span>{feesTypeUnit[this.state.chargeFormValue]}</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="月费下限"
          hasFeedback
        >
          {getFieldDecorator('charge_min', {
            rules: [{ 
              required: true, message: '请填写月费下限' ,
            }, {
              validator: this.checkConfirm,
            }],
            initialValue: receiptSetData.charge_min.toString(),
          })(
            <Input placeholder="请填写月费下限" onBlur={this.handleMonthlyFeeBlur} disabled = { receiptSetInputDisabled } style={{ width: '75%', marginRight: 8 }} />
          )}
          <span>元</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="月费上限"
          hasFeedback
        >
          {getFieldDecorator('charge_max', {
            rules: [{ 
              required: true, message: '请填写月费上限' ,
            }, {
              validator: this.checkMonthlyFee,
            }],
            initialValue: receiptSetData.charge_max.toString(),
          })(
            <Input placeholder="请填写月费上限" disabled = { receiptSetInputDisabled } style={{ width: '75%', marginRight: 8 }}/>
          )}
          <span>元</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="计费时间"
        >
          {getFieldDecorator('charge_date', {
              rules: [{ type: 'array', required: true, message: '请选项计费时间' }],
              initialValue: initialRenewalMethodDate,
            })(
              <RangePicker disabled = { receiptSetDateDisabled } disabledDate={this.disabledDate}/>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="ghost" onClick={this.props.handleCancel}>取消</Button>
          <Button className="marL15" type="primary" htmlType="submit" >提交</Button>
        </FormItem>
      </Form>
    );
  },
}));

function mapStateToProps(state) {
    return {
      data:state.serviceList,
      serviceState:state.serviceState,
      receiptType:state.receiptType,
      feesType:state.feesType,
      feesTypeUnit:state.feesTypeUnit,
      logActionsStatus:state.logActionsStatus,
    };
}
export default connect(
    mapStateToProps,
    Actions
)(AsideTable)
