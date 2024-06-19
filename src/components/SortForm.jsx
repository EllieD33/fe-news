import { Flex, IconButton, Select } from "@chakra-ui/react";
import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const SortForm = () => {
    const [sortDirection, setSortDirection] = useState('DESC')
    const [sortBy, setSortBy] = useState('Date')

    return (
        <Flex as="form" maxW="150px" >
            <Select size="sm" borderRadius="5px" >
                <option name="date" value="">Date</option>
                <option name="comments" value="">Comments</option>
                <option name="votes" value="">Votes</option>
            </Select>
            <IconButton colorScheme="teal" variant="outline" size="sm" aria-label={sortDirection === 'DESC' ? 'Switch to ascending order' : 'Switch to descending order'} icon={sortDirection === 'DESC' ? <FaSortAmountDown/> : <FaSortAmountUp/>} />
        </Flex>
    )
}

export default SortForm;