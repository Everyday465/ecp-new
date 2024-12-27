import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

interface DeleteModalProps {
  item: {
    id: string;
    itemName: string;
  };
  //onItemDeleted: () => void; // Callback to refresh the list after deleting
}

const DeleteModal: React.FC<DeleteModalProps> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    try {
      // Delete the item using the Amplify client
      const { errors } = await client.models.Item.delete(
        { id: item.id },
        { authMode: 'userPool' } // Adjust the auth mode if needed
      );

      if (errors) {
        message.error('Failed to delete item. Please try again.');
        console.error(errors);
        setConfirmLoading(false);
        return;
      }

      message.success('Item deleted successfully!');
      setOpen(false);
      setConfirmLoading(false);
      //onItemDeleted(); // Refresh the item list
    } catch (error) {
      console.error(error);
      message.error('Failed to delete item.');
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button danger onClick={showModal}>
        Delete Item
      </Button>
      <Modal
        title={`Delete ${item.itemName}`}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </>
  );
};

export default DeleteModal;
