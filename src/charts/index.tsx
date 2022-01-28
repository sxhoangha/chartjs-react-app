import { useRef } from "react";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "./Charts.scss";

enum PriorityStatus {
  Open = "Open",
  Closed = "Closed",
}

const Charts = () => {
  const chartRef = useRef(null);

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: "white",
        font: { size: "13" },
      },
    },
    legend: {
      position: "right",
    },
  };

  // const generateLabelsPriority = (chart) => {
  //   const { datasets = [], labels = [] } = chart?.config?.data;
  //   const labelsArray = [];

  //   datasets.forEach((dataset) => {
  //     labels.forEach((label) => {
  //       labelsArray.push(`${dataset.label}-${label}`);
  //     });
  //   });

  //   let datasetColors = chart?.data?.datasets?.map(
  //     (dataset) => dataset.backgroundColor
  //   );
  //   datasetColors = datasetColors.flat();

  //   return labelsArray.map((label, index) => ({
  //     text: label,
  //     datasetIndex: label.includes(PriorityStatus.Open) ? 0 : 1,
  //     hidden: !chart.isDatasetVisible(
  //       label.includes(PriorityStatus.Open) ? 0 : 1
  //     ),
  //     fillStyle: datasetColors[index],
  //   }));
  // };

  const getTooltipsLabelsPriority = (item, data) =>
    `${data.datasets[item.datasetIndex].label} - ${data.labels[item.index]}: ${
      data.datasets[item.datasetIndex].data[item.index]
    }`;

  const getChartOptions = (priorityChartRef) => ({
    ...doughnutChartOptions,
    legend: {
      display: false,
      // position: "right",
      // labels: {
      //   generateLabels: generateLabelsPriority,
      // },
      // onClick: (mouseEvent, legendItem) => {
      //   const ci = priorityChartRef?.current?.chartInstance;
      //   ci.getDatasetMeta(legendItem.datasetIndex).hidden = ci.isDatasetVisible(
      //     legendItem.datasetIndex
      //   );
      //   ci.update();
      // },
    },
    tooltips: {
      callbacks: {
        label: getTooltipsLabelsPriority,
      },
    },
  });

  const data = {
    labels: ["Minor", "Major", "Critical"],
    datasets: [
      {
        label: PriorityStatus.Open,
        data: [1, 2, 3],
        backgroundColor: [
          "rgb(17, 27, 88)",
          "rgb(0, 184, 186)",
          "rgb(240,88,34)",
        ],
        hoverOffset: 4,
      },
      {
        label: PriorityStatus.Closed,
        data: [4, 5, 6],
        backgroundColor: [
          "rgb(17, 27, 88)",
          "rgb(0, 184, 186)",
          "rgb(240,88,34)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const onOpenClick = (e) => {
    const ci = chartRef?.current?.chartInstance;
    ci.getDatasetMeta(0).hidden = ci.isDatasetVisible(0);
    ci.update();
  };

  const onClosedClick = (e) => {
    const ci = chartRef?.current?.chartInstance;
    ci.getDatasetMeta(1).hidden = ci.isDatasetVisible(1);
    ci.update();
  };

  return (
    <div className="page">
      <div className="box">
        <Pie ref={chartRef} data={data} options={getChartOptions(chartRef)} />
        <ul className="outerUl">
          <li className="statusLabel" onClick={onOpenClick}>
            Open
          </li>
          <ul className="innerUl">
            <li style={{ color: data.datasets[0].backgroundColor[0] }}>
              Minor: {data.datasets[0].data[0]}
            </li>
            <li style={{ color: data.datasets[0].backgroundColor[1] }}>
              Major: {data.datasets[0].data[1]}
            </li>
            <li style={{ color: data.datasets[0].backgroundColor[2] }}>
              Critical: {data.datasets[0].data[2]}
            </li>
          </ul>
          <li className="statusLabel" onClick={onClosedClick}>
            Closed
          </li>
          <ul className="innerUl">
            <li style={{ color: data.datasets[1].backgroundColor[0] }}>
              Minor: {data.datasets[1].data[0]}
            </li>
            <li style={{ color: data.datasets[1].backgroundColor[1] }}>
              Major: {data.datasets[1].data[1]}
            </li>
            <li style={{ color: data.datasets[1].backgroundColor[2] }}>
              Critical: {data.datasets[1].data[2]}
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default Charts;
