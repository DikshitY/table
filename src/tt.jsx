import { useEffect, useState } from 'react';
import data from './data';

function App() {
  const [tableData, setTableData] = useState([]);

  const getData = () => {
    let headerDataObj = {};
    let planFeatureDetailObj = {};
    let featureDataArr = [];

    data.map((obj) => {
      const id = obj?.id;
      const duration = obj?.renewalCycleType;
      const featureArr = obj?.planDetails[0]?.features;

      const title = obj?.planDetails[0]?.title;
      const paymentAmount = obj?.planDetails[0]?.recurringPaymentAmount;

      headerDataObj[id] = {
        duration,
        title,
        paymentAmount,
      };

      featureArr.map((feature) => {
        if (!feature.textToDisplay) {
          return;
        }
        if (!featureDataArr.includes(feature.textToDisplay)) {
          featureDataArr.push(feature.textToDisplay);
        }

        if (planFeatureDetailObj[id]) {
          planFeatureDetailObj[id].push(feature.textToDisplay);
        } else {
          planFeatureDetailObj[id] = [feature.textToDisplay];
        }
      });
    });

    return [featureDataArr, headerDataObj, planFeatureDetailObj];
  };

  useEffect(() => {
    setTableData(getData);
  }, []);

  console.log(tableData);

  return (
    <div className="main h-screen flex justify-center items-center">
      <div className="tabl flex">
        <div className="side-left">
          <div className="head border-2 border-black">CHOOSE A PLAN</div>
          <div className="feature border-2 border-black">
            {tableData[0]?.map((i, index) => (
              <div className="border-2 border-black" key={index}>
                {i}
              </div>
            ))}
          </div>
        </div>
        <div className="side-right">
          <div className="head flex">
            {tableData[1] &&
              Object.values(tableData[1]).map((i) => <div className="border-2 border-black">{i?.title}</div>)}
          </div>
          <div className="description">
            {tableData[1] &&
              Object.keys(tableData[1]).map((id) => {
                const arr = tableData[2][id]
                console.log(arr);
                return <div>{tableData[0].map((item) => {
                  return arr?.includes(item) && <div>Y</div>
                })}</div>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// const getFeaturesData = () => {
//   let featureDataArr = [];

//   data.map((obj) => {
//     const featureArr = obj?.planDetails[0]?.features;

//     featureArr.map((feature) => {
//       if (!feature.textToDisplay) {
//         return;
//       }
//       if (!featureDataArr.includes(feature.textToDisplay)) {
//         featureDataArr.push(feature.textToDisplay);
//       }
//     });
//   });

//   return featureDataArr;
// };

// const getPlanFeatureDetail = () => {
//   let planFeatureDetailObj = {};

//   data.map((obj) => {
//     const id = obj?.id;

//     const featureArr = obj?.planDetails[0]?.features;
//     featureArr.map((feature) => {
//       if (!feature.textToDisplay) {
//         return;
//       }

//       if (planFeatureDetailObj[id]) {
//         planFeatureDetailObj[id].push({
//           value: feature.value,
//           textToDisplay: feature.textToDisplay,
//         });
//       } else {
//         planFeatureDetailObj[id] = [
//           {
//             value: feature.value,
//             textToDisplay: feature.textToDisplay,
//           },
//         ];
//       }
//     });
//   });

//   return planFeatureDetailObj;
// };

// console.log(getFeaturesData());
// console.log(getPlanFeatureDetail());
