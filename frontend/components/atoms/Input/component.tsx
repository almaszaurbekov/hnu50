import React, { FC } from 'react';
import { Props } from './props';
import { useTheme } from '@emotion/react';

export const Input: FC<Props> = ({ label, labelClassName, ...rest }: Props) => {
  const theme = useTheme();
  return (
    <label className={labelClassName}>
      {label && (
        <span css={{
          display: "block",
          fontSize: 13,
          marginBottom: 5,
          color: theme.greyText,
        }}>{label}</span>
      )}
      <input
        css={{
          display: "block",
          width: "100%",
          borderRadius: 3,
          border: `2px solid ${theme.greyBorder}`,
          marginBottom: 10,
          fontSize: 13,
          padding: 10,
        }}
        {...rest}
      />
    </label>
  );
}
