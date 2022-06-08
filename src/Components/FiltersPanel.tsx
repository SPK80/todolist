import React from 'react';
import {Button, ButtonGroup} from "@material-ui/core";

export type FilterValuesType = 'all' | 'completed' | 'active';

type FiltersPanelPropsType = {
    toggleFilter: (filterValue: FilterValuesType) => void
    filterValue: FilterValuesType
}

export const FiltersPanel: React.FC<FiltersPanelPropsType> = ({filterValue, toggleFilter}) => {
    
    const toggleAllFilter = () => toggleFilter("all")
    const toggleActiveFilter = () => toggleFilter("active")
    const toggleCompletedFilter = () => toggleFilter("completed")
    const getColor = (filter: FilterValuesType) => filterValue === filter ? "primary" : "default"
    
    return (
        <ButtonGroup
            style={{marginTop: "5px"}}
            variant={"contained"}
            size={"small"}
        >
            <Button
                color={getColor("all")}
                onClick={toggleAllFilter}
            > All </Button>
            <Button
                color={getColor("active")}
                onClick={toggleActiveFilter}
            > Active </Button>
            <Button
                color={getColor("completed")}
                onClick={toggleCompletedFilter}
            > Completed </Button>
        </ButtonGroup>
    )
}