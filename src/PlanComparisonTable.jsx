import React, { useState, useRef, useEffect } from 'react';

const PlanComparisonTable = ({ data }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const tableWrapperRef = useRef(null);

  useEffect(() => {
    const storedPlan = sessionStorage.getItem('selectedPlan');
    if (storedPlan !== null) {
      setSelectedPlan(parseInt(storedPlan, 10));
    }
  }, []);

  const handleColumnSelect = (index) => {
    const newSelectedPlan = index === selectedPlan ? null : index;
    setSelectedPlan(newSelectedPlan);

    if (newSelectedPlan === null) {
      sessionStorage.removeItem('selectedPlan');
    } else {
      sessionStorage.setItem('selectedPlan', newSelectedPlan.toString());
    }
  };

  const headers = ['CHOOSE A PLAN'];

  const allFeatures = data.reduce((acc, plan) => {
    headers.push({
      title: plan.name,
      description: plan.description,
      price: plan.planDetails[0].recurringPaymentAmount,
      duration: plan.renewalCycleType,
    });

    plan?.planDetails[0]?.featureDetails.forEach((feature) => {
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

      const hasFeature = plan.planDetails[0].featureDetails.some((f) => {
        if (f.value === 'N') {
          return false;
        } else if (f.textToDisplay === feature) {
          featureValue = f.value === 'Y' ? '✓' : f.value;
          return true;
        }

        return false;
      });

      row.push(hasFeature ? featureValue : 'X');
    });
    return row;
  });

  return data.length < 1 ? (
    <div className="no-plan">No Plans !</div>
  ) : (
    <div className="wrapper">
      <div className="table-wrapper" ref={tableWrapperRef}>
        <div className="scrollable-content">
          <div className="header-wrapper">
            {headers.map((header, index) => (
              <div
                key={index}
                onClick={() => index !== 0 && handleColumnSelect(index - 1)}
                className={`${index !== 0 ? 'cursor-pointer' : ''}`}
                id={`${selectedPlan === index - 1 ? 'selected-column-header' : ''}`}
              >
                {header.title ? (
                  <section className="bill-container">
                    <section className="bill-plan">
                      <span>{header.title.split(' ')[0]}</span>
                      <span>{header.description.split(' ')[0]}</span>
                    </section>
                    <section className="bill-price">{`$${header.price}/${(header.duration === 'YEAR' && 'yr') || (header.duration === 'MONTH' && 'mo')}`}</section>
                  </section>
                ) : (
                  header
                )}
              </div>
            ))}
          </div>
          <div className="body-wrapper">
            {rows.map((row, rowIndex) => (
              <div className="row-wrapper" key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <div key={cellIndex} className={`${selectedPlan === cellIndex - 1 ? 'selected-column' : ''}`}>
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {selectedPlan !== null && (
            <div className="subscription-button-wrapper">
              <div className="subscription-button">
                <div></div>
                {data.map((plan, index) => (
                  <div key={index} className={`${selectedPlan === index ? 'selected-column' : ''}`}>
                    {selectedPlan === index && <button className="subscribe-button">Subscribe</button>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanComparisonTable;
