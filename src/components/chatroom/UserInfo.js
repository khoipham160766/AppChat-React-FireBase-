import { Button, Avatar, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../../Context/AuthProvider";

    //css
    const WrapperStyled=styled.div`
        display: flex;
        justify-content: space-between;
        padding: 12px 16px;
        border-bottom: 1px solix rbga(82,32,83);

        .username {
            color: white;
            margin-left: 5px;
        }
    `;

export default function UserInfo() {
    //variables
    const auth=getAuth();
    //function
    const { user: {
        displayName,
        photoURL
    }} = React.useContext(AuthContext);
    const data =React.useContext(AuthContext);
    return (
        <div>
            <WrapperStyled>
                <div>
                    <Avatar src={photoURL}>{photoURL ? '': displayName?.charAt(0)?.toUpperCase()}</Avatar>
                    <Typography.Text className="username">{displayName}</Typography.Text>
                </div>
                <Button ghost onClick={() => auth.signOut()}>Logout</Button>
            </WrapperStyled>
        </div>
    )
}