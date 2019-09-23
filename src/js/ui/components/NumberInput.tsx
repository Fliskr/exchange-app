import React from "react";
import { Field, FieldProps, ErrorMessage } from "formik";
import styled from "styled-components";
import NumericInput from "react-numeric-input";

export const Input = styled(NumericInput)`
    border-radius: 5px;
    outline: none;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 14px;
    padding: 4px 8px;
    position: relative;
    width: 150px;
    text-align: right;
    :not(:disabled) {
        cursor: pointer;
    }
    border: 1px solid transparent;
    :focus,
    :hover:not(:disabled) {
        border-bottom-color: #fff;
    }
`;

interface Props {
    name: string;
    [key: string]: any;
}

const NumberInput = ({ name, ...rest }: Props) => {
    return (
        <Field name={name}>
            {({ field: { value = "", onBlur }, form }: FieldProps) => (
                <Input
                    value={value}
                    min={0}
                    step={1}
                    style={false}
                    precision={2}
                    onChange={val => {
                        form.setFieldValue(name, val);
                    }}
                    {...rest}
                />
            )}
        </Field>
    );
};

export default NumberInput;
