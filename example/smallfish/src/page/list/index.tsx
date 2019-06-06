import React, { useEffect } from 'smallfish/react';
import { Card, List, Icon, Avatar } from 'smallfish/antd';
import { connect } from 'smallfish/dva';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default connect(({ list }) => ({ list }))(({ list, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'list/getList',
    });
  }, []);

  return (
    <Card style={{ margin: 24 }}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            dispatch({
              type: 'list/getList',
              payload: {
                page,
              },
            });
          },
          pageSize: 3,
        }}
        dataSource={list.data}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText type="star-o" text="156" />,
              <IconText type="like-o" text="156" />,
              <IconText type="message" text="2" />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </Card>
  );
});
