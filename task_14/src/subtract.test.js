const subtract = require("./subtract");

describe("引き算", () => {
	test("3-2=1となる", () => {
		expect(subtract([3, 2])).toEqual(1);
	});
	test("計算結果がマイナスの場合は「negative number」と文字列が返る", () => {
		expect(subtract([1, 2])).toEqual("negative number");
	});
});
