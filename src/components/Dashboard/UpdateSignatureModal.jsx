import { useState } from 'react';
import { useUserContext } from "../../Hooks/useUserContextHook";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FcCheckmark } from 'react-icons/fc';
import axios from "axios";
axios.defaults.withCredentials = true;


function UpdateSignatureModal(props) {
    
    const {user, dispatch} = useUserContext();

    const [newSignature, setNewSignature] = useState('');

    const handleNewSignature = async()=>{
        console.log(user._id)
        //UPDATE/PUSH db logic here
        if (!user) {
            return
        }

        const response = await axios.patch('https://booksigning.onrender.com/api/user/update/' + user._id, {
            method:'PATCH',
            body: JSON.stringify({signature: newSignature}),
            headers: {'Content-Type': 'application/json'}
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'UPDATE', payload: {...user, signature: newSignature}});
            localStorage.setItem('user', JSON.stringify({user:{...json, signature: newSignature}, token:user.token}));
            console.log({user:{...json}, token:user.token})
        }

        setNewSignature('')
    }

  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
        <Modal.Header closeButton>
        <Modal.Title>What would you like to sign as?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder={props.user.signature}
                    value={newSignature}
                    onChange={(e)=>setNewSignature(e.target.value)}
                />
                <Button variant="outline-success" onClick={()=>{handleNewSignature()}}>
                    <FcCheckmark />
                </Button>
            </InputGroup>
        </Modal.Body>
    </Modal>
  )
}

export default UpdateSignatureModal