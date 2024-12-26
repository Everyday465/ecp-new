import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, theme, Card, Col, Row, Avatar, Pagination, Input, Select } from 'antd';
import { CarryOutOutlined, CommentOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/data';
import { StorageImage } from '@aws-amplify/ui-react-storage'; // Import StorageImage
import type { Schema } from "../../amplify/data/resource";

const { Meta } = Card;
const { Content, Footer } = Layout;
const { Search } = Input;

// Generate the Amplify client
const client = generateClient<Schema>();

// Default image URLs
const defaultAvatar = "https://api.dicebear.com/7.x/miniavs/svg?seed=defaultAvatar";
const defaultCover = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

// Component
const App: React.FC = () => {
    const [items, setItems] = useState<any[]>([]); // State to store fetched items
    const [colSpan, setColSpan] = useState(6); // State to store column span based on screen size
    const [loading, setLoading] = useState(false); // Loading state for fetching data

    const onSearch = (value: string) => {
        console.log('Search:', value);
        // You can implement search filtering here
    };

    // Update the column span based on window width
    const updateColSpan = () => {
        const width = window.innerWidth;
        if (width < 576) {
            setColSpan(24); // 1 card per row on extra small screens
        } else if (width < 768) {
            setColSpan(12); // 2 cards per row on small screens
        } else if (width < 992) {
            setColSpan(8); // 3 cards per row on medium screens
        } else {
            setColSpan(6); // 4 cards per row on large screens
        }
    };

    // Fetch items from the backend on component mount
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const response = await client.models.Item.list(); // Fetch all items from the Item model
                setItems(response.data); // Set the items into the state
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
        window.addEventListener('resize', updateColSpan);

        return () => {
            window.removeEventListener('resize', updateColSpan);
        };
    }, []);

    // Style for description
    const descriptionStyle = {
        display: "-webkit-box",
        webkitBoxOrient: "vertical",
        overflow: "hidden",
        webkitLineClamp: 2, // Limit to 2 lines
        height: "40px", // Ensure 2 lines of text fit
    };

    return (
        <Layout>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Lost & Found</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 20, background: theme.useToken().token.colorBgContainer, borderRadius: theme.useToken().token.borderRadiusLG }}>
                    <Search placeholder="Search" allowClear onSearch={onSearch} style={{ width: 400, margin: "0 16px 16px 0" }} />
                    <Select labelInValue defaultValue={{ value: 'latest', label: 'Latest' }} style={{ width: 120 }}>
                        <Select.Option value="latest">Latest</Select.Option>
                        <Select.Option value="lost">Lost Item</Select.Option>
                        <Select.Option value="found">Found Item</Select.Option>
                    </Select>
                    <Row gutter={[40, 40]}>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            items.map((item) => (
                                <Col span={colSpan} key={item.id}>
                                    <Card
                                        style={{ width: 250, height: 320 }}
                                        cover={<StorageImage alt={item.itemName}
                                            path={item.imagePath || defaultCover}
                                            style={{
                                                width: '100%',           // Ensures the image width is responsive
                                                height: '150px',         // Set a fixed height of 100px
                                                objectFit: 'contain',    // Maintains aspect ratio, scales image to fit
                                                objectPosition: 'center' // Centers the image within the container
                                            }} />} // Use StorageImage to display the image
                                        actions={[
                                            <CarryOutOutlined key="claim" />,
                                            <CommentOutlined key="comment" />,
                                            <EllipsisOutlined key="ellipsis" />,
                                        ]}
                                    >
                                        <Link to={`/catalogPage/${item.id}`}>
                                            <Meta
                                                avatar={<Avatar src={item.avatar || defaultAvatar} />} // Default avatar if empty
                                                title={item.itemName}
                                                description={<div style={descriptionStyle}>{item.itemDesc}</div>} // Apply description styles
                                            />
                                        </Link>
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>
                    <Pagination align="center" defaultCurrent={1} total={50} />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Lost&Found ©{new Date().getFullYear()} Created by Elijah
            </Footer>
        </Layout>
    );
};

export default App;
