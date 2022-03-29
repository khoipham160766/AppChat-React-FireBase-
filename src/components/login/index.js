import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import {signInWithPopup,FacebookAuthProvider,GoogleAuthProvider} from 'firebase/auth';
import {authentication} from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';

export default function Login() {
    //variables & css
    const { Title } = Typography;
    const TitleStyle = {
        textAlign: 'center'
    };
    const ButtonStyle = {
        width: '100%',
        height: '40px',
        marginBottom: '5px'
    };
    //function
    const handleFbLogin = async() => { //login with Facebook
        const provider = new FacebookAuthProvider();
        const {_tokenResponse, user, providerId}= await signInWithPopup(authentication, provider);

        if(_tokenResponse?.isNewUser){
            await addDocument('users',{
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
    }

    const handleGgLogin = async() => { //login with google
        const provider = new GoogleAuthProvider();
        const {_tokenResponse, user, providerId}= await signInWithPopup(authentication, provider);

        if(_tokenResponse?.isNewUser){
            await addDocument('users',{
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
    }

  
    //component
    return (
        <div>
            <Row justify='center' style={{height: 800}}>
                <Col span={8}>
                    <Title style={TitleStyle}>Fun Chat</Title>
                    <Button style={ButtonStyle} onClick={handleGgLogin}>
                        Login with Google
                    </Button>
                    <Button style={ButtonStyle} onClick={handleFbLogin}>
                        Login with Facebook
                    </Button>
                    <h2 style={{textAlign: 'center', color: 'blue'}}>Developed By Khôi</h2>
                </Col>
            </Row>
        </div>
    )
}