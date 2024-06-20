import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Flex, IconButton, Select, FormLabel, FormControl, VisuallyHidden } from "@chakra-ui/react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const SortForm = ({ setSearchParams }) => {
    const [searchParams] = useSearchParams();
    const initialSortOrder = searchParams.get('sortOrder') || 'DESC';
    const initialSortBy = searchParams.get('sortBy') || 'created_at';

    const [sortOrder, setSortOrder] = useState(initialSortOrder)
    const [sortBy, setSortBy] = useState(initialSortBy)

    useEffect(() => {
        setSortOrder(initialSortOrder);
        setSortBy(initialSortBy);
    }, [initialSortOrder, initialSortBy]);

    const handleSortChange = (event) => {
        const newSortBy = event.target.value;
        setSortBy(newSortBy);
        setSortOrder('DESC');
        setSearchParams({ sortBy: newSortBy, sortOrder: 'DESC' });
    }

    const handleOrderChange = () => {
        const newOrder = sortOrder === 'DESC' ? 'ASC' : 'DESC';
        setSortOrder(newOrder);
        setSearchParams({ sortBy, sortOrder: newOrder })
    }

    return (
        <Flex as="form" maxW="150px" >
            <FormControl flex="1" display="flex" alignItems="center">
                <VisuallyHidden>
                    <FormLabel htmlFor="sort-select" >
                        Sort:
                    </FormLabel>
                </VisuallyHidden>
                <Select onChange={handleSortChange} size="sm" value={sortBy} borderRadius="5px" >
                    <option name="created_at" value="created_at">Date</option>
                    <option name="comment_count" value="comment_count">Comments</option>
                    <option name="votes" value="votes">Votes</option>
                </Select>
            </FormControl>
            <IconButton onClick={handleOrderChange} colorScheme="teal" variant="outline" size="sm" aria-label={sortOrder === 'DESC' ? 'Switch to ascending order' : 'Switch to descending order'} icon={sortOrder === 'DESC' ? <FaSortAmountDown/> : <FaSortAmountUp/>} />
        </Flex>
    )
}

export default SortForm;