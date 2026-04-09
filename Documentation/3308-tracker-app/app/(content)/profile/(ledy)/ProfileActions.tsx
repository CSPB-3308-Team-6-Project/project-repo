'use client';

import { useCallback, useState } from 'react';
import { Button, Group, Modal } from '@mantine/core';
import ChangePasswordForm from './ChangePasswordForm';
import DeleteButton from './DeleteButton';
import EditProfileForm from './EditProfileForm';
import { useRouter } from 'next/navigation';
import { IUser } from '@/types/user/user';
import { ITracker } from '@/types/tracker/tracker';
import { ITrackerPost } from '@/types/tracker/tracker-post';
import { colors } from '@/lib/color-scheme';
import { useWindowSizes } from '@/context/window-sizes';

type ProfileActionsProps = {
  user: IUser;
  trackers: ITracker[] | null;
  trackerPosts: ITrackerPost[] | null;
};

export default function ProfileActions({ user, trackers, trackerPosts }: ProfileActionsProps) {

  const { width } = useWindowSizes();
  const [editOpened, setEditOpened] = useState(false);
  const [passwordOpened, setPasswordOpened] = useState(false);
  const router = useRouter();

  const handlePasswordSuccess = useCallback(() => {
    setPasswordOpened(false);
    router.refresh();
  }, [router]);

  return (
    <>
      <Group justify='center' mt="md" w={'100%'} gap="sm">
        <Button onClick={() => setEditOpened(true)} color={colors.buttonEdit} w={width > 768 ? '1/4' : width > 480 ? '60%' : '90%'} size={width > 768 ? 'md' : 'sm'}>
          Edit Profile
        </Button>

        <Button variant="outline" onClick={() => setPasswordOpened(true)} color={colors.buttonSubmit} w={width > 768 ? '1/4' : width > 480 ? '60%' : '90%'} size={width > 768 ? 'md' : 'sm'}>
          Change Password
        </Button>

        <DeleteButton userId={user.id} trackerPosts={trackerPosts} trackers={trackers} width={width} />
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