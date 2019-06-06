import React from 'smallfish/react';
import { Card } from 'smallfish/antd';

export default ({ hasAuth = false, children }) => {
  return (
    <>
      {hasAuth && children}
      {!hasAuth && <Card>no promission!!!</Card>}
    </>
  );
};
