'use client';

import { Button } from '@mantine/core';

type SubmitButtonProps = {
  label: string;
  loadingLabel: string;
  color?: string;
};

export default function SubmitButton({
  label,
  color,
}: SubmitButtonProps) {
  return (
    <Button type="submit" color={color}>
      {label}
    </Button>
  );
}