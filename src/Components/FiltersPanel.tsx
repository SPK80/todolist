import React from 'react';
import {Button, ButtonGroup} from "@material-ui/core";

export type FilterValuesType = 'all' | 'completed' | 'active';

type FiltersPanelPropsType = {
    toggleFilter: (filterValue: FilterValuesType) => void
    filterValue: FilterValuesType
}

export const FiltersPanel: React.FC<FiltersPanelPropsType> = ({filterValue, toggleFilter}) => {
    
    const toggleHandler = (filterValue: FilterValuesType) => {
        toggleFilter(filterValue)
    };
    
    return (
        <ButtonGroup
            style={{marginTop: "5px"}}
            variant={"contained"}
            size={"small"}
        >
            <Button
                color={filterValue === "all" ? "primary" : "default"}
                onClick={() => toggleHandler("all")}
            > All </Button>
            <Button
                color={filterValue === "active" ? "primary" : "default"}
                onClick={() => toggleHandler("active")}
            > Active </Button>
            <Button
                color={filterValue === "completed" ? "primary" : "default"}
                onClick={() => toggleHandler("completed")}
            > Completed </Button>
        </ButtonGroup>
    )
}