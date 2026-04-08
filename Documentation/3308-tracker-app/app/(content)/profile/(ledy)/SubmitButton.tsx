'use client';

import { Button } from '@mantine/core';
import { colors } from '@/lib/color-scheme';

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
    <Button type="submit" color={color || colors.buttonSubmit} fullWidth radius="md">
      {label}
    </Button>
  );
}