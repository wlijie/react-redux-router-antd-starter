import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Table, Button, Tag } from 'antd';

import * as Actions from '../../actions/corp/corpList'

const AsideTable = React.createClass({
  componentWillMount(){
    this.props.query();
  },
  render() {
    const columns = [
      {
        title: '企业名称',
        dataIndex: 'corp_full_name',
      }, {
        title: '企业号',
        dataIndex: 'corp_name',
      }, {
        title: '入驻时间',
        dataIndex: 'ctime',
      }, {
        title: '应用',
        dataIndex: 'name',
        width: 300,
      }, {
        title: '开通服务',
        dataIndex: 'service_name',
      }, {
        title: '手续费',
        dataIndex: 'charge_type',
        width: 150,
        render: (text,record) => (
          <div>
            {(()=>{
              if(record.charge_type){
                return <Tag color={record.charge_type_color}>{record.charge_type}</Tag>
              }
            })()}
            {(()=>{
              if(record.charge_rate){
                let selectChild = [];
                for(let i=0;i<record.charge_rate.length;i++){
                  selectChild.push(<p key={i} >{record.charge_rate[i]}</p>);
                }
                return selectChild;
              }
            })()}
          </div>
        ),
      }, {
        title: '操作',
        width: 120,
        render: (record) => (
          <spna>
            <Link to={`/corp/serviceList/${record.corp_id}`}><Button size="small" type="ghost">设置</Button></Link>
            <span className="ant-divider" />
            <Link to={`/corp/dataStatistics/${record.corp_id}`}><Button size="small" type="ghost">统计</Button></Link>
          </spna>
        ),
      }
    ];
    const { data, loading, total, size } = this.props.data;
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
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        scroll={{ x:1100 }}
      />
    );
  },
});
function mapStateToProps(state) {
  return {
    data:state.corpList,
  };
}
export default connect(
  mapStateToProps,
  Actions
)(AsideTable)
