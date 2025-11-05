import { useTranslations } from "next-intl";
import { useState, useEffect, type FC } from "react";
import Select, { type SingleValue, type MultiValue, type StylesConfig } from "react-select";

interface OptionType {
    id: number;
    name: string;
}

interface CustomSelectMenuProps {
    options?: OptionType[];
    selected?: boolean;
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

const MainSelectMenu: FC<CustomSelectMenuProps> = ({
    options = [],
    name,
    isMultiChoices = false,
    label,
    isDisabled,
    placeholder,
    onChange,
    customstyle,
    defaultData,
    loading,
    error,
    fullyRounded,
    width,
    higth,
    isFormed,
}) => {
    const t = useTranslations();
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
            padding: '0px 15px 0px 5px',
            height: fullyRounded ? "46px" : '47px',
            borderRadius: fullyRounded ? "9999999px" : "12px",
            borderColor: error
                ? "red"
                : state.isFocused
                    ? "#E9ECEF" :
                    isFormed ? "#E9ECEF"
                        : '#E9ECEF',
            borderWidth: '1px',
            boxShadow: state.isFocused ? "" : "0 0 0 0px rgba(156, 107, 50, 0.4)",
            "&:hover": {
                borderColor: error ? "red" : "#E9ECEF",
            },
        }),
        menu: (provided) => ({
            ...provided,
            color: "#333",
            zIndex: 1000,
        }),
        container: (provided) => ({
            ...provided,
            borderRadius: "80px",
            ...customstyle,
        }),
        menuPortal: (provided) => ({
            ...provided,
            zIndex: 1000,
            border: '0px'
        }),
    };
    return (
        <div
            style={{
                width: `${width}`,
                height: `${higth}`,
            }}
        >
            {label ? (
                <h1 className="text-[#495057] mb-1.5 text-[16px] font-bold "
                >
                    {label}
                </h1>
            ) : null}

            <Select
                placeholder={placeholder || label && t(`select`, { label: `${label}` }) || t(`selectFromMenu`)}
                isDisabled={!!isDisabled}
                isSearchable={true}
                isClearable={false}
                isLoading={loading}
                isMulti={isMultiChoices}
                defaultValue={selectedValue}
                name={name}
                className="text-nowrap"
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
            {error && (
                <div className="ps-2 text-red-500">{t(`${error}`)}</div>
            )}
        </div>
    );
};

export default MainSelectMenu;