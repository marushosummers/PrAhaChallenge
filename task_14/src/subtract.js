const subtract = (nums) => {
  const result = nums.reduce((accumulator, current) => accumulator - current);
	return result > 0 ? result : "negative number";
};

module.exports = subtract;
