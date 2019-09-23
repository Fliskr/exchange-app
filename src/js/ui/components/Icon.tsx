import React from "react";
import styled from "styled-components";

interface Props {
    size?: number;
    name: string;
}
type Size = Pick<Props, "size">;

const I = styled.i<Size>`
    ${({size}) => size ? `font-size:${size}px;` : ""}
`;

const Icon = ({size, name}: Props) => <I size={size} className={`icon-${name}`}/>

export default Icon;