'use client'
import React from "react";

interface Color {
    id: number;
    bg: string;
    dot: string;
}

interface ColorPickerProps {
    selectedColor?: any | null;
    colors?: Color[];
    availableColors?: number[]; // which color ids are selectable
    onColorSelect?: (color: string, id: number) => void;
    disabled?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
    selectedColor,
    colors,
    availableColors,
    onColorSelect,
    disabled = false,
}) => {
    return (
        <div className={`flex items-center gap-1.5 ${disabled ? "opacity-50" : ""}`}>
            {colors?.map((color) => {
                const isIndividuallyDisabled = !availableColors?.includes(color.id);
                const isButtonDisabled = disabled || isIndividuallyDisabled;

                return (
                    <button
                        type="button"
                        title={color.id.toString()}
                        key={color.id}
                        onClick={() => {
                            if (!isButtonDisabled) {
                                if (onColorSelect) onColorSelect(color.bg, color.id);
                            }
                        }}
                        disabled={isButtonDisabled}
                        className={` flex items-center justify-center duration-500 transition-all rounded-full ${color.bg} transition
                        ${selectedColor === color.bg && !isButtonDisabled
                                ? "w-[24px] xl:w-[28px] h-[24px] xl:h-[28px]"
                                : "ring-transparent w-[18px] xl:w-[22px] h-[18px] xl:h-[22px]"
                            }`}
                    >
                        <span className={`w-2.5 h-2.5 rounded-full ${color.dot}`} />
                    </button>
                );
            })}
        </div>
    );
};

export default ColorPicker;