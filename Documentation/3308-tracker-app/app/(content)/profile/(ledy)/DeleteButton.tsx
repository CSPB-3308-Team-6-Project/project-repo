'use client';

import { Button } from '@mantine/core';
import { deleteAccount } from './actions';

export default function DeleteButton() {
  async function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account and all tracking data?'
    );

    if (!confirmed) return;

    await deleteAccount();
  }

  return (
    <Button color="red" onClick={handleDelete}>
      Delete Account
    </Button>
  );
}