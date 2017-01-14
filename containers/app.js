import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as Actions from '../actions/app'
import { Menu, Breadcrumb, Icon } from 'antd';
import TweenOne from 'rc-tween-one';
const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

const AsideCollapse = React.createClass({
  componentWillMount(){
    this.props.getListMenu();
  },
  handleClick(e) {
    this.props.pushRouter(e.key);
  },
  render() {
    const { user_name, user_avatar, list_menu, openKeys } = this.props.data; 
    let menuChild = [];
    let selectedKeys = [];
    for(let i in list_menu){
      let menu_item=[];
      for(let x in list_menu[i]){
        menu_item.push(<Menu.Item key={list_menu[i][x]}>{x}</Menu.Item>);
        if(this.props.router.isActive(list_menu[i][x],{},false)){
          selectedKeys.push(list_menu[i][x]);
        }
      }
      let sub_menu = <SubMenu key={i} title={<span><Icon type="home" />{i}</span>}>{menu_item}</SubMenu>
      menuChild.push(sub_menu);
    }
    return (
      <div className="ant-layout-aside">
        <div className="ant-layout-header">
          <Header  {...this.props}/>
        </div>
        <aside className="ant-layout-sider">
            <Menu 
              theme="light"
              mode="inline"
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              onOpenChange={this.props.onMenuOpenChange}
              onClick={this.handleClick}
              >
              {menuChild}
            </Menu>
        </aside>
        <div className="ant-layout-main">
          <div className="ant-layout-breadcrumb">
            <Breadcrumb {...this.props}/>
          </div>
          <div className="ant-layout-container" style={{padding:'20px', background: '#ececec'}} >
            <div className="ant-layout-content">
                {this.props.children}
            </div>
          </div>
          <div className="ant-layout-footer">
          Boss 后台 版权所有 © 2016 由微赛智慧体育事业部支持
          </div>
        </div>
      </div>
    );
  },
});

const Header = React.createClass({
  render() {
    const { user_name, user_avatar } = this.props.data; 
    return (
      <TweenOne
        component="header"
        className="header"
        animation={{ opacity: 0, type: 'from' }}
      >
        <TweenOne
          className="header-logo"
          animation={{ x: -30, delay: 100, type: 'from', ease: 'easeOutQuad' }}
        >
          <a href="/" className="logo"></a>
        </TweenOne>
        <TweenOne
          className="header-user"
          animation={{ x: 30, delay: 100, opacity: 0, type: 'from', ease: 'easeOutQuad' }}
          style={{ lineHeight: '62px', height: '64px' }}
        >
          <div className="user">
            <span className="img">
              <img
                src={user_avatar}
                width="30"
                height="30"
              />
            </span>
            <span className="user_name">{user_name}</span>
            <a href='/index/loginquit' className="loginquit"><Icon type="poweroff" /></a>
          </div>
        </TweenOne>
        <TweenOne
          className="header-nav"
          animation={{ x: 30, delay: 100, type: 'from', ease: 'easeOutQuad' }}
        >
          <Menu
            mode="horizontal" defaultSelectedKeys={['a']}
            style={{ lineHeight: '62px' }}
          >
            <Item key="a">应用中心</Item>
            <Item key="b">营销中心</Item>
            <Item key="c">公众号</Item>
          </Menu>
        </TweenOne>
      </TweenOne>
    );
  }
})


function mapStateToProps(state) {
  return {
    data:state.app,
  };
}

export default connect(
  mapStateToProps,
  Actions
  )(AsideCollapse)
