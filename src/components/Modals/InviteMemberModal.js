import { Avatar, Form, Modal, Select, Spin } from "antd";
import React, { useContext, useState} from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { debounce } from "lodash";
import { db } from "../../firebase/config";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

function DebounceSelect({fetchOptions, debounceTimeout = 300,...props}){
    const [fetching, setFetching]=useState(false);
    const [options, setOptions]=useState([]);
    console.log({options});
    const debounceFetcher = React.useMemo (()=>{
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);;
            fetchOptions(value, props.curMembers).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, debounceTimeout)
    },[debounceTimeout, fetchOptions])

    return (
        <Select 
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            
            {
                // [{labek:, value, photoURL}]
            options.map(otp => (
                <Select.Option key={otp.value} value={otp.value} title={otp.label}>
                    <Avatar size="small" src={otp.photoURL}>
                        {otp.photoURL ? '' : otp.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {`${otp.label}`}
                </Select.Option>
            ))}
        </Select>
    )
}

async function fetchUserList(search, curMembers){
    console.log({search});
    return  getDocs(query(collection(db,'users'),where('keywords', 'array-contains', search))).then((snapshot)=>{
        return snapshot.docs.map((doc)=> ({
            label: doc.data().displayName,
            value: doc.data().uid,
            photoURL: doc.data().photoURL
        })).filter(otp => !curMembers.includes(otp.value));
    });
    // onSnapshot(query(collection(db, 'users'),where('keywords', 'array-contains', search))
    // ,(snapshot) => {
    //   const datafetch = snapshot.docs.map((doc) => ({
    //       label: doc.data().displayName,
    //       value: doc.data().uid,
    //       photoURL: doc.data().photoURL,
          
    //     }))
    //     return datafetch;
    // });
}
 

export default function InviteMemberModal() {
    //functions
    const {isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom} = useContext(AppContext);
    const {user: { uid }} = useContext(AuthContext);
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();
    const handleOk = async() => {
        // reset form value
        form.resetFields();
        setValue([]);
    
        // update members in current room
        const roomRef = doc(db, 'rooms',selectedRoomId);
    
        await updateDoc(roomRef,{
          members: [...selectedRoom.members, ...value.map((val) => val.value)],
        });
    
        setIsInviteMemberVisible(false);
      };
    
    const handleCancel = () => {
        form.resetFields();
        setIsInviteMemberVisible(false);
    }
    console.log({value});
    return (
        <div>
            <Modal
            title="Invite More Members"
            visible={isInviteMemberVisible}
            onOk={handleOk}
            onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <DebounceSelect 
                        mode='multiple'
                        label="Name Members"
                        value={value}
                        placeholder="Enter Name Member..."
                        fetchOptions={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{width: '100%'}}
                        curMembers={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    )
}