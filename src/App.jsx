import React from "react";
import ChartComponent from "./components/ChartComponent";
import initialData from "./chartData";
import highlightRanges from "./highlightRange";
import "./App.css";
import Table from "./components/Table";

const App = () => {
  const colors = {
    lineColor: "#bf2121",
  };

  return (
    <>
      <div className="mainPage">
        <div className="innerWrapper">
          <h2 className="pageHead">
            Drawdown Periods
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#6f6f6f"
                  d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8q0-.425-.288-.712T12 7q-.425 0-.712.288T11 8q0 .425.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"
                />
              </svg>
            </span>
          </h2>
          <div className="mainContainer">
            <img
              src="https://maticalgos.com/wp-content/uploads/2022/01/logo_white.png"
              alt="MaticLogo"
              className="backImg"
            />
            <ChartComponent
              data={initialData}
              colors={colors}
              highlightRanges={highlightRanges}
            />
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
