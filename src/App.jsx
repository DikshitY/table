import React, {useState, useEffect} from 'react';
import PlanComparisonTable from './PlanComparisonTable';
import TableMobile from './TableMobile';
import data from './data';

function App() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {

    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)

  }, [])

  return (
    <div className="app">
      {windowWidth > 768 ? <PlanComparisonTable data={data} />:
      <TableMobile data={data} />}
    </div>
  );
}

export default App;
