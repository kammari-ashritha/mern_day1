import React, { useEffect, useState } from 'react'
import Service from '../../utils/http';
import { Avatar, Container, Loader, MantineProvider, Stack, Text } from '@mantine/core';
export default function ProfilePage() {
    const service = new Service();
    const [user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);
    const fetchUser = async () => {
        //use the service.get method to fetch the user data from the backend
        //input parameter for get method is url
        try {
            const res = await service.get("user/me");
            setUser(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
     useEffect(
        () => { fetchUser() }, []
    );
    //data is still in fetching state
    if(loading){
       return <Loader color="blue" size="xl" />;
    }
    //user is not there
    if(!user){
        return <div>User not found</div>
    }
    //show the user details if user is present
    return (
        <Container>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="center"
                justify="center"
                gap="lg" >
                <Avatar src={user.avatar} size={150} radius={150} alt="it's me" />
                <Text> {user.name}</Text>
                <Text> {user.email}</Text>
                <Text> {new Date(user.createdAt).toLocaleDateString()}</Text>    
            </Stack>
        </Container>
  )
}