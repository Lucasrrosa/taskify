import { type InputBaseComponentProps, TextField } from '@mui/material'
import { type HTMLInputTypeAttribute, type ReactNode } from 'react'
import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>
  name: TName
  label: ReactNode
  type?: HTMLInputTypeAttribute
  inputProps?: InputBaseComponentProps
  fullWidth?: boolean
}

export default function FormMultilineField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ control, name, label, type, inputProps, fullWidth }: Props<TFieldValues, TName>) {
  return (
    <Controller<TFieldValues>
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <TextField
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          helperText={error ? error.message : null}
          label={label}
          type={type}
          rows={4}
          multiline
          inputProps={inputProps}
          fullWidth={fullWidth}
        />
      )}
    />
  )
}
