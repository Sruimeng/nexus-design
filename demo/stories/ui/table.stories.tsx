import { Table } from '@/ui/table';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const invoices = [
  { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
  { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
  { id: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
];

export const Basic: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head className="px-4 py-3">Invoice</Table.Head>
          <Table.Head className="px-4 py-3">Status</Table.Head>
          <Table.Head className="px-4 py-3">Method</Table.Head>
          <Table.Head className="px-4 py-3 text-right">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {invoices.map((invoice) => (
          <Table.Row key={invoice.id}>
            <Table.Cell className="px-4 py-3 font-medium">{invoice.id}</Table.Cell>
            <Table.Cell className="px-4 py-3">{invoice.status}</Table.Cell>
            <Table.Cell className="px-4 py-3">{invoice.method}</Table.Cell>
            <Table.Cell className="px-4 py-3 text-right">{invoice.amount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Table>
      <Table.Caption>A list of your recent invoices.</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head className="px-4 py-3">Invoice</Table.Head>
          <Table.Head className="px-4 py-3">Status</Table.Head>
          <Table.Head className="px-4 py-3 text-right">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {invoices.slice(0, 3).map((invoice) => (
          <Table.Row key={invoice.id}>
            <Table.Cell className="px-4 py-3">{invoice.id}</Table.Cell>
            <Table.Cell className="px-4 py-3">{invoice.status}</Table.Cell>
            <Table.Cell className="px-4 py-3 text-right">{invoice.amount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head className="px-4 py-3">Product</Table.Head>
          <Table.Head className="px-4 py-3 text-right">Quantity</Table.Head>
          <Table.Head className="px-4 py-3 text-right">Price</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell className="px-4 py-3">Item A</Table.Cell>
          <Table.Cell className="px-4 py-3 text-right">2</Table.Cell>
          <Table.Cell className="px-4 py-3 text-right">$100</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className="px-4 py-3">Item B</Table.Cell>
          <Table.Cell className="px-4 py-3 text-right">1</Table.Cell>
          <Table.Cell className="px-4 py-3 text-right">$50</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell className="px-4 py-3 font-medium">Total</Table.Cell>
          <Table.Cell className="px-4 py-3 text-right">3</Table.Cell>
          <Table.Cell className="px-4 py-3 text-right">$150</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head className="px-4 py-3">Name</Table.Head>
          <Table.Head className="px-4 py-3">Email</Table.Head>
          <Table.Head className="px-4 py-3">Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {[
          { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
          { name: 'Bob', email: 'bob@example.com', role: 'User' },
          { name: 'Charlie', email: 'charlie@example.com', role: 'User' },
        ].map((user, i) => (
          <Table.Row key={i} className={i % 2 === 0 ? 'bg-white/5' : ''}>
            <Table.Cell className="px-4 py-3">{user.name}</Table.Cell>
            <Table.Cell className="px-4 py-3">{user.email}</Table.Cell>
            <Table.Cell className="px-4 py-3">{user.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};
