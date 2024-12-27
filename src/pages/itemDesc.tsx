import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, theme, Descriptions, Tag, message } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import UpdateModal from './updateItem';
import DeleteModal from './deleteItem';

const { Content, Footer } = Layout;

// Generate the Amplify client
const client = generateClient<Schema>();

interface Item {
  itemName: string;
  description: string;
  type: string;
  status: string;
  foundLostBy: string;
  imagePath: string;
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

const defaultCover = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);

  const fetchItem = async () => {
    if (id) {
      try {
        const { data } = await client.models.Item.get({ id }, {
          authMode: 'userPool',
        });
        if (data) {
          setItem({
            itemName: data.itemName ?? 'Unknown Item Name',
            description: data.itemDesc ?? 'No Description',
            type: data.itemType ?? 'No Type',
            status: data.itemStatus ?? 'Unknown Status',
            foundLostBy: data.foundLostBy ?? 'Unknown',
            imagePath: data.imagePath ?? 'unknown',
            id: data.id,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        }
      } catch (error) {
        console.error('Error fetching item:', error);
        message.error('Failed to fetch item details.');
      }
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  const tagText = item.type === 'Found' ? 'Found Item' : 'Lost Item';

  return (
    <Layout>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link to={'/catalogPage'}>Lost & Found</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{id}</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 20,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Descriptions
            title={
              <div>
                Item - {id} <Tag>{tagText}</Tag>
                <UpdateModal
                  item={{
                    id: item.id,
                    itemName: item.itemName,
                    description: item.description,
                  }}
                  onItemUpdated={fetchItem} // Refresh item details after update
                />
                <DeleteModal
                  item={item}
                />
              </div>
            }
          >
            <Descriptions.Item span={3}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <StorageImage
                  alt={item.itemName}
                  path={item.imagePath || defaultCover}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Item Name">{item.itemName}</Descriptions.Item>
            <Descriptions.Item label="Description">{item.description}</Descriptions.Item>
            <Descriptions.Item label="Status">{item.status}</Descriptions.Item>
            <Descriptions.Item label="Found/Lost by">{item.foundLostBy}</Descriptions.Item>
          </Descriptions>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Lost&Found ©{new Date().getFullYear()} Created by Elijah
      </Footer>
    </Layout>
  );
};

export default App;
