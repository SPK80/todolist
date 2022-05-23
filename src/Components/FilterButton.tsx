import React from 'react';
import s from './FilterButton.module.css'

type FilterButtonPropsType = {
    toggle: () => void
    active: boolean
}

const FilterButton: React.FC<FilterButtonPropsType> =
    (props) => {
    const className = props.active ? s.active : ''
    return (
        <button
            className={className}
            onClick={() => props.toggle()}
        >
            {props.children }
        </button>
    );
};

export default FilterButton;