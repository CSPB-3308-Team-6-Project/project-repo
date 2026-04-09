'use client';

import { useCallback, useState } from 'react';
import { Button, Group, Modal } from '@mantine/core';
import ChangePasswordForm from './ChangePasswordForm';
import DeleteButton from './DeleteButton';
import EditProfileForm from './EditProfileForm';
import SeedDataButton from './SeedDataButton';
import { useRouter } from 'next/navigation';
import { IUser } from '@/types/user/user';
import { ITracker } from '@/types/tracker/tracker';
import { ITrackerPost } from '@/types/tracker/tracker-post';
import { colors } from '@/lib/color-scheme';

type ProfileActionsProps = {
  user: IUser;
  trackers: ITracker[] | null;
  trackerPosts: ITrackerPost[] | null;
};

export default function ProfileActions({ user, trackers, trackerPosts }: ProfileActionsProps) {
  const [editOpened, setEditOpened] = useState(false);
  const [passwordOpened, setPasswordOpened] = useState(false);
  const router = useRouter();

  const handlePasswordSuccess = useCallback(() => {
    setPasswordOpened(false);
    router.refresh();
  }, [router]);

  return (
    <>
      <Group justify='center' mt="md">
        <Button onClick={() => setEditOpened(true)} color={colors.buttonEdit} w={150}>
          Edit Profile
        </Button>

        <Button variant="outline" onClick={() => setPasswordOpened(true)} color={colors.buttonSubmit} w={150}>
          Change Password
        </Button>

        <DeleteButton userId={user.id} trackerPosts={trackerPosts} trackers={trackers} />
      </Group>

      {/* Seed Database Button - for testing/demo purposes */}
      <Group justify='center' mt="md">
        <SeedDataButton email={user.email} trackers={trackers} />
      </Group>

      <Modal
        opened={editOpened}
        onClose={() => setEditOpened(false)}
        title="Edit Profile"
        centered
        styles={{
          content: { backgroundColor: colors.card },
          header: { backgroundColor: colors.card },
          title: { color: colors.textPrimary }
        }}
      >
        <EditProfileForm user={user} />
      </Modal>

      <Modal
        opened={passwordOpened}
        onClose={() => setPasswordOpened(false)}
        title="Change Password"
        centered
        styles={{
          content: { backgroundColor: colors.card },
          header: { backgroundColor: colors.card },
          title: { color: colors.textPrimary }
        }}
      >
        <ChangePasswordForm
          userId={user.id}
          onSuccess={handlePasswordSuccess}
        />
      </Modal>
    </>
  );
}