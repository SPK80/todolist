import React from 'react';
import {FilterButton} from "./FilterButton";

export type FilterValuesType = 'all' | 'completed' | 'active';

type FiltersPanelPropsType = {
    toggleFilter: (filterValue: FilterValuesType) => void
    filterValue: FilterValuesType
}

export const FiltersPanel: React.FC<FiltersPanelPropsType> = ({filterValue,toggleFilter}) => {
    
    const toggleHandler = (filterValue:FilterValuesType) => {
        toggleFilter(filterValue)
    };
    
    return (
        <div>
            <FilterButton
                toggle={()=>toggleHandler("all")}
                active={filterValue === "all"}
            >All</FilterButton>
            <FilterButton
                toggle={()=>toggleHandler("active")}
                active={filterValue === "active"}
            >Active</FilterButton>
    
            <FilterButton
                toggle={()=>toggleHandler("completed")}
                active={filterValue === "completed"}
            >Completed</FilterButton>
    
        </div>
    )
}