import React from "react";
import Col from "react-bootstrap/es/Col";
import Row from "react-bootstrap/es/Row";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AppStore, { Wallet } from "@interfaces/AppStore";
import Icon from "@ui/components/Icon";
import device from "@helpers/breakpoints";

const Home = styled(Link)`
    margin: 20px;
    display: block;
    color: #fff;
    text-decoration: none;
    @media ${device.tablet} {
        margin-top: 32px;
    }
`;

const Rates = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    @media ${device.tablet} {
        flex-direction: column;
        justify-content: flex-end;
    }
`;

const Rate = styled.div`
    color: #fff;
    font-size: 24px;
    font-weight: 400;
    margin: 0 24px;
    i {
        margin: 0px 4px 0;
    }
    @media ${device.tablet} {
        font-size: 18px;
        flex-direction: row;
        justify-content: flex-start;
        width: 100px;
    }
`;

const HeaderContainer = styled(Row)`
    border-bottom: 2px solid #fff;
    box-shadow: 0px 4px 23px 1px cyan;
`;
const Header = () => {
    const { balance } = useSelector<AppStore, Pick<Wallet, "balance">>(
        ({ wallet: { balance } }) => ({ balance })
    );
    return (
        <HeaderContainer>
            <Col>
                <Home to="/">
                    <Icon size={24} name={"home"} />
                </Home>
            </Col>
            <Col xs={8}>
                <Rates>
                    {Object.entries(balance).map(([key, value]) => (
                        <Rate key={key}>
                            <Icon name={key} />
                            {value}
                        </Rate>
                    ))}
                </Rates>
            </Col>
            <Col />
        </HeaderContainer>
    );
};

export default Header;
