import React from "react";
import { Button, Collapse, Typography } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import styled from 'styled-components';
import { PlusSquareOutlined } from "@ant-design/icons";
import { AppContext } from "../../Context/AppProvider";

    //css
    const CollapsePanelStyled = styled(CollapsePanel)`
        &&&{
            .ant-collapse-header, p {
                color:white;
            }
            .ant-collapse-content-box {
                padding: 0 40px;
            }
            .add-room {
                color: white;
                padding: 0;
            }
            .list-room {
                color: white;
            }
        }
    `;
    const LinkStyled = styled(Typography.Link)`
        display: block;
        margin-bottom: 5px;
        color: white;
    `;

export default function RoomList() {
    //variables
    const {rooms, setIsAddRoomVisible, setSelectedRoomId }=React.useContext(AppContext);
    console.log({rooms});
    //function
    const handleAddRoom = () => {
        setIsAddRoomVisible(true);
    }
    return(
        <Collapse ghost defaultActiveKey={['1']}>
            <CollapsePanelStyled header="Room List" key='1'>
                {
                   rooms.map(room => <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id) } className="list-room">{room.name}</LinkStyled>)
                }
                <Button type="text" icon={<PlusSquareOutlined/>} className="add-room" onClick={handleAddRoom}>Add Room</Button>
            </CollapsePanelStyled> 
        </Collapse>
    )
}