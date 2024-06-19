import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Flex, IconButton, Select } from "@chakra-ui/react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const SortForm = ({ setSearchParams }) => {
    const [searchParams] = useSearchParams();
    const initialSortOrder = searchParams.get('sortOrder') || 'DESC';
    const initialSortBy = searchParams.get('sortBy') || 'created_at';

    const [sortOrder, setSortOrder] = useState('DESC')
    const [sortBy, setSortBy] = useState('created_at')

    useEffect(() => {
        setSortOrder(initialSortOrder);
        setSortBy(initialSortBy);
    }, [initialSortOrder, initialSortBy]);

    const handleSortChange = (event) => {
        const newSortBy = event.target.value;
        setSortBy(newSortBy);
        setSearchParams({ sortBy: newSortBy, sortOrder });
    }

    const handleOrderChange = () => {
        const newOrder = sortOrder === 'DESC' ? 'ASC' : 'DESC';
        setSortOrder(newOrder);
        setSearchParams({ sortBy, sortOrder: newOrder })
    }

    return (
        <Flex as="form" maxW="150px" >
            <Select onChange={handleSortChange} size="sm" borderRadius="5px" >
                <option name="created_at" value="created_at">Date</option>
                <option name="comment_count" value="comment_count">Comments</option>
                <option name="votes" value="votes">Votes</option>
            </Select>
            <IconButton onClick={handleOrderChange} colorScheme="teal" variant="outline" size="sm" aria-label={sortOrder === 'DESC' ? 'Switch to ascending order' : 'Switch to descending order'} icon={sortOrder === 'DESC' ? <FaSortAmountDown/> : <FaSortAmountUp/>} />
        </Flex>
    )
}

export default SortForm;