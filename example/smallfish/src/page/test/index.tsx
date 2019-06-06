import React, { useEffect } from 'smallfish/react';
import { Card } from 'smallfish/antd';
import { connect } from 'smallfish/dva';
import styled from 'smallfish/styled';

const Home = styled(Card)`
  margin: 24px;
`;

export default connect()(({ dispatch }) => {

  useEffect(() => {
    dispatch({
      type: 'user/getUser',
    });
  }, []);

  return (
    <Home>
      <h1>Error test</h1>
    </Home>
  );
});
