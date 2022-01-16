import React, { memo, useState } from 'react';
import { toStartCase } from '../../utils/helper-funcs';
import Typography from '../Typography';
import './FilterCard.scss';

const FilterCard = ({ item, id, onMoveCard, handleOnItemClick, disabled, ...props }) => {
  const [isFilterActive, setIsFilterActive] = useState(disabled);
  console.log('Card rendered', { disabled });

  const handleOnDragStart = (e) => {
    setTimeout(() => {
      // e.target.style.display = 'none';
    }, 0);
    e.dataTransfer.setData('card_id', e.target.id);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    const fromIdx = +e.dataTransfer.getData('card_id');
    const toIdx = +e.currentTarget.id;
    onMoveCard(fromIdx, toIdx);
  };

  const handleOnClick = (e) => {
    handleOnItemClick(item.id);
    setIsFilterActive(!isFilterActive);
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
      className={`FilterCard ${!isFilterActive ? 'FilterCard--active' : ''}`}
      onClick={handleOnClick}
      disabled={isFilterActive}
      {...props}
    >
      <Typography variant="h4">{toStartCase(item.title)}</Typography>
    </div>
  );
};

export default memo(FilterCard);
