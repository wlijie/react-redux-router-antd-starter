import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as Actions from '../../actions/openApi/desApi'

import { Table, Card, Modal, Button, Form, Icon, Input, Checkbox, Select, message, Radio, Tooltip } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const desApiComponent = React.createClass({
  componentWillMount(){
    this.props.getParamsInfo(this.props.params.id);
  },
  componentDidMount() {

  },
  render() {
    const columns = [{
      title: 'ID',
      dataIndex: 'pk_api_params',
      key: 'pk_api_params',
    }, {
      title: '外部参数名称',
      dataIndex: 'param_name',
      key: 'param_name',
    },  {
      title: '类型',
      dataIndex: 'param_type',
      key: 'param_type',
      render: text => <span>{openApiParamsType[text]}</span>,
    }, {
      title: '内部参数名称',
      dataIndex: 'param_name_internal',
      key: 'param_name_internal',
    }, {
      title: '参数排序',
      dataIndex: 'param_order',
      key: 'param_order',
      render: text => <span>{text||'--'}</span>,
    }, {
      title: '参数是否必选',
      dataIndex: 'param_null',
      key: 'param_null',
      render: text => <span>{openApiParamsNull[text]}</span>,
    }, {
      title: '描述',
      dataIndex: 'mark',
      key: 'mark',
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: text => <span>{openApiState[text]}</span>,
    }, {
      title: '操作',
      dataIndex: 'address',
      render: (text, record) => (
        <span>
          <Button type="ghost" size="small" onClick={(_self)=>this.props.showModal(record.io_type,'addChild',record)}>子级增加</Button>
          <span className="ant-divider" />
          <Button type="ghost" size="small" onClick={(_self)=>this.props.showModal(record.io_type,'edit',record)}>编辑</Button>
          <span className="ant-divider" />

          {(function(){
            if(record.state == 1){
              return (
                    <Button size="small" type="ghost" onClick={(_self)=>this.props.switchParameter(record,this.props.params.id)}>{openApiState['2']}</Button>
                )
            }else{
              return <Button size="small" type="ghost" onClick={(_self)=>this.props.switchParameter(record,this.props.params.id)}>{openApiState['1']}</Button>
            }
          }.bind(this))()}
        </span>
      ),
    }];
    const { loading, apiInfo, ParamsData, loadingCard, visible } = this.props.data;

    const openApiSystem = this.props.openApiSystem;
    const openApiMethod = this.props.openApiMethod;
    const openApiState = this.props.openApiState;
    const openApiParamsType = this.props.openApiParamsType;
    const openApiParamsNull = this.props.openApiParamsNull;
    return (
      <div>
        <Card className="card-border" title="API 详情" bordered={false} >
          <div>
            <ul className="ui-dlist">
              <li className="markdown outer"><div className="ui-dlist-tit">API ID</div><div className="ui-dlist-det">{apiInfo.pk_api}</div></li>
              <li className="markdown outer"><div className="ui-dlist-tit">外部API名称</div><div className="ui-dlist-det">{apiInfo.api_name}</div></li>
              <li className="markdown outer"><div className="ui-dlist-tit">外部系统标识</div><div className="ui-dlist-det">{openApiSystem[apiInfo.api_system]}</div></li>
              <li className="markdown outer"><div className="ui-dlist-tit">外部API地址</div><div className="ui-dlist-det">{apiInfo.api}</div></li>
              <li className="markdown outer"><div className="ui-dlist-tit">请求方式</div><div className="ui-dlist-det">{openApiMethod[apiInfo.method]}</div></li>
              <li className="markdown outer"><div className="ui-dlist-tit">内部系统标识</div><div className="ui-dlist-det">{openApiSystem[apiInfo.api_internal_system]}</div></li>
              <li className="markdown outer"><div className="ui-dlist-tit">内部API名称 </div><div className="ui-dlist-det">{apiInfo.api_internal_name}</div></li>
              <li className="markdown outer"><div className="ui-dlist-tit">内部API地址</div><div className="ui-dlist-det">{apiInfo.api_internal}</div></li>
              <li className="markdown outer"><div className="ui-dlist-tit">状态</div><div className="ui-dlist-det">{openApiState[apiInfo.state]}</div></li>
            </ul>
          </div>
        </Card>
        <Card className="card-border" title="请求参数" bordered={false}>
          <Table columns={columns} dataSource={ParamsData['1']} pagination={false} rowKey='pk_api_params' size="middle"/>
          <Button className="marT10" type="ghost" icon="plus-circle-o" onClick={(apiType)=>this.props.showModal('1')}>新增</Button>
        </Card>
        <Card className="card-border" title="返回参数" bordered={false} >
          <Table columns={columns} dataSource={ParamsData['2']} pagination={false} rowKey='pk_api_params'size="middle"/>
          <Button className="marT10" type="ghost" icon="plus-circle-o" onClick={(apiType)=>this.props.showModal('2')}>新增</Button>
        </Card>
        {(()=>{
          if(visible){
            return <ElasticLayer {...this.props}/>
          }
        })()}
      </div>
    );
  }
});
const ElasticLayer = React.createClass({
  render() {
    const { loading } = this.props.data;
    return (
      <div>
        <Modal
          visible={true}
          title="Title"
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
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let operateType = this.props.data.operateType;
        let ioType = this.props.data.ioType;
        let operateData = this.props.data.operateData;
        var paramsModal={
          values:values,
          operateType:operateType,
          ioType:ioType,
          operateData:operateData,
          api_id:this.props.params.id,
        }
        this.props.modalParamsChanges(paramsModal);
      }
    });
  },
  render() {
    const { getFieldDecorator, resetFields } = this.props.form;
    const { operateFormData } = this.props.data;

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
    const openApiParamsType = this.props.openApiParamsType;
    const openApiParamsNull = this.props.openApiParamsNull;
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="外部参数名称"
          hasFeedback
        >
          {getFieldDecorator('param_name', {
            rules: [{
              required: true, message: '请填写外部参数名称',
            }],
            initialValue: operateFormData.param_name ,
          })(
            <Input placeholder="请填写外部参数名称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="内部参数名字"
          hasFeedback
        >
          {getFieldDecorator('param_name_internal', {
            rules: [{
              required: true, message: '请填写内部参数名字',
            }],
            initialValue: operateFormData.param_name_internal ,
          })(
            <Input placeholder="请填写内部参数名字"/>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={(
            <span>
              参数排序&nbsp;
              <Tooltip title="数字越大，顺序越靠前">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('param_order', {
            rules: [],
            initialValue: operateFormData.param_order ,
          })(
            <Input placeholder="请填写参数排序"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="参数是否必选"
        >
          {getFieldDecorator('param_null', {
            rules: [{
              required: true, message: '请填写参数是否必选',
            }],
            initialValue: operateFormData.param_null, 
          })(
            <RadioGroup>
              {(()=>{
                  let selectChild = [];
                  for(let i in openApiParamsNull){
                    selectChild.push(<Radio key={i} value={i} >{openApiParamsNull[i]}</Radio>);
                  }
                  return selectChild;
              })()}
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="类型"
        >
          {getFieldDecorator('param_type', {
            rules: [{ 
              required: true, message: '请选择参数类型' ,
            }],
            initialValue: operateFormData.param_type,
          })(
            <Select placeholder="请选择参数类型">
              {(()=>{
                  let selectChild = [];
                  for(let i in openApiParamsType){
                    selectChild.push(<Option key={i} value={i} >{openApiParamsType[i]}</Option>);
                  }
                  return selectChild;
              })()}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
          hasFeedback
        >
          {getFieldDecorator('mark', {
            rules: [{
              required: true, message: '请填写参数描述',
            }],
            initialValue: operateFormData.mark,
          })(
            <Input placeholder="请填写参数描述"/>
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
    data:state.desApi,
    openApiSystem:state.openApiSystem,
    openApiState:state.openApiState,
    openApiMethod:state.openApiMethod,
    openApiParamsType:state.openApiParamsType,
    openApiParamsNull:state.openApiParamsNull,
  };
}
export default connect(
  mapStateToProps,
  Actions
  )(desApiComponent)
