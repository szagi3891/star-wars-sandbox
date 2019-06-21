import * as React from 'react';
import styled from '@emotion/styled';

export const Loading = () => <div>Loading ...</div>;

export const Link = styled('div')`
    color: blue;
    cursor: pointer;

    &:hover {
        color: red;
        background-color: #e0e0e0;
    }
`;

export const Group = styled('div')`
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 10px;
`;