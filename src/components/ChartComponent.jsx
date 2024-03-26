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

    // custom colors for initial data
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

    const toolTipWidth = 96;
    const toolTipHeight = 95;
    const toolTipMargin = 15;

    // toolTip with styling properties
    const toolTip = document.createElement('div');
    toolTip.style = `width: ${toolTipWidth}px; height: ${toolTipHeight}px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; pointer-events: none; border: 1px solid; border-radius: 2px; font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
    toolTip.style.background = 'white';
    toolTip.style.color = 'black';
    toolTip.style.borderColor = 'rgba( 38, 166, 154, 1)';
    chartContainerRef.current.appendChild(toolTip);

    // update tooltip
    chart.subscribeCrosshairMove(param => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef.current.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainerRef.current.clientHeight
      ) {
        toolTip.style.display = 'none';
      } else {
        let valueColor = 'black';
        const isHighlighted = highlightRanges.some(({ startTime, endTime }) => {
          return param.time >= startTime && param.time <= endTime;
        });
        if (isHighlighted) {
          valueColor = 'red';
        }

        const dateStr = param.time;
        toolTip.style.display = 'block';
        const data = param.seriesData.get(initialAreaSeries);
        const price = data.value !== undefined ? data.value : data.close;
        toolTip.innerHTML = `<div style="color: rgba( 38, 166, 154, 1)">MaticAlgos</div><div style="font-size: 24px; margin: 4px 0px; color: ${valueColor}">
            ${Math.round(100 * price) / 100}
            </div><div style="color: black">
            ${dateStr}
            </div>`;

        const y = param.point.y;
        let left = param.point.x + toolTipMargin;
        if (left > chartContainerRef.current.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth;
        }

        let top = y + toolTipMargin;
        if (top > chartContainerRef.current.clientHeight - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin;
        }
        toolTip.style.left = left + 'px';
        toolTip.style.top = top + 'px';
      }
    });

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
