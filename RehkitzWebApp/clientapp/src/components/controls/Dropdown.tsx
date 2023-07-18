import { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

interface Option {
    label: string;
    value: string;
}

interface Props {
    entry: string;
    options: Option[];
    value: string
    onChange: (selectedValue: string) => void;
}

export const Dropdown = ({ entry, options, value, onChange }: Props) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    useEffect(() => {
        const selected = options.find(option => option.value === value);
        setSelectedOption(selected || null);
    }, [options, value]);

    const handleChange = (selectedOption: Option | null) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            onChange(selectedOption.value);
        }
    };

    return (
        <RowContainer>
            <Entry>{entry}</Entry>
            <SelectBox>
                <Select
                    options={options}
                    styles={customStyles}
                    onChange={handleChange}
                    value={selectedOption}
                    placeholder="Auswählen..."
                />
            </SelectBox>
        </RowContainer>
    );
};

const RowContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-left: 0.75em;
`

const Entry = styled.div`
    display: flex;
    justify-content: center;
    flex: 1;
    margin-left: 15px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    max-width: 200px;
    line-height: 50px;
    color: #fffecb;
`

const SelectBox = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
`

const customStyles = {
    menu: (provided: any) => ({
        ...provided,
        width: "100%",
    }),
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      backgroundColor: "transparent",
      color: "#7d6b52",
      width: "100%",
      fontSize: 15,
    }),
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "transparent",
      fontSize: 20,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#fffecb",
      fontSize: 20,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#fffecb",
      fontSize: 20,
    }),
};