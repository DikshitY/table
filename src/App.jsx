import React from 'react';
import PlanComparisonTable from './PlanComparisonTable';
import data from './data';

function App() {
  return (
    <div className="app">
      <PlanComparisonTable data={data} />
    </div>
  );
}

export default App;