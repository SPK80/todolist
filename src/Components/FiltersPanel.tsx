import React from 'react';
import FilterButton, {FilterValuesType} from "./FilterButton";

type FiltersPanelPropsType = {
    toggleFilter: (filterValue: FilterValuesType) => void
    filterValue: FilterValuesType
}

const FiltersPanel: React.FC<FiltersPanelPropsType> = ({filterValue, toggleFilter}) => {
    return (
        <div>
            <FilterButton
                value={"all"}
                toggle={toggleFilter}
                active={filterValue === "all"}
            />
            <FilterButton
                value={"active"}
                toggle={toggleFilter}
                active={filterValue === "active"}
            
            />
            <FilterButton
                value={"completed"}
                toggle={toggleFilter}
                active={filterValue === "completed"}
            
            />
        </div>
    );
};

export default FiltersPanel;