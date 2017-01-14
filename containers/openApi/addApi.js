import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as Actions from '../../actions/openApi/addApi'

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const RegistrationForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.save(values);
      }
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;

    const openApiSystem = this.props.openApiSystem;
    const openApiMethod = this.props.openApiMethod;
    
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 10 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 10,
        offset: 5,
      },
    };
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="外部系统标识"
        >
          {getFieldDecorator('system', {
            rules: [
              { required: true, message: '请选择外部系统标识' },
            ],
          })(
            <Select placeholder="请选择外部系统标识">
              {(()=>{
                  let selectChild = [];
                  for(let i in openApiSystem){
                    selectChild.push(<Option key={i} value={i} >{openApiSystem[i]}</Option>);
                  }
                  return selectChild;
              })()}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="内部系统标识 "
        >
          {getFieldDecorator('internal_system', {
            rules: [
              { required: true, message: '请选择内部系统标识' },
            ],
          })(
            <Select placeholder="请选择内部系统标识">
              {(()=>{
                  let selectChild = [];
                  for(let i in openApiSystem){
                    selectChild.push(<Option key={i} value={i} >{openApiSystem[i]}</Option>);
                  }
                  return selectChild;
              })()}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="外部API名称"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [
              {required: true, message: '请输入外部API名称'},
            ],
            initialValue: null,
          })(
            <Input placeholder="请输入外部API名称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="内部API名称"
          hasFeedback
        >
          {getFieldDecorator('internal_name', {
            rules: [
              {required: true, message: '请输入内部API名称'}
            ],
            initialValue: null,
          })(
            <Input placeholder="请输入内部API名称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="外部API地址"
          hasFeedback
        >
          {getFieldDecorator('path', {
            rules: [
              {required: true, message: '请输入外部API地址'}
            ],
            initialValue: null,
          })(
            <Input placeholder="请输入外部API地址" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="内部API地址"
          hasFeedback
        >
          {getFieldDecorator('internal_path', {
            rules: [
              {required: true, message: '请输入内部API地址'}
            ],
            initialValue: null,
          })(
            <Input placeholder="请输入内部API名称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请求方式"
        >
          {getFieldDecorator('method', {
            rules: [
              { required: true, message: '请选择请求方式' },
            ],
          })(
            <Select placeholder="请选择请求方式">
              {(()=>{
                  let selectChild = [];
                  for(let i in openApiMethod){
                    selectChild.push(<Option key={i} value={i} >{openApiMethod[i]}</Option>);
                  }
                  return selectChild;
              })()}
            </Select>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">保存</Button>
        </FormItem>
      </Form>
    );
  },
}));
function mapStateToProps(state) {
  return {
    data:state.apiIndex,
    openApiSystem:state.openApiSystem,
    openApiMethod:state.openApiMethod,
  };
}
export default connect(
  mapStateToProps,
  Actions
  )(RegistrationForm)
