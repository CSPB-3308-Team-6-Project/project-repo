'use client';

import { useState } from 'react';
import { Button, Group, Modal } from '@mantine/core';
import ChangePasswordForm from './ChangePasswordForm';
import DeleteButton from './DeleteButton';
import EditProfileForm from './EditProfileForm';

type ProfileActionsProps = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    cuID: string;
  };
};

export default function ProfileActions({ user }: ProfileActionsProps) {
  const [editOpened, setEditOpened] = useState(false);
  const [passwordOpened, setPasswordOpened] = useState(false);

  return (
    <>
      <Group>
        <Button onClick={() => setEditOpened(true)}>
          Edit Profile
        </Button>

        <Button variant="outline" onClick={() => setPasswordOpened(true)}>
          Change Password
        </Button>

        <DeleteButton />
      </Group>

      <Modal
        opened={editOpened}
        onClose={() => setEditOpened(false)}
        title="Edit Profile"
        centered
      >
        <EditProfileForm user={user} />
      </Modal>

      <Modal
        opened={passwordOpened}
        onClose={() => setPasswordOpened(false)}
        title="Change Password"
        centered
      >
        <ChangePasswordForm />
      </Modal>
    </>
  );
}