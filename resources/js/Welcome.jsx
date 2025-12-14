    // resources/js/react-emails/Welcome.jsx
    import React from 'react';
    import { Html, Head, Body, Container, Text } from '@react-email/components';
import { useApp } from "./Context/AppContext";

    function Welcome() {
         const {ip} = useApp();
            const {name} =useApp();
            const {idNumber} = useApp();
        return (
            <Html>
                <Head />
                <Body>
                    <Container>
                        <Text>Hello, {name}!</Text>
                        <Text>Welcome to our application.</Text>
                    </Container>
                </Body>
            </Html>
        );
    }

    export default Welcome;
