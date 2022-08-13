import React, {memo} from 'react';
import {Button, ButtonGroup} from "@material-ui/core";
import {FilterValuesType} from "../features/TodoListsList/todolist-reducer";

type FiltersPanelPropsType = {
    toggleFilter: (filterValue: FilterValuesType) => void
    filterValue: FilterValuesType
}

export const FiltersPanel: React.FC<FiltersPanelPropsType> = memo(({filterValue, toggleFilter}) => {
    console.log('FiltersPanel')
    const toggleAllFilter = () => toggleFilter("all")
    const toggleActiveFilter = () => toggleFilter("active")
    const toggleCompletedFilter = () => toggleFilter("completed")
    const getColor = (filter: FilterValuesType) => filterValue === filter ? "primary" : "default"
    
    return (
        <ButtonGroup
            style={{margin: "5px 0"}}
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
})