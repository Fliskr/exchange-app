import React, {useEffect, FC} from "react";
import {action} from "@app/App";
import {FETCH_CURRENCIES} from "@actions/currency";
import styled from "styled-components";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
`;
const MainLayout: FC = ({children}) => {
    useEffect(() => {
        action(FETCH_CURRENCIES);
    }, []);
    return <Layout>{children}</Layout>;
};

export default MainLayout;
