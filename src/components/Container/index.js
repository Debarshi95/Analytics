import React, { useCallback, useState } from 'react';
import strings from '../../utils/strings';
import Button from '../Button';
import FilterCard from '../FilterCard';
import Typography from '../Typography';
import './Container.scss';

const Container = ({ handleOnApply, activeFilters, handleContainerClose, ...props }) => {
  const [filterItems, setFilterItems] = useState([...strings.filterKeys]);
  const [activeItems, setActiveItems] = useState({ ...activeFilters });

  const onMoveCard = useCallback((fromIdx, toIdx) => {
    setFilterItems((prevList) => {
      const duplicateItems = [...prevList];
      const fromData = duplicateItems[fromIdx];
      duplicateItems[fromIdx] = duplicateItems[toIdx];
      duplicateItems[toIdx] = fromData;
      return [...duplicateItems];
    });
  }, []);

  const handleOnFilterClick = useCallback((itemId) => {
    setActiveItems((prev) => {
      const duplicateObj = { ...prev };
      if (duplicateObj[itemId]) {
        delete duplicateObj[itemId];
        return { ...duplicateObj };
      }
      const obj = { ...prev };
      obj[itemId] = true;
      return { ...obj };
    });
  }, []);

  return (
    <div role="button" tabIndex={0} aria-hidden className="Container__root" {...props}>
      <Typography variant="h3">Dimensions and Metrics</Typography>
      <div className="Container__filterWrapper">
        {filterItems.map((item, idx) => (
          <FilterCard
            item={item}
            id={idx}
            key={item.id}
            onMoveCard={onMoveCard}
            disabled={!activeItems[item?.id]}
            handleOnItemClick={handleOnFilterClick}
          />
        ))}
      </div>
      <div className="Container__buttonWrapper">
        <Button type="button" variant="text" onClick={handleContainerClose}>
          Close
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => {
            handleOnApply(filterItems, activeItems);
            handleContainerClose();
          }}
        >
          Apply changes
        </Button>
      </div>
    </div>
  );
};

export default Container;
