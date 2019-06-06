import React from 'smallfish/react';
import { Card } from 'smallfish/antd';
import i18n from 'smallfish/i18n';
import styled from 'smallfish/styled';

import 'smallfish/util/moment/locale/en-au';
import moment from 'smallfish/util/moment';

const Home = styled(Card)`
  margin: 24px;
`;

export default () => (
  <Home>
    <p>Welcome! {moment().fromNow()} you login to smallfish Management System</p>
    <p>{i18n.t('i18n_test')}.</p>
  </Home>
);
