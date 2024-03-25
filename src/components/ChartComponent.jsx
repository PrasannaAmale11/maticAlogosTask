import React, { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";

const ChartComponent = ({ data, colors, highlightRanges }) => {
  const {
    backgroundColor = "white",
    initialLineColor = "#979797",
    initialAreaTopColor = "#97979700",
    initialAreaBottomColor = "#97979700",
    textColor = "black",
    areaTopColor = "#bf2121",
    areaBottomColor = "#bf212143",
  } = colors || {};

  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      priceScale: {
        position: "left",
      },
      rightPriceScale: {
        visible: false,
      },
      leftPriceScale: {
        visible: true,
      },
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 600,
    });

    // area series for initial data with custom colors
    const initialAreaSeries = chart.addAreaSeries({
      topColor: initialAreaTopColor,
      bottomColor: initialAreaBottomColor,
      lineColor: initialLineColor,
      priceScaleId: "left",
    });
    initialAreaSeries.setData(data.map(({ time, value }) => ({ time, value })));
    if (highlightRanges && highlightRanges.length > 0) {
      highlightRanges.forEach(({ startTime, endTime }) => {
        const highlightedData = data.filter(
          ({ time }) => time >= startTime && time <= endTime
        );
        const lineColor = "#bf2121";

        const highlightedAreaSeries = chart.addAreaSeries({
          topColor: areaTopColor,
          bottomColor: areaBottomColor,
          lineColor: lineColor,
          priceScaleId: "left",
        });

        highlightedAreaSeries.setData(
          highlightedData.map(({ time, value }) => ({ time, value }))
        );
      });
    }

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    initialLineColor,
    initialAreaTopColor,
    initialAreaBottomColor,
    textColor,
    areaTopColor,
    areaBottomColor,
    highlightRanges,
  ]);

  return (
    <>
      <div
        ref={chartContainerRef}
        style={{ width: "48%", height: "100%" }}
        className="charts-container"
      />
    </>
  );
};

export default ChartComponent;
