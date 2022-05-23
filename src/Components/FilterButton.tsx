import React from 'react';
import s from './FilterButton.module.css'

export type FilterValuesType = 'all' | 'completed' | 'active';

type FilterButtonPropsType = {
    value: FilterValuesType
    toggle: (value: FilterValuesType) => void
    active: boolean
}

const FilterButton: React.FC<FilterButtonPropsType> = (props) => {
    const className = props.active ? s.active : ''
    return (
        <button
            className={className}
            onClick={() => props.toggle(props.value)}
        >
            {props.children || props.value}
        </button>
    );
};

export default FilterButton;