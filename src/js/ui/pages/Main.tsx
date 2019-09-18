import React, {useState} from "react";
import AppStore from "@interfaces/AppStore";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import styled from "styled-components";
import History from "@ui/components/History";
import Container from "react-bootstrap/es/Container";
import Icon from "@ui/components/Icon";
import Carousel from "react-bootstrap/es/Carousel";
import Row from "react-bootstrap/es/Row";

const NarrowCarousel = styled(Carousel)`
    width: 300px;
    margin: 0 auto;
`;

const ExchangeLink = styled(Link)`
    color:#fff;
    font-size: 18px;
    text-decoration: none;
    margin: 12px auto;
    :hover{
        text-decoration: none;
    }
`;

const CarouselItem = styled(Carousel.Item)`
    height: 140px;
`;

const Indicators = styled.div`
    position: relative;
    padding: 12px 0;
    ul{
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        padding-left: 0;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    }
    li {
        margin: 0 12px;
        padding: 4px;
        color:#fff;
        cursor: pointer;
        :hover{
            color: #f39c12;
        }
    }
`;

const Main = () => {
    const [currency, setCurrency] = useState("USD");
    const balance = useSelector<AppStore, AppStore["wallet"]["balance"]>(({wallet: {balance}}) => balance);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
        setCurrency(Object.keys(balance)[selectedIndex])
    };

    return (
        <Container>
            <NarrowCarousel activeIndex={index} onSelect={handleSelect} controls={false} indicators={false} interval={null}>
                {Object.entries(balance).map(([key, value]) => (
                    <CarouselItem key={key} onClick={() => setCurrency(key)}>
                        <Carousel.Caption>
                            <Icon name={key} size={48}/>
                            <div>Your balance: {value}</div>
                        </Carousel.Caption>
                    </CarouselItem>
                ))}
            </NarrowCarousel>
            <Indicators>
                <ul>
                    {Object.keys(balance).map((key, index) => <li onClick={() => handleSelect(index)} key={key}
                                                                  data-slide-to={index}>
                        <Icon name={key}/>
                    </li>)}
                </ul>
            </Indicators>
            <Row>
                <ExchangeLink to={`/exchange/${currency}`}>
                    Exchange {currency} <Icon name="exchange" size={24}/>
                </ExchangeLink>
            </Row>
            <History currencyFrom={currency}/>
        </Container>
    );
};

export default Main;