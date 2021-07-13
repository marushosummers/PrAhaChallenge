const multiply = (nums) => {
  const result = nums.reduce((accumulator, current) => accumulator * current);
  return result <= 1000 ? result : "big big number";
};

module.exports = multiply;
