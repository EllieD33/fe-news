import { IconButton } from "@chakra-ui/react";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";


const VoteForm = () => {
    return (
        <form>
            <IconButton tabIndex={0} mr={1} icon={<TiArrowDownOutline/>} aria-label='down vote article' variant="outline" colorScheme="teal" />
            <IconButton tabIndex={0} ml={1} icon={<TiArrowUpOutline/>} aria-label='up vote article' variant="outline" colorScheme="teal" />
        </form>
    )
}

export default VoteForm;