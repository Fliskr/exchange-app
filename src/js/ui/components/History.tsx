import React from "react";
import styled from "styled-components";
import { Wallet } from "@interfaces/AppStore";
import { useSelector } from "react-redux";
import AppStore from "@interfaces/AppStore";
import moment from "moment";
import Container from "react-bootstrap/es/Container";

const Layout = styled(Container)`
    background: rgba(0,0,0,0.5);
    max-height: 400px;
    overflow: auto;
`;

const HistoryRow = styled.div`
    color: #fff;
    margin: 12px auto;
    width: 400px;
    :not(:first-of-type) {
        border-top: 1px solid lightblue;
    }
`;

const HistoryChanges = styled.div<{ positive: boolean }>`
    color: ${({ positive = true }) => (positive ? "#0eff70" : "#ff2d28")};
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
            {history
                .filter(item => item.changes[currencyFrom])
                .map(item => (
                    <HistoryRow key={item.datetime}>
                        <div>
                            {moment(item.datetime).format(
                                "MMM dddd YYYY hh:mm:ss "
                            )}
                        </div>
                        {Object.entries(item.changes).map(([key, value]) => (
                            <HistoryChanges positive={value > 0} key={key}>
                                <i className={`icon-${key}`} /> {value}
                            </HistoryChanges>
                        ))}
                    </HistoryRow>
                ))}
        </Layout>
    );
};

export default History;
