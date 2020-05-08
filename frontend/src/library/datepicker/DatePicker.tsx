import React, { useEffect, useRef, useState } from "react";
import Pikaday from "pikaday";
import Input from "library/input/Input";
import IconButton from "library/icon-button/IconButton";
import Icons from "library/icons/Icons";
import "./datepicker.scss";
import useTranslations from "app/locale/__hooks/useTranslations";

interface DatePickerProps {
    initialValue?: Date;
    onSelect: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = props => {
    const { translate } = useTranslations();
    const pickadayRef = useRef();
    const [date, setDate] = useState(props.initialValue ?? new Date());
    const [picker, setPicker] = useState(null as Pikaday | null);

    useEffect(() => {
        const pickerTemp = new Pikaday({
            field: pickadayRef.current,
            onSelect(date: Date) {
                setDate(date);
                props.onSelect(date);
            },
            i18n: {
                previousMonth: "",
                nextMonth: "",
                months: translate("DATEPICKER.MONTHS")?.split(","),
                weekdays: translate("DATEPICKER.WEEKDAYS")?.split(","),
                weekdaysShort: translate("DATEPICKER.WEEKDAYS_SHORT")?.split(","),
            },
        });
        setPicker(pickerTemp);
        // eslint-disable-next-line
    }, []);

    function showPicker() {
        picker?.show?.();
    }

    return (
        <div>
            <Input
                label="Data"
                name="date"
                initialValue={date?.toLocaleDateString()}
                actionIcon={<IconButton svgIcon={Icons.CalendarIcon} onClick={showPicker} reference={pickadayRef} />}
            />
        </div>
    );
};

export default DatePicker;
