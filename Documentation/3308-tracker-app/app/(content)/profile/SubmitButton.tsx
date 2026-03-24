'use client';

import { Button } from '@mantine/core';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  label: string;
  loadingLabel: string;
  color?: string;
};

export default function SubmitButton({
  label,
  loadingLabel,
  color,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending} color={color}>
      {pending ? loadingLabel : label}
    </Button>
  );
}