const add = require("./add");

describe("足し算", () => {
	test("1+2=3となる", () => {
		expect(add([1, 2])).toEqual(3);
	});
	test("計算結果が1000を超える場合は「too big」と文字列が返る", () => {
		expect(add([1000, 1])).toEqual("too big");
	});
});
