import React, { memo, useState } from 'react';
import { toStartCase } from '../../utils/helper-funcs';
import Typography from '../Typography';
import './FilterCard.scss';

const FilterCard = ({ item, id, onMoveFilter, handleOnItemClick, disabled, ...props }) => {
  const [isFilterDisabled, setIsFilterDisabled] = useState(disabled);

  const handleOnDragStart = (e) => {
    e.dataTransfer.setData('card_id', e.target.id);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    const fromIdx = +e.dataTransfer.getData('card_id');
    const toIdx = +e.currentTarget.id;
    onMoveFilter(fromIdx, toIdx);
  };

  const handleOnClick = (e) => {
    handleOnItemClick(item.id);
    setIsFilterDisabled(!isFilterDisabled);
    e.stopPropagation();
  };
  return (
    <div
      role="button"
      onDragStart={handleOnDragStart}
      aria-hidden
      draggable={!disabled}
      id={id}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className={`FilterCard ${!isFilterDisabled ? 'FilterCard--active' : ''}`}
      onClick={handleOnClick}
      disabled={isFilterDisabled}
      {...props}
    >
      <Typography variant="h4">{toStartCase(item.title)}</Typography>
    </div>
  );
};

export default memo(FilterCard);
