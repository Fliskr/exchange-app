import React from "react";
import styled from "styled-components";

interface Props {
    from: string;
    to: string;
    rateFrom: number;
    rateTo: number;
}

const Layout = styled.sub`
    color: #fff;
    position: absolute;
    width: 200px;
    bottom: -20px;
    left: 120px;
    height: 6px;
`;

const Rate = ({ from, to, rateFrom, rateTo }: Props) => {
    const rate = (rateTo / rateFrom).toFixed(2);
    if (from === to) {
        return null;
    }
    return (
        <Layout>
            1 {from} = {rate} {to}
        </Layout>
    );
};

export default Rate;
