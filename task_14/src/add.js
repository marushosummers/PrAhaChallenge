const add = (nums) => {
  const result = nums.reduce((accumulator, current) => accumulator + current);
  return result <= 1000 ? result : "too big";
};

module.exports = add;
