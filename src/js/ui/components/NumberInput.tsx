import React from "react";
import {Field, FieldProps, ErrorMessage} from "formik";
import styled from "styled-components";

export const Input = styled.input`
  border-radius: 5px;
  outline: none;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 14px;
  padding: 4px 8px;
  position: relative;
`;

const Error = styled.div`
  position: absolute;
  color: red;
  bottom: 0px;
  left: 0;
`;

const Layout = styled.div`
  position: relative;
  padding-bottom: 18px;
`;

interface Props {
    name: string;

    [key: string]: any;
}

const NumberInput = ({name, ...rest}: Props) => {
    return (
        <Field name={name}>
            {({field: {value = "", onBlur}, form}: FieldProps) => (
                <Layout>
                    <Input
                        type="text"
                        onBlur={(e) => onBlur(e)}
                        value={value}
                        onKeyDown={e => {
                            let nvalue = parseFloat(value);
                            if (nvalue < 0) {
                                nvalue = 0;
                            }
                            let multiplier = 1;
                            if (e.ctrlKey) {
                                multiplier = 10;
                            }
                            if (e.shiftKey) {
                                multiplier = 0.01;
                            }
                            switch (e.which) {
                                case 38:
                                    form.setFieldValue(name, (nvalue + multiplier).toFixed(2));
                                    break;
                                case 40:
                                    form.setFieldValue(
                                        name,
                                        nvalue - multiplier < 0
                                            ? "0.00"
                                            : (nvalue - multiplier).toFixed(2)
                                    );
                                    break;
                            }
                        }}
                        onChange={e => {
                            const nValue = e.target.value;
                            let [dollar = "", cent = "00"] = nValue.split(".");
                            dollar = dollar.replace(/[^0-9]/g, "");
                            cent = cent.replace(/[^0-9]/g, "");
                            if (!dollar) {
                                dollar = "0";
                            }
                            if (cent.length === 1) {
                                cent = cent + "0";
                            }
                            if (cent.length === 0) {
                                cent = "00";
                            }
                            cent = cent.slice(0, 2);
                            form.setFieldValue(name, `${dollar}.${cent}`);
                            e.target.value = `${dollar}.${cent}`;
                        }}
                        {...rest}
                    />
                    <ErrorMessage name={name} component={Error}/>
                </Layout>
            )}
        </Field>
    );
};

export default NumberInput;
