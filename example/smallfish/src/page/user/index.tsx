import React from 'smallfish/react';
import { Card } from 'smallfish/antd';
import DocumentTitle from 'smallfish/util/react-document-title';

const { Meta } = Card;

export default () => (
  <DocumentTitle title="User profile">
    <Card
      hoverable
      style={{ margin: 24, width: 240 }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  </DocumentTitle>
);
