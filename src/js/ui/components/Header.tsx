import React from "react";
import Col from "react-bootstrap/es/Col";
import Row from "react-bootstrap/es/Row";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import AppStore, {Wallet} from "@interfaces/AppStore";
import Icon from "@ui/components/Icon";

const Home = styled(Link)`
    margin: 20px;
    display: block;
    color:#fff;
    text-decoration: none;
`;

const Rates = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Rate = styled.div`
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    margin: 0 12px;
    i{
        margin: 2px 4px 0 ;
    }
`;

const HeaderContainer = styled(Row)`
    border-bottom: 1px solid #fff;
`;
const Header = () => {
    const {balance} = useSelector<AppStore, Pick<Wallet, "balance">>(({wallet: {balance}}) => ({balance}));
    return <HeaderContainer>
        <Col>
            <Home to="/">
                <Icon size={24} name={"home"}/>
            </Home>
        </Col>
        <Col xs={8}>
            <Rates>
                {Object
                    .entries(balance)
                    .map(([key, value]) => <Rate key={key}><Icon name={key}/>{value}</Rate>)
                }
            </Rates>
        </Col>
        <Col/>
    </HeaderContainer>
};

export default Header;