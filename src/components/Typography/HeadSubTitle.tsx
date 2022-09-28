import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import theme from '../../../styles/theme';

type Props = {
  children: ReactNode;
};

export default function HeadSubTitle({ children }: Props) {
  const SHeadTitle = styled(Typography)`
    font-size: 20px;
    font-weight: 500;
    padding: 10px;
    background-color: ${theme.palette.grey[100]};
    margin: 0;
  `;
  return (
    <SHeadTitle variant="h3" gutterBottom>
      {children}
    </SHeadTitle>
  );
}
