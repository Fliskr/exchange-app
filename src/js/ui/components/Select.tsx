import React, {FC} from "react";
import {Field, FieldProps} from "formik";
import styled from "styled-components";
import {useSelect, UseSelectInterface} from "downshift";

interface Props {
    items: string[];
    name: string;
    setFieldValue: FieldProps["form"]["setFieldValue"];
}

const Select = styled.div`
position:relative;
    ul {
        max-height: 200px;
        overflow-y: auto;
        width: 150px;
        position: absolute;
        margin: 0px;
        border-top: 0px;
        z-index: 99999;
        list-style: none;
        padding: 0;
        border: none;
        background: #1857af;
    }
    li {
        color: #fff;
        padding: 4px 8px;
        cursor: pointer;
        i {
            margin-left: 4px;

        }
    }
    button{
    cursor: pointer;
    border: none;
    background: transparent;
    color: #fff;
    font-size: 24px;
    outline: none;
    }
`;

const DropdownSelect: FC<Props> = ({
    items = [],
    name,
    setFieldValue = () => {},
    children
}) => {
    const {
        isOpen,
        getToggleButtonProps,
        getMenuProps,
        highlightedIndex,
        getItemProps,
    } = useSelect<string>({
        items,
        onSelectedItemChange: ({selectedItem}: {
            selectedItem: string;
        }) => setFieldValue(name, selectedItem),
    } as unknown as UseSelectInterface<string>);
    return (
        <Field name={name}>
            {({field: {value}}: FieldProps) => (
                <Select id={name}>
                    {children}
                    <button type="button" {...getToggleButtonProps()}><i className={`icon-${value}`}/></button>
                    <ul {...getMenuProps()}>
                        {isOpen &&
                        items.map((option, index) => (
                            <li
                                style={highlightedIndex === index ? {backgroundColor: "#bde4ff"} : {}}
                                key={`${option}${index}`}
                                {...getItemProps({item: option, index})}
                            >
                                <i className={`icon-${option}`}/>
                            </li>
                        ))}
                    </ul>
                </Select>
            )}
        </Field>
    );
};

export default DropdownSelect;
