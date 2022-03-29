import { UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import React, { useContext,useState } from "react";
import styled from 'styled-components';
import{ AppContext } from "../../Context/AppProvider";
import Message from "./Message";
import {AuthContext} from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/services";
import useFirestore from "../../hooks/useFirestore";

    //css
    const HeaderStyled=styled.div`
        display: flex;
        justify-content: space-between;
        height: 56px;
        padding: 0 16px;
        align-items: center;
        border-bottom: 1px solid rbg(230,230,230);
        .header {
            &_info{
                display: flex;
                flex-direction: column;
                justify-content: center
            }
            &_title{
                margin: 0;
                font-weight: bold;
            }
            &_description{
                font-size: 12px;
            }
        }
    `;
    const ButtonGroupStyled=styled.div`
        display: flex;
        align-item: center;
    `;
    const WrapperStyled=styled.div`
        height: 100vh;
    `;
    const ContentStyled=styled.div`
        height: calc(100% - 56px);
        display: flex;
        flex-direction: column;
        padding: 11px;
        justify-content: flex-end;
    `;
    const FormStyled=styled(Form)`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2px 2px 2px 0;
        border: 1px solid rbg(230,230,230);
        border-radius: 2px;
        .ant-form-item{
            flex: 1;
            margin-bottom: 0;
        }
    `;
    const MessageListStyled=styled.div`
        max-height: 100%;
        overflow-y: auto;
    `;

export default function ChatWidow() {
    //variables
    const [inputValue, setInputValue] = useState('');
    const [form]=Form.useForm();
    const {selectedRoom, members, setIsInviteMemberVisible} = useContext(AppContext);
    const { user: {
        uid, photoURL,displayName
    } } = useContext(AuthContext);
    //functions
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const handleOnSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            room: selectedRoom.id,
            displayName
        });
        form.resetFields(['message']);
    }
    const condition = React.useMemo(
        () => ({
          fieldName: 'room',
          operator: '==',
          compareValue: selectedRoom.id,
        }),
        [selectedRoom.id]
      );
    const message = useFirestore('messages',condition);
    console.log({message});
    // const selectedRoom =  React.useMemo(()=> rooms.find(room => room.id === selectedRoomId),[rooms,selectedRoomId]);
    return (
        <WrapperStyled>
            {
                selectedRoom.id ? (
                    <>
                     <HeaderStyled>
                <div className="header_info">
                    <p className="header_title">{selectedRoom.name}</p>
                    <span className="header_description">{selectedRoom.description}</span>
                </div>
                <ButtonGroupStyled>
                    <Button icon={<UserAddOutlined/>} type="text" onClick={() => setIsInviteMemberVisible(true)}>Invited</Button>
                    <Avatar.Group size="small" maxCount={2}>
                        {
                            members.map(member => <Tooltip title={member.displayName} key={member.id}><Avatar src={member.photoURL}>{member.photoURL ? '': member.displayName?.charAt(0)?.toUpperCase()}</Avatar></Tooltip>)
                        }
                    </Avatar.Group>
                </ButtonGroupStyled>
            </HeaderStyled>
            {/* Content */}
            <ContentStyled>
                <MessageListStyled>
                    {
                        message.map(mes=> 
                            <Message 
                                key={mes.id}
                                text={mes.text}
                                photoURL={mes.photoURL}
                                displayName={mes.displayName}
                                createdAt={mes.createdAt}
                            />)
                    }
                     </MessageListStyled>
                <FormStyled form={form}>
                    <Form.Item name="message">
                        <Input onChange={handleInputChange} onPressEnter={handleOnSubmit} placeholder="Message..." bordered={false} autoComplete="off"/>
                    </Form.Item>
                    <Button type='primary' onClick={handleOnSubmit} >Send</Button>
                </FormStyled>
            </ContentStyled>
                    </>
                ) : (
                    <Alert
                      message='Please choose a room'
                      type='info'
                      showIcon
                      style={{ margin: 5 }}
                      closable
                    />
                  )
            }
           
        </WrapperStyled>
    )
}