const subtract = (nums) => {
  const sub = nums.reduce((accumulator, current) => accumulator - current);
	return sub > 0 ? sub : "negative number";
};

module.exports = subtract;
