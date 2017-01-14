import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { Tabs, Radio, Row, Col, Input, Button, Icon, DatePicker, Table, Form, Spin  } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

import * as Actions from '../../actions/corp/dataStatistics'


import {  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const WrappedStatisticsModule = React.createClass({
  searchChartData(action){
    this.props.searchChartData(this.props.params.id,action);
  },
  onChangeDateType(e) {
    this.props.onChangeDateType(e,this.props.params.id)
  },
  render() {
    const {  dataStatisticsTabs, summaryData, searchDateType, chartData , searchDate } = this.props.data;
    const dataStatisticsObj = this.props.dataStatisticsObj;
    const dataListChildren = [];
    const dataLineChildren = [];
    for (let i in dataStatisticsObj[dataStatisticsTabs]) {
      let dataItem=0;
      for(var j=0;j<chartData.length;j++){
        chartData[j][i] = parseFloat(chartData[j][i]);
        dataItem += parseFloat(chartData[j][i]);
      }
      dataListChildren.push(
        <Col span={6} className="chart-statistics" key={i}>
          <h1 className="count">{ dataItem.toFixed(2) }</h1>
          <p>{dataStatisticsObj[dataStatisticsTabs][i].name}</p>
        </Col>
      )
      dataLineChildren.push(
        <Line key={i} type="linear" fill="#8884d8" stroke={dataStatisticsObj[dataStatisticsTabs][i].stroke} dataKey={i} name={dataStatisticsObj[dataStatisticsTabs][i].name} unit={dataStatisticsObj[dataStatisticsTabs][i].unit} />
      )
    }
    const contestColumns = [
      {
        title: '订单日期',
        dataIndex: 'day',
      }, {
        title: '订单金额（元）',
        dataIndex: 'amount',
      }, {
        title: '支付金额（元）',
        dataIndex: 'amount_pay',
      }, {
        title: '订单数',
        dataIndex: 'numbers',
      }, {
        title: '报名人数',
        dataIndex: 'enrol_data_count',
      }
    ];
    const bookColumns = [
      {
        title: '订单日期',
        dataIndex: 'day',
      }, {
        title: '预订场地数',
        dataIndex: 'num_times',
      }, {
        title: '预订场地日收入（元）',
        dataIndex: 'price_pay',
      }
    ];
    const pagination = {
      total: chartData.length,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange: (current) => {
        console.log('Current: ', current);
      },
    };
    return (
      <div className="ant-advanced-search-form">
        <Row gutter={40}>
          <Col span={10}>
            <RadioGroup onChange={this.onChangeDateType} defaultValue={searchDateType} value={searchDateType}>
              <RadioButton value="week">近一周</RadioButton>
              <RadioButton value="month">近一月</RadioButton>
            </RadioGroup>
          </Col>
          <Col span={14} style={{ textAlign: 'right' }}>
            <RangePicker
              style={{ width: '200px' }}
              placeholder={['开始时间', '结束时间']}
              onChange={this.props.onChangeDate}
              value={searchDate}
            />
            <Button style={{ marginLeft: 12 }} type="primary" onClick={this.searchChartData}>搜索</Button>
            <Button style={{ marginLeft: 12 }} type="ghost"   onClick={()=>this.searchChartData('export')}>导出</Button>
          </Col>
        </Row>
        <Row className="search-result-list">
          <LineChart
            width={1000}
            height={250}
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            syncId="test"
          >
            <CartesianGrid stroke='#f5f5f5'/>
            <Legend layout="vertical" align="right" verticalAlign="middle" />
            <XAxis dataKey="day" />
            <YAxis type="number" domain={['auto', 'auto']} />
            <Tooltip/>
            {dataLineChildren}
          </LineChart>
          {dataListChildren}
        </Row>
        <Table className="search-result-list" columns={ dataStatisticsTabs == 'contest' ? contestColumns : bookColumns } dataSource={chartData} pagination={pagination}  size="middle" />
      </div>
    );
  }
});
const TabsStatistics = React.createClass({
  render() {
    const {  dataStatisticsTabs, summaryData, loading } = this.props.data;
    const dataStatisticsObj = this.props.dataStatisticsObj;
    const dataStatisticsObjChildren = [];
    for (let i in dataStatisticsObj[dataStatisticsTabs]) {
        dataStatisticsObjChildren.push(
          <Col className="gutter-row" span={6} key={i}>
            <section className="gutter-box">
              <div className="value">
                <h1 className="count">{ summaryData ? summaryData[i] : 0}</h1>
                <p>{`总${dataStatisticsObj[dataStatisticsTabs][i].name}`}</p>
              </div>
            </section>
          </Col>
        )
    }
    return (
      <Spin spinning={loading}>
        <div className="gutter-example">
          <Row gutter={16}>
            {dataStatisticsObjChildren}
          </Row>
        </div>
        <WrappedStatisticsModule {...this.props} />
      </Spin>
    );
  },
});




const TabSwitch = React.createClass({
  componentWillMount(){
    this.props.query(this.props.params.id);
    this.props.searchChartData(this.props.params.id);
  },
  StatisticsTabs(key){
    this.props.StatisticsTabs(key,this.props.params.id)
  },
  render(){
    const { dataStatisticsTabs } = this.props.data;
    return(
        <Tabs defaultActiveKey={dataStatisticsTabs} onChange={this.StatisticsTabs} animated={false}>
          <TabPane tab='活动报名' key="contest"><TabsStatistics {...this.props} /></TabPane>
          <TabPane tab='场馆预定'  key="book"><TabsStatistics {...this.props} /></TabPane>
        </Tabs>
      )
  }
});

function mapStateToProps(state) {
  return {
    data:state.dataStatistics,
    dataStatisticsObj:state.dataStatisticsObj,
  };
}
export default connect(
  mapStateToProps,
  Actions
)(TabSwitch)
