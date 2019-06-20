import React, { useState } from "smallfish/react";
import { withRouter } from "smallfish/router";
import { Layout, Menu, Icon } from "smallfish/antd";
import { Link } from "smallfish/router";
import styled from "smallfish/styled";

const MLayout = styled(Layout)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const MHeader = styled(Layout.Header)`
  background: #fff;
  padding-left: 24px;
`;

const Logo = styled.h1`
  color: #fff;
  margin: 0;
  font-size: 24px;
  padding-left: ${props => (props.center ? "0" : "24px")};
  line-height: 64px;
  text-align: ${props => (props.center ? "center" : "left")};
  i {
    padding-right: ${props => (props.center ? "0" : "8px")};
  }
`;

export default withRouter(props => {
  const { children, location } = props;

  const [collapsed, setSollapsed] = useState(false);

  const { pathname } = location;

  let selectedKey = "home";
  if (pathname.startsWith(`/list`)) {
    selectedKey = "list";
  }
  if (pathname.startsWith(`/user`)) {
    selectedKey = "user";
  }
  if (pathname.startsWith(`/test`)) {
    selectedKey = "test";
  }

  return (
    <MLayout>
      <Layout.Sider
        width={256}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Logo center={collapsed}>
          <Icon type="alipay-circle" />
          {!collapsed && "Smallfish"}
        </Logo>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="home">
            <Link to="/">
              <Icon type="dashboard" />
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="list">
            <Link to="/list">
              <Icon type="database" />
              <span>List</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="user">
            <Link to="/user">
              <Icon type="user" />
              <span>User</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="test">
            <Link to="/test">
              <Icon type="alert" />
              <span>Test</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="private">
            <Link to="/private">
              <Icon type="eye-invisible" />
              <span>Private Route</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <MHeader>
          <Icon
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={() => setSollapsed(!collapsed)}
          />
        </MHeader>
        {children}
      </Layout>
    </MLayout>
  );
});
