export default function getYearSummary(
  records,
  group_key,
  agg_key,
  date_key,
  year,
  type
) {
  if (type === "bar") {
    const data = [
      { month: "Jan", month_num: "01" },
      { month: "Feb", month_num: "02" },
      { month: "Mar", month_num: "03" },
      { month: "Apr", month_num: "04" },
      { month: "May", month_num: "05" },
      { month: "Jun", month_num: "06" },
      { month: "Jul", month_num: "07" },
      { month: "Aug", month_num: "08" },
      { month: "Sep", month_num: "09" },
      { month: "Oct", month_num: "10" },
      { month: "Nov", month_num: "11" },
      { month: "Dec", month_num: "12" },
    ];
    data.map((month) => {
      for (var i = 0; i < records.length; i++) {
        if (records[i][date_key].substring(0, 4) == year) {
          if (records[i][date_key].substring(5, 7) == month["month_num"]) {
            if (month[records[i][group_key]]) {
              month[records[i][group_key]] += parseFloat(records[i][agg_key]);
            } else {
              month[records[i][group_key]] = parseFloat(records[i][agg_key]);
            }
          }
        }
      }
      delete month["month_num"];
    });
    //console.log(data);
    return data;
  } else if (type === "line") {
    const months = [
      { month: "Jan", month_num: "01" },
      { month: "Feb", month_num: "02" },
      { month: "Mar", month_num: "03" },
      { month: "Apr", month_num: "04" },
      { month: "May", month_num: "05" },
      { month: "Jun", month_num: "06" },
      { month: "Jul", month_num: "07" },
      { month: "Aug", month_num: "08" },
      { month: "Sep", month_num: "09" },
      { month: "Oct", month_num: "10" },
      { month: "Nov", month_num: "11" },
      { month: "Dec", month_num: "12" },
    ];
    const data = [];
    const idKeys = [];
    records.map((record) => {
      if (!idKeys.includes(record[group_key])) {
        idKeys.push(record[group_key]);
        data.push({
          id: record[group_key],
          data: months.map((month) => {
            if (month.month_num == record[date_key].substring(5, 7)) {
              var y = parseFloat(record[agg_key]);
            } else {
              var y = 0;
            }
            return {
              x: month.month,
              y: y,
              month_num: month.month_num,
            };
          }),
        });
      } else {
        data.map((d) => {
          if (d.id == record[group_key]) {
            const month_data = d.data;
            month_data.map((m) => {
              if (m.month_num == record[date_key].substring(5, 7)) {
                m.y += parseFloat(record[agg_key]);
              }
            });
          }
        });
      }
    });
    //console.log(data);
    return data;
  }
}
