import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilters } from '../../store/slices/filterSlice';
import Button from '../Button';
import FilterCard from '../FilterCard';
import Typography from '../Typography';
import './Container.scss';

const Container = ({ handleContainerOpen, ...props }) => {
  const { filters } = useSelector((state) => state.filters);
  const [filterItems, setFilterItems] = useState([...filters]);
  const dispatch = useDispatch();

  const onMoveFilter = useCallback((fromIdx, toIdx) => {
    setFilterItems((prevList) => {
      const duplicateItems = [...prevList];
      const fromData = duplicateItems[fromIdx];
      duplicateItems[fromIdx] = duplicateItems[toIdx];
      duplicateItems[toIdx] = fromData;
      return [...duplicateItems];
    });
  }, []);

  const handleApplyChanges = () => {
    dispatch(updateFilters([...filterItems]));
  };

  const handleOnFilterClick = useCallback((filterId) => {
    setFilterItems((prevItems) => {
      const updatedFilters = prevItems.map((item) => {
        if (item.id === filterId) {
          return { ...item, disabled: !item.disabled };
        }
        return item;
      });
      return [...updatedFilters];
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
            onMoveFilter={onMoveFilter}
            disabled={item.disabled}
            handleOnItemClick={handleOnFilterClick}
          />
        ))}
      </div>
      <div className="Container__buttonWrapper">
        <Button type="button" variant="text" onClick={handleContainerOpen}>
          Close
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => {
            handleApplyChanges();
            handleContainerOpen();
          }}
        >
          Apply changes
        </Button>
      </div>
    </div>
  );
};

export default Container;
