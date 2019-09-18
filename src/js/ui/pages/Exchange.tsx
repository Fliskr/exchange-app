import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import NumberInput from "@ui/components/NumberInput";
import { Formik, FormikValues, FormikErrors } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { EXCHANGE_FROM_TO } from "@actions/wallet";
import AppStore, { Wallet, Currencies } from "@interfaces/AppStore";
import { RouteComponentProps } from "react-router-dom";
import Select from "@ui/components/Select";
import History from "@ui/components/History";
import Container from "react-bootstrap/es/Container";
import Icon from "@ui/components/Icon";
import Alert from "react-bootstrap/es/Alert";
import { BASE_CURRENCY } from "@helpers/constants";
import Rated from "@ui/components/Rate";

const Rate = styled(Rated)`
    width: 200px;
`;

const Layout = styled(Container)`
    display: flex;
    flex-direction: column;
    padding: 24px 0;
`;

const SToast = styled(Alert)`
    position: absolute;
    right: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const ExchangeInput = styled(NumberInput)`
    font-size: 24px;
    font-weight: 400;
`;

const Sub = styled.sub`
    position: absolute;
    bottom: -20px;
    color: #fff;
    width: 200px;
    i {
        margin-left: 2px;
    }
`;

const Submit = styled.button`
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: none;
    color: #fff;
    padding: 24px 38px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 400;
    margin: 24px auto;
    background: transparent;
    border-top: 1px solid #fff;
    i {
        margin-left: 4px;
    }
    :hover {
        outline: none;
        color: #f39c12;
    }
    &:disabled {
        color: lightgray;
        cursor: initial;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
`;

const generateInitialValues = (currency: string) => ({
    CurrencyFrom: currency.toUpperCase(),
    CurrencyTo: BASE_CURRENCY,
    CurrencyFromValue: "1.00",
    CurrencyToValue: "1.00"
});

interface TParams {
    currency: string;
}

const Exchange = ({
    match: {
        params: { currency }
    }
}: RouteComponentProps<TParams>) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const { balance, rates } = useSelector<
        AppStore,
        Pick<Wallet, "balance"> & Pick<Currencies, "rates">
    >(({ wallet: { balance }, currencies: { rates = {} } }) => ({
        balance,
        rates
    }));
    const formik = useRef(null);
    const currencyFrom = formik.current
        ? formik.current.state.values.CurrencyFrom
        : currency;
    const onSubmit = (values: FormikValues) => {
        const { CurrencyFrom, CurrencyTo, CurrencyFromValue } = values;
        setShow(false);
        setError("");
        if (CurrencyFromValue > balance[currencyFrom]) {
            setShow(true);
            setError("Amount cannot be less than amount in your wallet");
            return;
        }
        dispatch({
            type: EXCHANGE_FROM_TO,
            payload: {
                [CurrencyFrom]: -parseFloat(CurrencyFromValue),
                [CurrencyTo]: parseFloat(
                    (
                        (CurrencyFromValue * rates[CurrencyTo]) /
                        rates[CurrencyFrom]
                    ).toFixed(2)
                )
            }
        });
    };

    const validate = (values: FormikValues) => {
        const errors: FormikErrors<FormikValues> = {};
        return errors;
    };
    return (
        <Layout>
            <Formik
                ref={formik}
                initialValues={generateInitialValues(currency)}
                validate={validate}
                onSubmit={(values: FormikValues) => onSubmit(values)}
                validateOnBlur={true}
            >
                {({ handleSubmit, values, setFieldValue }) => (
                    <Form onSubmit={handleSubmit}>
                        {rates && (
                            <>
                                <Row>
                                    <Select
                                        setFieldValue={setFieldValue}
                                        name="CurrencyFrom"
                                        items={Object.keys(rates)}
                                    >
                                        <Sub>
                                            You have:{" "}
                                            {balance[values.CurrencyFrom]}
                                            <i
                                                className={`icon-${values.CurrencyFrom}`}
                                            />
                                        </Sub>
                                        <Rate
                                            from={values.CurrencyFrom}
                                            to={values.CurrencyTo}
                                            rateFrom={
                                                rates[values.CurrencyFrom]
                                            }
                                            rateTo={rates[values.CurrencyTo]}
                                        />
                                    </Select>
                                    <ExchangeInput name="CurrencyFromValue" />
                                </Row>
                                <Row>
                                    <Select
                                        setFieldValue={setFieldValue}
                                        name="CurrencyTo"
                                        items={Object.keys(rates)}
                                    >
                                        <Sub>
                                            You have:{" "}
                                            {balance[values.CurrencyTo]}
                                            <i
                                                className={`icon-${values.CurrencyTo}`}
                                            />
                                        </Sub>
                                        <Rate
                                            from={values.CurrencyTo}
                                            rateFrom={rates[values.CurrencyTo]}
                                            rateTo={rates[values.CurrencyFrom]}
                                            to={values.CurrencyFrom}
                                        />
                                    </Select>
                                    <ExchangeInput
                                        value={(
                                            (values.CurrencyFromValue *
                                                rates[values.CurrencyTo]) /
                                            rates[values.CurrencyFrom]
                                        ).toFixed(2)}
                                        disabled={true}
                                        name="CurrencyToValue"
                                    />
                                </Row>
                                <Submit
                                    type="submit"
                                    disabled={
                                        values.CurrencyFrom ===
                                        values.CurrencyTo
                                    }
                                >
                                    Exchange <Icon name="exchange" />
                                </Submit>
                            </>
                        )}
                    </Form>
                )}
            </Formik>
            <SToast
                show={show}
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
            >
                {error}
            </SToast>
            <History currencyFrom={currencyFrom} />
        </Layout>
    );
};

export default Exchange;
