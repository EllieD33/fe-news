import { Flex, Heading, Image } from "@chakra-ui/react";

const DeleteConfirmation = () => {
    return (
        <Flex direction="column">
            <Heading fontSize="2xl" m={4} textAlign="center">
                Story successfully deleted
            </Heading>
            <Image
                boxSize="md"
                src="https://images.pexels.com/photos/850216/pexels-photo-850216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="bin with balled up paper inside"
            />
        </Flex>
    );
};

export default DeleteConfirmation;
