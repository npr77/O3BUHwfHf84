import { Box, Container, Heading, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

const CreatePage = () => {

    const [newProduction, setNewProduction] = useState({
        name: "",
        price: "",
        image: "",
    })

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create New Product</Heading>
                <Box w={"100%"} bg={useColorModeValue("white", "gray.800")} p={8} rounded={"lg"} shadow={"md"}>

                </Box>
            </VStack>
        </Container>
    )
}

export default CreatePage