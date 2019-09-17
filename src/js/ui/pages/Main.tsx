import React, {useEffect, useState} from "react";
import AppStore, {Currencies, Wallet} from "@interfaces/AppStore";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import styled from "styled-components";
import History from "@ui/components/History";
import {TOP_LAYOUT_HEIGHT} from "@helpers/constants";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    background: linear-gradient(to top,#66f, #88f);
    height: ${TOP_LAYOUT_HEIGHT};
    position: relative;
`;

const Wrapper = styled.div`
    width:400px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    height: 100%;
`;

const CurrencyLabel = styled.div`
    text-decoration: none;
    margin: 0 4px;
`;

const ExchangeLink = styled(Link)`
    position: absolute;
    bottom: 20px;
    font-size: 18px;
    text-decoration: none;
    &:visited {
    color: #fff;
    }
    :hover{
        color: #62f;
    }
    transform: translateX(190px);
`;

const Row = styled.div < {active: boolean} > `
    margin: 0 12px;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 0 1 100px;
    height: 100px;
    cursor: pointer;
    transition: color 0.2s ease-in;
    :hover{
        color: #62f;
    }
    ${({active}) => active ? `
        position:absolute;
        bottom: 80px;
        font-size: 40px;
        transform: translateX(150px);
        :hover {
            color: #fff;
            cursor: initial;
        }
    `
    : ""}
`;

const Amount = styled.div`
    display: inline;
    font-size: 14px;
    line-height: 18px;
    span{
    font-size: 18px;
    }
`;

const Main = () => {
    const [currency, setCurrency] = useState("USD");
    const {balance} = useSelector<AppStore,
        Pick<Wallet, "balance" | "history"> & Pick<Currencies, "rates" | "timestamp">>
    (({currencies: {rates = {}, timestamp}, wallet: {history, balance}}) => ({rates, timestamp, history, balance}));

    return (
        <>
            <Layout>
                <Wrapper>
                    {Object.entries(balance).map(([key, value]) => (
                        <Row key={key} onClick={() => setCurrency(key)} active={currency === key}>
                            <CurrencyLabel>
                                <i className={`icon-${key}`}/>
                            </CurrencyLabel>
                            {value.toString().split(".").map((item, index) => index
                                ? <Amount key={index}>
                                    {item}
                                </Amount> :
                                <Amount><span key={index}>{item}.</span></Amount>)}
                        </Row>
                    ))}
                    <ExchangeLink to={`/exchange/${currency}`}><i className="icon-exchange"/></ExchangeLink>
                </Wrapper>
            </Layout>
            <History currencyFrom={currency}/>
        </>
    );
};

export default Main;

// 120a86af69014440917c26bcc5da3d4d
