let arr = [];
"aaddccdc".split("").forEach((item) => {
  let index = arr.findIndex((i) => i.value === item);
  if (index !== -1) {
    arr[index].count++;
  } else {
    arr.push({ value: item, count: 1 });
  }
});

console.log('arr', arr);
console.log(
  arr
    .sort(function (a, b) {
      if (a.count === b.count) {
        // console.log('a, b', a, b);
        return a.value.charCodeAt() - b.value.charCodeAt();
      } 
      else {
        // console.log('进来', a.value, b.value, a.count, b.count);
        return b.count - a.count;
      }
    })
    .map((i) => i.value)
    .join("")
);
