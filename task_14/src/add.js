const add = (nums) => {
  const sum = nums.reduce((accumulator, current) => accumulator + current, 0);
  return sum <= 1000 ? sum : "too big";
};

module.exports = add;
