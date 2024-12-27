import React, { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

interface UpdateModalProps {
  item: {
    id: string;
    itemName: string;
    description: string;
  };
  onItemUpdated: () => void; // Callback to refresh the item details after updating
}

const UpdateModal: React.FC<UpdateModalProps> = ({ item, onItemUpdated }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
    form.setFieldsValue({
      itemName: item.itemName,
      description: item.description,
    });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);

      // Update the item using the Amplify client
      const { errors } = await client.models.Item.update({
        id: item.id,
        itemName: values.itemName,
        itemDesc: values.description,
      },
      {
        authMode: 'userPool',
      });

      if (errors) {
        message.error('Failed to update item. Please try again.');
        console.error(errors);
        setConfirmLoading(false);
        return;
      }

      message.success('Item updated successfully!');
      setOpen(false);
      setConfirmLoading(false);
      onItemUpdated(); // Refresh the item details
    } catch (error) {
      console.error(error);
      message.error('Failed to update item.');
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update Item
      </Button>
      <Modal
        title="Update Item"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Item Name"
            name="itemName"
            rules={[{ required: true, message: 'Please enter the item name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateModal;
