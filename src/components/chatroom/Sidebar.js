import {Row, Col } from "antd";
import React from "react";
import RoomList from "./RoomList";
import UserInfo from "./UserInfo";
import styled from 'styled-components';

//css
const SidebarStyle = styled.div`
        background: #3366CC;
        color: white;
        height: 100vh;
    `;

export default function Sidebar() {
    return (
        <SidebarStyle>
            <Row>
                <Col span={24}><UserInfo/></Col>
                <Col span={24}><RoomList/></Col>
            </Row>
        </SidebarStyle>
    )
}