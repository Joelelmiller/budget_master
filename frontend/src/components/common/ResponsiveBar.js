import React, { Fragment } from "react";
import { ResponsiveBar as Bar } from "@nivo/bar";

export default function ResponsiveBar(config) {
  const data = config.data;
  const grouping = config.grouping;
  const layout = config.layout;
  const keys = config.keys;
  return (
    <Fragment>
      <Bar
        groupMode={grouping}
        layout={layout}
        data={data}
        keys={keys}
        indexBy="month"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.15}
        innerPadding={4}
        colors={{ scheme: "nivo" }}
        borderRadius={12}
        borderColor={{ from: "color", modifiers: [["darker", "1.3"]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Date",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Category",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </Fragment>
  );
}
