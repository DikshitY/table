import React from 'react';
import './index.css';

const TableMobile = ({ data }) => {
  const allFeatures = data.reduce((acc, plan) => {
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

  const columns = data.map((plan) => {
    const column = [];
    column.push(plan.planDetails[0].title);

    allFeatures.forEach((feature) => {
      let featureValue;

      const hasFeature = plan.planDetails[0].features.some((f) => {
        if (f.value === 'N') {
          return false;
        } else if (f.textToDisplay === feature) {
          featureValue = f.value === 'Y' ? '✓' : f.value;
          return true;
        }

        return false;
      });

      column.push({
        value: hasFeature ? featureValue : 'X',
        feature,
      });
    });

    return column;
  });

  return data.length < 1 ? (
    <div className="no-plan">No Plans</div>
  ) : (
    // <div className="mobile-wrapper">
    <div className="mobile-table-wrapper">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="column">
          <div className={`column-header ${columnIndex === 0 ? 'annual' : ''}`}>{column[0]}</div>
          <div className="feature-wrapper">
            {column.slice(1).map((ele, eleIndex) => (
              <div key={eleIndex} className="feature-detail">
                <span className="feature">{ele.value}</span>
                <span className="feature">{ele.feature}</span>
              </div>
            ))}
          </div>
          <div className="sub-btn-container">
            <button className="sub-btn">Select</button>
          </div>
        </div>
      ))}
    </div>
    // </div>
  );
};

export default TableMobile;
