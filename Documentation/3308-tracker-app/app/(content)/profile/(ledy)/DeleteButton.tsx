'use client';

import { Button } from '@mantine/core';
import { deleteAccount } from './actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import { ITracker } from '@/types/tracker/tracker';
import { ITrackerPost } from '@/types/tracker/tracker-post';
import { colors } from '@/lib/color-scheme';

type DeleteButtonProps = {
  userId: number;
  trackers: ITracker[] | null;
  trackerPosts: ITrackerPost[] | null;
};

export default function DeleteButton({ userId, trackers, trackerPosts }: DeleteButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account and all tracking data?'
    );

    if (!confirmed) return;

    const deleted = await deleteAccount(userId, trackers, trackerPosts);
    if (!deleted) {
      toast.error('Failed to delete account. Please try again later.');
      return;
    }

    if (deleted.error !== '') {
      toast.error(`Error deleting account: ${deleted.error}`);
      return;
    }

    await signOut({ redirect: false });

    toast.success('Account deleted successfully. Redirecting to home page...');
    router.push('/');
  }

  return (
    <Button color={colors.buttonDelete} onClick={handleDelete} w={150}>
      Delete Account
    </Button>
  );
}