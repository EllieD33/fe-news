import { AlertDialog, AlertDialogOverlay, AlertDialogHeader, AlertDialogContent, AlertDialogBody, AlertDialogFooter, Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React from 'react';

const DeleteButton = ({ item, onDelete }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const handleDelete = () => {
        onDelete(); 
        onClose();
    };

    return (
        <>
            <IconButton onClick={onOpen} aria-label="delete story" m={2} colorScheme="teal" variant="outline" icon={<DeleteIcon/>} />

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete {item}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} colorScheme="red" ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteButton;
