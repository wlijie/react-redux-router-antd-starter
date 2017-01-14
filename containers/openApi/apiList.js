import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as Actions from '../../actions/openApi/apiIndex'



import { Table, Button, Select, Icon, Form, Input, Popconfirm} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;


const AsideTable = React.createClass({
  componentWillMount(){
    this.props.query();
  },
  render() {
    const columns = [
      {
        title: 'API ID',
        dataIndex: 'pk_api',
      }, {
        title: '外部API名称',
        dataIndex: 'api_name',
      }, {
        title: '外部系统标识',
        dataIndex: 'api_system',
        render: text => <span>{openApiSystem[text]}</span>,

      }, {
        title: '外部API地址',
        dataIndex: 'api',
      }, {
        title: '请求方式',
        dataIndex: 'method',
        render: text => <span>{openApiMethod[text]}</span>,
      }, {
        title: '内部API名称',
        dataIndex: 'api_internal_name',
      }, {
        title: '内部系统标识',
        dataIndex: 'api_internal_system',
        render: text => <span>{openApiSystem[text]}</span>,
      }, {
        title: '内部API地址',
        dataIndex: 'api_internal',
      }, {
        title: '状态',
        dataIndex: 'state',
        render: text => <span>{openApiState[text]}</span>,
      }, {
        title: '操作',
        render: (record) => (
            <span>
              <Link to={"/openApi/editApi/"+record.pk_api}><Button size="small" type="ghost">编辑</Button></Link>
              <span className="ant-divider" />
              <Link to={"/openApi/desApi/"+record.pk_api}><Button size="small" type="ghost">查看</Button></Link>
              <span className="ant-divider" />
              <Popconfirm title="确定要删除此条API吗?" onConfirm={(pk_api)=>this.props.del(record.pk_api)}>
                <Button type="ghost" size="small" >删除</Button>
              </Popconfirm>
            </span>
          ),
      }
    ];
    const { data, loading, total, size } = this.props.data; 

    const openApiSystem = this.props.openApiSystem;
    const openApiMethod = this.props.openApiMethod;
    const openApiState = this.props.openApiState;



    var pagination = {
      showSizeChanger: true,
      total: total,
      pageSize:size, 
      onShowSizeChange:function(current, pageSize) {
        var pageParams = {
          page:current,
          size:pageSize
        }
        this.props.query(pageParams);
      }.bind(this),
      onChange:function(current) {
        var pageParams = {
          page:current,
        }
        this.props.query(pageParams);
      }.bind(this),
    };
    return (
          <div> 
            <div className="search-main clearfix">
              <Link to="/openApi/addApi"><Button type="primary" size="large" icon="plus-circle">添加</Button></Link>
              <div className="search-group">
                <HorizontalSearchForm {...this.props}/>
              </div>
            </div>
            <Table 
              columns={columns} 
              rowKey={data.pk_api}
              dataSource={data}
              pagination={pagination}
              loading={loading}
              />
        </div>
    );
  },
});


const HorizontalSearchForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.query(values);//搜索
      }
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const { staticSearch, system, role } = this.props.data;

    const openApiSystem = this.props.openApiSystem;
    const openApiType = this.props.openApiType;
    const openApiRole = this.props.openApiRole;
   
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('staticSearch', {
            initialValue: staticSearch.toString(),
          })(
            <Select onChange={this.props.filterSearchChange}>
              {(()=>{
                  let selectChild = [];
                  for(let i in openApiType){
                    selectChild.push(<Option key={i} value={i} >{openApiType[i]}</Option>);
                  }
                  return selectChild;
              })()}
            </Select>
          )}
        </FormItem>
        {(function(){
            if(staticSearch == 1){
                return( 
                    <FormItem>
                      {getFieldDecorator('system', {
                        initialValue: system.toString(),
                      })(
                        <Select>
                          {(()=>{
                              let selectChild = [];
                              for(let i in openApiSystem){
                                selectChild.push(<Option key={i} value={i} >{openApiSystem[i]}</Option>);
                              }
                              return selectChild;
                          })()}
                        </Select>
                      )}
                    </FormItem>)
            }else if(staticSearch == 2){
                return (
                    <FormItem>
                      {getFieldDecorator('role', {
                        initialValue: role.toString(),
                      })(
                        <Select>
                          {(()=>{
                              let selectChild = [];
                              for(let i in openApiRole){
                                selectChild.push(<Option key={i} value={i} >{openApiRole[i]}</Option>);
                              }
                              return selectChild;
                          })()}
                        </Select>
                      )}
                    </FormItem>)
            }
        }.bind(this))()}
        <FormItem>
          <Button type="primary" htmlType="submit" icon="search">搜索</Button>
        </FormItem>
      </Form>
    );
  },
}));

function mapStateToProps(state) {
  return {
    data:state.apiIndex,
    openApiSystem:state.openApiSystem,
    openApiType:state.openApiType,
    openApiState:state.openApiState,
    openApiRole:state.openApiRole,
    openApiMethod:state.openApiMethod,
  };
}


export default connect(
  mapStateToProps,
  Actions
)(AsideTable)
