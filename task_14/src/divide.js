const divide = (nums) => {
  if (nums.some((num) => num == 0))
    throw "ZeroDivisionError: division by zero";

  const result = nums.reduce((accumulator, current) => accumulator / current);
  // 小数点第3位で四捨五入
  return Math.round(result * 100) / 100;
};

module.exports = divide;
