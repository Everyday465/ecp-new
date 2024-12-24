import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, theme, Card, Col, Row, Avatar, Image, Pagination, Input, Select } from 'antd';
import { CarryOutOutlined, CommentOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import type { GetProps } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;
const { Meta } = Card;
const { Content, Footer } = Layout;

const { Search } = Input;

// Sample Data for Cards
const cardData = [
    {
        id: 1,
        title: "Lost Wallet",
        description: "A brown leather wallet found near the park.",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=wallet",
        cover: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
        id: 2,
        title: "Lost Keys",
        description: "A set of house keys with a red keychain.",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=keys",
        cover: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
        id: 3,
        title: "Found Dog",
        description: "A small white dog found near Elm Street.",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=dog",
        cover: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
        id: 4,
        title: "Found Glasses",
        description: "A pair of glasses found in the library.",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=glasses",
        cover: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
        id: 5,
        title: "Lost Phone",
        description: "A black phone found in the park.",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=phone",
        cover: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
];

const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    // State to store the number of columns
    const [colSpan, setColSpan] = useState(6);

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

    // Update layout when the window is resized
    useEffect(() => {
        updateColSpan();
        window.addEventListener('resize', updateColSpan);
        return () => {
            window.removeEventListener('resize', updateColSpan);
        };
    }, []);

    return (
        <Layout>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Lost & Found</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        padding: 20,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Search placeholder="Search" allowClear onSearch={onSearch} style={{ width: 400, margin: "0 16px 16px 0" }} />
                    <Select
                        labelInValue
                        defaultValue={{ value: 'latest', label: 'Latest' }}
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'latest',
                                label: 'Latest',
                            },
                            {
                                value: 'lost',
                                label: 'Lost Item',
                            },
                            {
                                value: 'found',
                                label: 'Found Item',
                            },
                        ]}
                    />
                    <Row gutter={[40, 40]}>
                        {cardData.map((item) => (
                            <Col span={colSpan} key={item.id}>
                                <Card
                                    style={{ width: 250, height: 320 }}
                                    cover={<Image alt={item.title} src={item.cover} />}
                                    actions={[
                                        <CarryOutOutlined key="claim" />,
                                        <CommentOutlined key="comment" />,
                                        <EllipsisOutlined key="ellipsis" />,
                                    ]}
                                >
                                    <Link to={`/catalogPage/item${item.id}`}>
                                        <Meta
                                            avatar={<Avatar src={item.avatar} />}
                                            title={item.title}
                                            description={item.description}
                                        />
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Pagination align="center" defaultCurrent={1} total={50} />

                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Lost&Found ©{new Date().getFullYear()} Created by elijah
            </Footer>
        </Layout>
    );
};

export default App;
