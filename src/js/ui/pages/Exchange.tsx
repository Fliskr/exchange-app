import React, {useRef} from "react";
import styled from "styled-components";
import NumberInput from "@ui/components/NumberInput";
import {Formik, FormikValues, FormikErrors} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {EXCHANGE_FROM_TO} from "@actions/wallet";
import AppStore, {Wallet, Currencies} from "@interfaces/AppStore";
import {Link, RouteComponentProps} from "react-router-dom";
import Select from "@ui/components/Select";
import History from "@ui/components/History";
import Container from "react-bootstrap/es/Container";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const ExchangeInput = styled(NumberInput)`
    padding: 12px;
    font-size: 24px;
    font-weight: 400;
`;

const Sub = styled.sub`
    position: absolute;
    bottom: -10px;
    color: #fff;
    width: 200px;
    i {
        margin-left: 2px;
    }
`;

const Submit = styled.button`
    border-radius: 5px;
    border: none;
    color: #1ac039;
    padding: 12px;
    cursor: pointer;
    outline: none;
    font-size: 18px;
    font-weight: 400;
    margin: 12px auto;
    background: transparent;
    &:disabled {
        color: lightgray;
        cursor: initial;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 10px auto;
    div:first-of-type {
        flex: 0 1 200px;
        min-width: 100px;
        height: 60px;
    }
    div:last-of-type {
        height: 60px;
        padding: 0;
        input {
            padding: 0;
        }
    }
`;

const generateInitialValues = (currency: string) => ({
    CurrencyFrom: currency.toUpperCase(),
    CurrencyTo: currency.toUpperCase(),
    CurrencyFromValue: "1.00",
    CurrencyToValue: "1.00"
});

interface TParams {
    currency: string;
}

const Exchange = ({
    match: {
        params: {currency}
    }
}: RouteComponentProps<TParams>) => {
    const dispatch = useDispatch();
    const {balance, rates} = useSelector<AppStore,
        Pick<Wallet, "balance"> & Pick<Currencies, "rates">>(({wallet: {balance}, currencies: {rates = {}}}) => ({
        balance,
        rates,
    }));
    const formik = useRef(null);
    const currencyFrom = formik.current ? formik.current.state.values.CurrencyFrom : currency;
    const onSubmit = (values: FormikValues) => {

        const {
            CurrencyFrom,
            CurrencyTo,
            CurrencyFromValue
        } = values;
        dispatch({
            type: EXCHANGE_FROM_TO,
            payload: {
                [CurrencyFrom]: -parseFloat(CurrencyFromValue),
                [CurrencyTo]:
                (CurrencyFromValue * rates[CurrencyTo]) / rates[CurrencyFrom]
            }
        });
    };

    const validate = (values: FormikValues) => {
        const errors: FormikErrors<FormikValues> = {};
        if (values.CurrencyFromValue > balance[values.CurrencyFrom]) {
            errors.CurrencyFromValue =
                "Amount cannot be less than amount in your wallet";
        }
        return errors;
    };
    return (
        <Container>
            <Layout>
                <Formik
                    ref={formik}
                    initialValues={generateInitialValues(currency)}
                    validate={validate}
                    onSubmit={(values: FormikValues) => onSubmit(values)}
                    validateOnBlur={true}
                >
                    {({handleSubmit, values, setFieldValue}) => (
                        <Form onSubmit={handleSubmit}>
                            {rates && (
                                <>
                                    <Row>
                                        <Select
                                            setFieldValue={setFieldValue}
                                            name="CurrencyFrom"
                                            items={Object.keys(rates)}>
                                            <Sub>
                                                You have: {balance[values.CurrencyFrom]}
                                                <i className={`icon-${values.CurrencyFrom}`}/>
                                            </Sub>

                                        </Select>
                                        <ExchangeInput name="CurrencyFromValue"/>
                                    </Row>
                                    <Row>
                                        <Select
                                            setFieldValue={setFieldValue}
                                            name="CurrencyTo"
                                            items={Object.keys(rates)}>
                                            <Sub>
                                                You have: {balance[values.CurrencyTo]}
                                                <i className={`icon-${values.CurrencyTo}`}/>
                                            </Sub>
                                        </Select>
                                        <ExchangeInput
                                            value={(
                                                (values.CurrencyFromValue * rates[values.CurrencyTo]) /
                                                rates[values.CurrencyFrom]
                                            ).toFixed(2)}
                                            disabled={true}
                                            name="CurrencyToValue"
                                        />
                                    </Row>
                                    <Submit type="submit" disabled={values.CurrencyFrom === values.CurrencyTo}><i
                                        className="icon-exchange"/></Submit>

                                </>
                            )}
                        </Form>
                    )}
                </Formik>

            </Layout>
            <History currencyFrom={currencyFrom}/>
        </Container>
    );
};

export default Exchange;
