import React from 'react';
import { Breadcrumb, Layout, theme, Descriptions, Image, Tag } from 'antd';
import { useParams, Link } from 'react-router-dom';

const { Content, Footer } = Layout;

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { id } = useParams<{ id: string }>();

    return (
        <Layout>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>
                        <Link to={'/catalogPage'}>Lost & Found</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{`${id}`}</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        padding: 20,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Descriptions title={
                            <div>
                                Item - {id}  <Tag>Found Item</Tag>
                            </div>
                        }>
                        <Descriptions.Item span={3}>
                            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                                <Image
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    style={{ width: '100%', maxWidth: 600, height: 'auto', borderRadius: borderRadiusLG }}
                                />
                            </div>
                        </Descriptions.Item>
                        <Descriptions.Item label="Item Name">Name</Descriptions.Item>
                        <Descriptions.Item label="Description">Description</Descriptions.Item>
                        <Descriptions.Item label="Status">Claimed/Unclaimed</Descriptions.Item>
                        <Descriptions.Item label="Found/Lost by">John Doe</Descriptions.Item>
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
