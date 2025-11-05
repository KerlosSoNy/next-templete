import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import type { FC } from "react"
import Select from "react-select";
import type { SingleValue, MultiValue, StylesConfig } from "react-select";

interface OptionType {
    id: number;
    name: string;
}

interface CustomSelectMenuProps {
    options?: OptionType[];
    selected?: boolean;
    isCart?: boolean;
    name?: string;
    sx?: object;
    isMultiChoices?: boolean;
    label?: string;
    isDisabled?: boolean;
    placeholder?: string;
    onChange?: (
        value: SingleValue<OptionType> | MultiValue<OptionType>,
        name?: string
    ) => void;
    defaultData?: number | undefined | null;
    customstyle?: object;
    loading?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    fullyRounded?: boolean;
    error?: string;
    width?: string;
    higth?: string;
    isFormed?: boolean;
}

const CustomSelectMenuSignUp: FC<CustomSelectMenuProps> = ({
    options = [],
    name,
    isMultiChoices = false,
    label,
    isDisabled,
    placeholder,
    onChange,
    customstyle,
    defaultData,
    isCart,
    loading,
    error,
}) => {
    const t = useTranslations();
    const locale = useLocale();
    const [selectedValue, setSelectedValue] = useState<any>(null);

    useEffect(() => {
        if (defaultData !== undefined) {
            const updatedSelectedObject =
                options.length > 0 &&
                options?.find((option) => option.id === defaultData);
            setSelectedValue(updatedSelectedObject || null);
        } else {
            setSelectedValue(null)
        }
    }, [defaultData, options]);

    const handleOnChange = (
        selectedOption: SingleValue<OptionType> | MultiValue<OptionType>
    ) => {
        setSelectedValue(selectedOption);
        if (onChange) onChange(selectedOption, name);
    };

    const customStyles: StylesConfig<OptionType, boolean> = {
        control: (provided, state) => ({
            ...provided,
            color: "#333",
            padding: locale === "en" ? '0px 5px 0px 15px' : '0px 15px 0px 5px',
            backgroundColor: isCart ? "#F4F4F5" : "#F6F6F6",
            height: isCart ? "52px" : '52px',
            borderRadius: isCart ? "11px" : "8px",
            borderColor: error ? 'red' : state.isFocused ? "#F15A29" : '#00000019',
            borderWidth: isCart ? '0px' : '2px',
            boxShadow: state.isFocused ? "" : "0 0 0 0px rgba(156, 107, 50, 0.4)",
            "&:hover": {
                borderColor: error ? "red" : state.isFocused ? "#F15A29" : "#00000019",
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#333", // ✅ Change this to your desired color
        }),
        menu: (provided) => ({
            ...provided,
            color: "#333",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // ✅ shadow here
            borderRadius: "8px", // optional: make the menu rounded
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: "#333", // Arrow color
            "&:hover": {
                color: "#333",
            },
        }),
        container: (provided) => ({
            ...provided,
            borderRadius: "80px",
            color: "#333",
            ...customstyle,
        }),
        menuPortal: (provided) => ({
            ...provided,
            color: "#333",
            zIndex: 1000,
            border: '0px'
        }),
    };
    return (
        <div className="bg-white/10 py-[4px] rounded-[5px] border-[1px] border-white/10 h-[52px]">
            {label ? (
                <h1 className="text-[18px] font-[400] mb-2.5 text-[#000000]">
                    {label}
                </h1>
            ) : null
            }

            <Select
                placeholder={<div className="text-[##333] -ms-2">{placeholder || label && t(`select`, { label: `${label}` }) || t(`selectFromMenu`)}</div>}
                isDisabled={!!isDisabled}
                isSearchable={true}
                isClearable={false}
                isLoading={loading}
                isMulti={isMultiChoices}
                formatOptionLabel={(option) => (
                    <div className="flex items-center">
                        {option.icon && (
                            <img
                                src={option.icon}
                                alt={option.label}
                                className="w-[24px] h-[24px] object-cover rounded-[2px] me-6"
                            />
                        )}
                        <span>{option.name}</span>
                    </div>
                )}
                defaultValue={selectedValue}
                name={name}
                className="text-nowrap !text-[#333]"
                value={selectedValue}
                onChange={handleOnChange}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id.toString()}
                options={
                    options?.length > 0
                        ? options?.map((item) => ({ ...item, name: t(item.name) }))
                        : []
                }
                styles={customStyles}
            />
            {
                error && (
                    <div className="ps-2 text-red-500">{t(`${error}`)}</div>
                )
            }
        </div >
    );
};

export default CustomSelectMenuSignUp;