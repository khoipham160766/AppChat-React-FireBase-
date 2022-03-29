import { Form, Modal, Input  } from "antd";
import React, { useContext} from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/services";

export default function AddRoomModal() {
    //functions
    const {isAddRoomVisible, setIsAddRoomVisible} = useContext(AppContext);
    const {user: { uid }} = useContext(AuthContext);
    const [form] = Form.useForm();
    const handleOk = () => {
        console.log({formData: form.getFieldsValue()});
        addDocument('rooms', {...form.getFieldValue(), members: [uid]});
        form.resetFields();

        setIsAddRoomVisible(false);
    }
    const handleCancel = () => {
        form.resetFields();
        setIsAddRoomVisible(false);
    }
    return (
        <div>
            <Modal
            title="Add Room"
            visible={isAddRoomVisible}
            onOk={handleOk}
            onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Room Name" name='name'>
                        <Input placeholder="Enter Room Name..."/>
                    </Form.Item>
                    <Form.Item label="Description" name='description'>
                        <Input.TextArea placeholder="Enter Description..."/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}