import { Stack, TextInput } from '@mantine/core';
import { updateUser } from './actions';
import SubmitButton from './SubmitButton';
import { colors } from '@/lib/color-scheme';

type EditProfileFormProps = {
  user: {
    id: number;
    name: string;
    email: string;
    cuID: string;
  };
};

export default function EditProfileForm({ user }: EditProfileFormProps) {
  return (
    <form action={updateUser}>
      <input type="hidden" name="userId" value={user.id} />

      <Stack gap="md">
        <TextInput
          radius="md"
          size="md"
          label="Name"
          name="name"
          defaultValue={user.name}
          required
          styles={{
            input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
            label: { color: colors.label }
          }}
        />

        <TextInput
          radius="md"
          size="md"
          label="Email"
          name="email"
          type="email"
          defaultValue={user.email}
          required
          styles={{
            input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
            label: { color: colors.label }
          }}
        />

        <TextInput
          radius="md"
          size="md"
          label="CU ID"
          name="cuID"
          defaultValue={user.cuID}
          required
          styles={{
            input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
            label: { color: colors.label }
          }}
        />

        <SubmitButton
          label="Save Changes"
          loadingLabel="Saving..."
        />
      </Stack>
    </form>
  );
}