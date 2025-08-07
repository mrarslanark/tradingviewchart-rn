
import * as React from "react";
import {useEffect, useRef} from "react";
import {type AreaData, AreaSeries, ColorType, createChart, type Time, type WhitespaceData} from "lightweight-charts";


type ChartComponentProps = {
  data: (AreaData<Time> | WhitespaceData<Time>)[];
  colors: {
    backgroundColor: string;
    lineColor: string;
    textColor: string;
    areaTopColor: string;
    areaBottomColor: string;
  }
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data, colors }) => {

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) {
      return;
    }

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth })
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      timeScale: { visible: false },
      width: chartContainerRef.current?.clientWidth,
      height: 300,
      grid: {
        horzLines: { visible: false },
        vertLines: { visible: false },
      },
      autoSize: true,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addSeries(AreaSeries, {
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    }
  }, [colors.areaBottomColor, colors.areaTopColor, colors.backgroundColor, colors.lineColor, colors.textColor, data]);

  return <div ref={chartContainerRef} />;
}


const initialData: ChartComponentProps['data'] = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
];

function App() {

  return <ChartComponent data={initialData} colors={{
    backgroundColor: 'black',
    lineColor: '#2962FF',
    textColor: 'white',
    areaTopColor: '#2962FF',
    areaBottomColor: 'rgba(41, 98, 255, 0.28)',
  }} />;
}

export default App
