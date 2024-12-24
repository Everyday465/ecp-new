import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, theme, Descriptions, Image, Tag } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from "../../amplify/data/resource";

const { Content, Footer } = Layout;

// Generate the Amplify client
const client = generateClient<Schema>();

interface Item {
    itemName: string;
    description: string;
    status: string;
    foundLostBy: string;
    id: string;
    createdAt?: string;
    updatedAt?: string;
}

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { id } = useParams<{ id: string }>(); // `id` might be undefined
    const [item, setItem] = useState<Item | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            if (id) { // Ensure `id` is defined
                try {
                    const { data } = await client.models.Item.get({ id });
                    if (data) {
                        setItem({
                            itemName: data.itemName ?? "Unknown Item Name", // Default value
                            description: data.description ?? "No Description",
                            status: data.status ?? "Unknown Status",
                            foundLostBy: data.foundLostBy ?? "Unknown",
                            id: data.id,
                            createdAt: data.createdAt,
                            updatedAt: data.updatedAt,
                        });
                    }
                } catch (error) {
                    console.error("Error fetching item:", error);
                }
            }
        };

        fetchItem();
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }

    const tagText = item.status === "Found" ? "Found Item" : "Lost Item";

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
                            </div>
                        }
                    >
                        <Descriptions.Item span={3}>
                            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                                <Image
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" // Default image
                                    style={{
                                        width: '100%',
                                        maxWidth: 600,
                                        height: 'auto',
                                        borderRadius: borderRadiusLG,
                                    }}
                                />
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Item Name">
                            {item.itemName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Description">
                            {item.description}
                        </Descriptions.Item>
                        <Descriptions.Item label="Resolution">
                            Unclaimed/Claimed
                        </Descriptions.Item>
                        <Descriptions.Item label="Found/Lost by">
                            {item.foundLostBy}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Lost&Found ©{new Date().getFullYear()} Created by elijah
            </Footer>
        </Layout>
    );
};

export default App;
