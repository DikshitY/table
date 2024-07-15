import React from 'react';

const PlanComparisonTable = ({ data }) => {
  const headers = ['CHOOSE A PLAN'];

  const allFeatures = data.reduce((acc, plan) => {
    headers.push(plan.planDetails[0].title);

    plan.planDetails[0].features.forEach((feature) => {
      if (!feature.textToDisplay) {
        return;
      }
      if (!acc.includes(feature.textToDisplay)) {
        acc.push(feature.textToDisplay);
      }
    });
    return acc;
  }, []);

  const rows = allFeatures.map((feature) => {
    const row = [feature];
    data.forEach((plan) => {
      let featureValue;

      const hasFeature = plan.planDetails[0].features.some((f) => {
        if (f.textToDisplay === feature && (f.value === 'Y' || typeof Number(f.value) === 'number')) {
          featureValue = f.value === 'Y' ? '✓' : f.value;
          return true;
        }

        return false;
      });

      row.push(hasFeature ? featureValue : 'X');
    });
    return row;
  });

  return (
    <div className='main-wrapper'>
      <div className="wrapper">
        <div className="header-wrapper">
          {headers.map((header, index) => (
            <div key={index}>{header}</div>
          ))}
        </div>
        <div className="body-wrapper">
          {rows.map((row, rowIndex) => (
            <div className="row-wrapper" key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <div key={cellIndex}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanComparisonTable;
