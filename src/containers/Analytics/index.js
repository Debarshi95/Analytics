import React, { useState } from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Typography from '../../components/Typography';
import MetricsTable from '../../components/MetricsTable';
import strings from '../../utils/strings';
import './Analytics.scss';

const Analytics = () => {
  const [filterItems, setFilterItems] = useState([...strings.filterKeys]);
  const [containerOpen, setContainerOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  console.log({ activeFilters });

  const handleActiveFilterChange = (filters, activeList) => {
    if (activeList) {
      setActiveFilters({ ...activeList });
    }
    if (filters) {
      setFilterItems([...filters]);
    }
  };

  const handleContainerClose = () => {
    setContainerOpen(!containerOpen);
  };
  return (
    <article className="Analytics__root">
      <Typography variant="h2">Analytics</Typography>
      <section>
        {/* Date Picker */}
        <Button type="button" onClick={handleContainerClose} variant="contained">
          Settings
        </Button>
      </section>

      <section>
        {containerOpen && (
          <Container
            handleOnApply={handleActiveFilterChange}
            activeFilters={activeFilters}
            handleContainerClose={handleContainerClose}
          />
        )}
      </section>
      <MetricsTable itemsList={filterItems} activeFilters={activeFilters} />
    </article>
  );
};

export default Analytics;
