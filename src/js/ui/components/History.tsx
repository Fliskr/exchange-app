import React from "react";
import styled from "styled-components";
import { Wallet } from "@interfaces/AppStore";
import { useSelector } from "react-redux";
import AppStore from "@interfaces/AppStore";
import moment from "moment";
import Container from "react-bootstrap/es/Container";

const Layout = styled(Container)`
    background: rgba(0, 0, 0, 0.5);
    height: 300px;
    overflow: auto;
    border: 1px solid #fff;
    box-shadow: 0 0 6px 3px #fff;
    `;
    
    const HistoryTitle = styled.h2`
    margin: 12px auto;
    font-weight: 400;
    color:#fff;
    display: flex;
    justify-content: center;;
`;

const HistoryItem = styled.div`
    color: #fff;
    margin: 12px auto;
    width: 400px;
    display: flex;
    flex-direction: column;
    :not(:first-of-type) {
        border-top: 1px solid lightblue;
    }
`;

const HistoryChanges = styled.span<{ positive: boolean }>`
    color: ${({ positive = true }) => (positive ? "#844" : "#288")};
    margin: 0 12px;
    width: 40%;
    `;

const HistoryDate = styled.div`
    font-size: 18px;
    margin: 0 auto;
`;

interface Props {
    currencyFrom: string;
}

const History = ({ currencyFrom }: Props) => {
    const { history } = useSelector<AppStore, Pick<Wallet, "history">>(
        ({ wallet: { history } }) => ({ history })
    );
    return (
        <Layout>
            <HistoryTitle>CHANGES HISTORY</HistoryTitle>
            {history
                .filter(item => item.changes[currencyFrom])
                .map((item, index) => (
                    <HistoryItem key={index}>
                        <HistoryDate>
                            {moment(item.datetime).format("DD MMMM YYYY")}
                        </HistoryDate>
                        {Object.entries(item.changes).map(([key, value]) => (
                            <HistoryChanges positive={value > 0} key={key}>
                               {key}  {parseFloat(value).toFixed(2)} <i className={`icon-${key}`} />
                            </HistoryChanges>
                        ))}
                    </HistoryItem>
                ))}
        </Layout>
    );
};

export default History;
