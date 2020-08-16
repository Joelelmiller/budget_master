export default function getYearSummary(
  records,
  group_key,
  agg_key,
  date_key,
  year
) {
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
}
