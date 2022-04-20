import aesjs from "aes-js";
import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns";
import React,{useState} from "react";
import styled from 'styled-components';

//css
const WrapperStyled=styled.div`
margin-bottom: 10px;
.author {
    margin-left: 5px;
    font-weight: bold;
}
.date {
    margin-left: 25px;
    font-size: 11px;
    color: #a7a7a7;
}
.content {
    margin-left: 30px;
}
`;
function formatDate (seconds) {
    let forrmattedDate = '';
    if(seconds){
        forrmattedDate=formatRelative(new Date(seconds * 1000), new Date());
        forrmattedDate=forrmattedDate.charAt(0).toUpperCase()+forrmattedDate.slice(1);
    }
    return forrmattedDate;
}

export default function Message({text, displayName, createdAt, photoURL}){
    const [outputValue,setOutputValue]=useState(' ');
    const decryption = () =>{

        // var encryptedBytes=aesjs.utils.hex.toBytes(text);
        // var key=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        // var aes=new aesjs.AES(key);
        // var decryptedBytes= aes.decrypt(encryptedBytes);
        // var decryptedText=aesjs.utils.utf8.fromBytes(decryptedBytes);
        // console.log(decryptedText);

        let split='';
        const key=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        const aes=new aesjs.AES(key);
        let decryptedText='';
        for(var i=0;i<text.length;i+=32){
                split=text.slice(i,i+32);
                const textAsBytes=aesjs.utils.hex.toBytes(split);
                const decryptedBytes=aes.decrypt(textAsBytes);
                decryptedText+=aesjs.utils.utf8.fromBytes(decryptedBytes);
        }
        console.log(decryptedText);
        setOutputValue(decryptedText);
        //setOutputValue(text);
    }
    return(
        <WrapperStyled onLoad={decryption}>
            <div>
                <Avatar size="small" src={photoURL}>{photoURL ? '': displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="author">{displayName}</Typography.Text>
                <Typography.Text className="date">{formatDate(createdAt?.seconds)}</Typography.Text>
            </div>
            <div>
                <Typography.Text className="content">{outputValue}</Typography.Text>
            </div>
        </WrapperStyled>
    )
}