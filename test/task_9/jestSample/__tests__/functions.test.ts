// todo: ここに単体テストを書いてみましょう！

import { sumOfArray, asyncSumOfArray, asyncSumOfArraySometimesZero, getFirstNameThrowIfLong} from "../functions";
import { DatabaseMock } from "../util";


describe("sumOfArray", (): void => {

    test('1+2が3になる', () => {
        expect(sumOfArray([1, 2])).toBe(3);
    });

    test('-1+1が0になる', () => {
        expect(sumOfArray([-1, 1])).toBe(0);
    });

    // test('空のArrayはErrorになる', () => {
    //     expect(() => {
    //         sumOfArray([]);
    //     }).toThrow(TypeError);
    // });

    test('空のArrayは0になる', () => {
        expect(sumOfArray([])).toBe(0);
    });

    test('1はそのまま1', () => {
        expect(sumOfArray([1])).toBe(1);
    });

    test('1+2+3は6になる', () => {
        expect(sumOfArray([1,2,3])).toBe(6);
    });
});

describe("asyncSumOfArray", (): void => {

    test('1+2が3になる', () => {
        asyncSumOfArray([1, 2]).then(data => {
            expect(data).toBe(3);
        });
    });

    test('-1+1が0になる', () => {
        asyncSumOfArray([-1, 1]).then(data => {
            expect(data).toBe(0);
        });
    });

    test('空のArrayはErrorになる', () => {
        asyncSumOfArray([]).then(data => {
            expect(data).toBe(0);
        });
    });
});

describe("asyncSumOfArraySometimesZero", (): void => {

    test('1+2が3になる', () => {
        const database = new DatabaseMock();
        asyncSumOfArraySometimesZero([1, 2], database).then(data => {
            expect(data).toBe(3);
        });
    });

    test('-1+1が0になる', () => {
        const database = new DatabaseMock();
        asyncSumOfArraySometimesZero([-1, 1], database).then(data => {
            expect(data).toBe(0);
        });
    });

    test('空のArrayは0が帰ってくる', () => {
        const database = new DatabaseMock();
        asyncSumOfArraySometimesZero([], database).then(data => {
            expect(data).toBe(0);
        });
    });
});

describe("getFirstNameThrowIfLong", (): void => {

    test('maxNameLengthを超えてないのでfirstNameが返ってくる', () => {
        const nameApiSerivce = jest.fn().mockImplementation(() => {
        return {
            MAX_LENGTH: 4,
            getFirstName: () => 'taro',
        };
        });
        getFirstNameThrowIfLong(4, nameApiSerivce()).then(data => {
            expect(data).toBe('taro');
        });
    });

    test('maxNameLengthを超えているのでエラーが出る', () => {
        const nameApiSerivce = jest.fn().mockImplementation(() => {
        return {
            MAX_LENGTH: 4,
            getFirstName: () => 'longName',
        };
        });
        getFirstNameThrowIfLong(4, nameApiSerivce()).then(data => {
            expect(data).toThrowError("first_name too long");
        });
    });
});