import { Button } from '@/ui/button';
import { Form, useForm } from '@/ui/form';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Form> = {
  title: 'UI/Form',
  component: Form,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Basic: Story = {
  render: () => {
    const form = useForm((z) => ({
      resolver: z.object({
        username: z.string().min(3, 'Username must be at least 3 characters'),
        email: z.string().email('Invalid email address'),
      }),
      defaultValues: {
        username: '',
        email: '',
      },
    }));

    const onSubmit = (data: { username: string; email: string }) => {
      console.log('Form submitted:', data);
    };

    return (
      <Form form={form} onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-4">
        <Form.Field
          control={form.control}
          name="username"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Username</Form.Label>
              <Form.Control>
                <input
                  {...field}
                  placeholder="Enter username"
                  className="w-full border border-white/8 rounded-3 bg-transparent px-3 py-2"
                />
              </Form.Control>
              <Form.Description>This is your public display name.</Form.Description>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="email"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Email</Form.Label>
              <Form.Control>
                <input
                  {...field}
                  type="email"
                  placeholder="Enter email"
                  className="w-full border border-white/8 rounded-3 bg-transparent px-3 py-2"
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Button type="submit" variant="solid">
          Submit
        </Button>
      </Form>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const form = useForm((z) => ({
      resolver: z
        .object({
          password: z.string().min(8, 'Password must be at least 8 characters'),
          confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords don't match",
          path: ['confirmPassword'],
        }),
      defaultValues: {
        password: '',
        confirmPassword: '',
      },
    }));

    const onSubmit = (data: { password: string; confirmPassword: string }) => {
      console.log('Valid password:', data);
    };

    return (
      <Form form={form} onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-4">
        <Form.Field
          control={form.control}
          name="password"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Password</Form.Label>
              <Form.Control>
                <input
                  {...field}
                  type="password"
                  placeholder="Enter password"
                  className="w-full border border-white/8 rounded-3 bg-transparent px-3 py-2"
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control>
                <input
                  {...field}
                  type="password"
                  placeholder="Confirm password"
                  className="w-full border border-white/8 rounded-3 bg-transparent px-3 py-2"
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Button type="submit" variant="solid">
          Create Account
        </Button>
      </Form>
    );
  },
};
