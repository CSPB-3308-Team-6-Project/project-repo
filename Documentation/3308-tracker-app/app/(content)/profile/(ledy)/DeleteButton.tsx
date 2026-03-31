'use client';

import { Button } from '@mantine/core';
import { deleteAccount } from './actions';
import { useRouter } from 'next/navigation';

type DeleteButtonProps = {
  userId: number;
};

export default function DeleteButton({ userId }: DeleteButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account and all tracking data?'
    );

    if (!confirmed) return;

    await deleteAccount(userId);
    router.push('/');
    router.refresh();
  }

  return (
    <Button color="red" onClick={handleDelete}>
      Delete Account
    </Button>
  );
}