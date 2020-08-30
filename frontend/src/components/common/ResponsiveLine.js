import React from "react";
import { ResponsiveLine as Line } from "@nivo/line";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export default function ResponsiveLine(props) {
  const graphData = [
    {
      id: "japan",
      color: "hsl(258, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 107,
        },
        {
          x: "helicopter",
          y: 15,
        },
        {
          x: "boat",
          y: 279,
        },
        {
          x: "train",
          y: 199,
        },
        {
          x: "subway",
          y: 67,
        },
        {
          x: "bus",
          y: 162,
        },
        {
          x: "car",
          y: 144,
        },
        {
          x: "moto",
          y: 73,
        },
        {
          x: "bicycle",
          y: 154,
        },
        {
          x: "horse",
          y: 225,
        },
        {
          x: "skateboard",
          y: 141,
        },
        {
          x: "others",
          y: 272,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(295, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 109,
        },
        {
          x: "helicopter",
          y: 174,
        },
        {
          x: "boat",
          y: 293,
        },
        {
          x: "train",
          y: 208,
        },
        {
          x: "subway",
          y: 285,
        },
        {
          x: "bus",
          y: 186,
        },
        {
          x: "car",
          y: 244,
        },
        {
          x: "moto",
          y: 249,
        },
        {
          x: "bicycle",
          y: 199,
        },
        {
          x: "horse",
          y: 101,
        },
        {
          x: "skateboard",
          y: 76,
        },
        {
          x: "others",
          y: 166,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(146, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 227,
        },
        {
          x: "helicopter",
          y: 198,
        },
        {
          x: "boat",
          y: 185,
        },
        {
          x: "train",
          y: 210,
        },
        {
          x: "subway",
          y: 223,
        },
        {
          x: "bus",
          y: 141,
        },
        {
          x: "car",
          y: 175,
        },
        {
          x: "moto",
          y: 221,
        },
        {
          x: "bicycle",
          y: 209,
        },
        {
          x: "horse",
          y: 272,
        },
        {
          x: "skateboard",
          y: 283,
        },
        {
          x: "others",
          y: 241,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(39, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 289,
        },
        {
          x: "helicopter",
          y: 54,
        },
        {
          x: "boat",
          y: 51,
        },
        {
          x: "train",
          y: 204,
        },
        {
          x: "subway",
          y: 132,
        },
        {
          x: "bus",
          y: 297,
        },
        {
          x: "car",
          y: 213,
        },
        {
          x: "moto",
          y: 278,
        },
        {
          x: "bicycle",
          y: 285,
        },
        {
          x: "horse",
          y: 197,
        },
        {
          x: "skateboard",
          y: 228,
        },
        {
          x: "others",
          y: 208,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(106, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 203,
        },
        {
          x: "helicopter",
          y: 65,
        },
        {
          x: "boat",
          y: 188,
        },
        {
          x: "train",
          y: 55,
        },
        {
          x: "subway",
          y: 77,
        },
        {
          x: "bus",
          y: 101,
        },
        {
          x: "car",
          y: 57,
        },
        {
          x: "moto",
          y: 9,
        },
        {
          x: "bicycle",
          y: 42,
        },
        {
          x: "horse",
          y: 163,
        },
        {
          x: "skateboard",
          y: 208,
        },
        {
          x: "others",
          y: 298,
        },
      ],
    },
  ];
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Line
        data={props.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Date",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        colors={{ scheme: "nivo" }}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[]}
      />
    </div>
  );
}
