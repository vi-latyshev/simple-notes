import { TextField } from '@material-ui/core';
import { useController } from 'react-hook-form';

import type { TextFieldProps } from '@material-ui/core';
import type { UseControllerProps, FieldValues } from 'react-hook-form';

type MaterialTexFieldProps = Omit<TextFieldProps, 'name' | 'defaultValue'>;

export interface InputTextProps<T> extends UseControllerProps<T>, MaterialTexFieldProps {
    label: string;
}

export const InputText = <T extends FieldValues>(props: InputTextProps<T>) => {
    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        field: { value, ...inputProps }, // remove value for change to uncontrollable
        fieldState: { error },
        formState: { isSubmitting },
    } = useController<T>(props);

    const {
        name, label, disabled,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        control, // remove from props
        ...rest
    } = props;

    return (
        <TextField
            fullWidth
            id={name}
            type="text"
            label={label}
            disabled={isSubmitting || disabled}
            error={error !== undefined}
            helperText={error?.message}
            {...inputProps}
            {...rest}
        />
    );
};
