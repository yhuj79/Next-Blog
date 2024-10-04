export function sortDate(list) {
  const sorted_list = list
    .sort(function (a, b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    .reverse();
  return sorted_list;
}
