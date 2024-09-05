import React, { useState, useEffect } from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import api from '../../../api';
import toast from 'react-hot-toast';

const GetAllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        const fetchAllUsers = async()=>{
            const response = await api.get('/getAllUsers', {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            setAllUsers(response.data);
            console.log(response.data)
        }
        fetchAllUsers();
    }, []);
    
    //delete user
    const handleDeleteUser = async (userId) =>{ 
        const token = localStorage.getItem('token');
        try {
            const response = await api.delete(`/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("User deleted successfully")
            setAllUsers(allUsers.filter(user => user._id!== userId));
        } catch (error) {
            console.log('Error deleting user:', error.response?.data || error.message);
            toast.error("user deletion failed")
        }        
    }
  return (
    <>
    <Container>
        <h1>All Users</h1>
        <Table  responsive striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {allUsers.map(user => (
                    <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin? "Admin" : "user"}</td>
                        <td><Button variant="danger" onClick={() => handleDeleteUser(user._id)} >Delete</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table> 
    </Container>
    
    </>
  )
}

export default GetAllUsers