import React from 'react';
import FilterButton from "./FilterButton";

export type FilterValuesType = 'all' | 'completed' | 'active';

type FiltersPanelPropsType = {
    onToggleFilter: (filterValue: FilterValuesType) => void
    filterValue: FilterValuesType
}

const FiltersPanel: React.FC<FiltersPanelPropsType> = ({filterValue, onToggleFilter}) => {
    return (
        <div>
            <FilterButton
                value={"all"}
                onToggle={onToggleFilter}
                active={filterValue === "all"}
            />
            <FilterButton
                value={"active"}
                onToggle={onToggleFilter}
                active={filterValue === "active"}
            
            />
            <FilterButton
                value={"completed"}
                onToggle={onToggleFilter}
                active={filterValue === "completed"}
            
            />
        </div>
    );
};

export default FiltersPanel;