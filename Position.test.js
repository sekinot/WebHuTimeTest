require("./debugHuTime.js");
require("./testCommon.js");

// describe("aaa", () => {
//     let a = null + 1;
//     let b = 1;
//     b = undefined.a;// FIXME: jest error
//     return;
// });


describe("PositionArray", () => {
    const acceptableValue = [
        new HuTime.XYPosition(0, 0),
        new HuTime.XYPosition(1, 1),
        new HuTime.XYPosition(2, 2)
    ];
    const addedItems = [
        new HuTime.XYPosition(3, 3),
        new HuTime.XYPosition(4, 4)
    ]

    describe("constructor", () => {
        test.each (invalidValues().add(-1))
        ("Invalid items(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(value);
            expect(positions.length).toBe(0);
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(HuTime.ErrorInfos.log[0].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].method).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("items");
        });
        test.each (invalidValues().addNumbers())
        ("Invalid items array(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...addedItems.concat([value]));
            expect(positions.length).toBe(0);
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(HuTime.ErrorInfos.log[0].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].method).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("items");
        });
        test("Acceptable items(PositionBase)", () => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            expect(HuTime.ErrorInfos.log.length).toBe(0);
        });
        test("Acceptable items(length)", () => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(30);
            expect(positions.length).toBe(30);
            expect(HuTime.ErrorInfos.log.length).toBe(0);
        });
    });
    describe("push", () => {
        test.each (invalidValues().addNumbers())
        ("Invalid items(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.push(value);
            expect(positions.length).toBe(3);
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(HuTime.ErrorInfos.log[0].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].method).toBe("push");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("items");
        });
        test.each (invalidValues().addNumbers())
        ("Invalid items array(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.push(...addedItems.concat([value]));
            expect(positions.length).toBe(3);
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(HuTime.ErrorInfos.log[0].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].method).toBe("push");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("items");
        });
        test("Acceptable items", () => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.push(...addedItems);
            expect(positions.length).toBe(5);
            expect(positions[3]).toStrictEqual(addedItems[0]);
            expect(positions[4]).toStrictEqual(addedItems[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(0);
        });
    });
    describe("unshift", () => {
        test.each (invalidValues().addNumbers())
        ("Invalid items(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.unshift(value);
            expect(positions.length).toBe(3);
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(HuTime.ErrorInfos.log[0].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].method).toBe("unshift");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("items");
        });
        test.each (invalidValues().addNumbers())
        ("Invalid items array(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.unshift(...addedItems.concat([value]));
            expect(positions.length).toBe(3);
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(HuTime.ErrorInfos.log[0].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].method).toBe("unshift");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("items");
        });
        test("Acceptable items", () => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.unshift(...addedItems);
            expect(positions.length).toBe(5);
            expect(positions[0]).toStrictEqual(addedItems[0]);
            expect(positions[1]).toStrictEqual(addedItems[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(0);
        });
    });
    describe("splice", () => {
        test.each (invalidValues().addNumbers())
        ("Invalid items (non-delete)(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.splice(0, 0, value);
            expect(positions.length).toBe(3);
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(HuTime.ErrorInfos.log[0].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].method).toBe("splice");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("items");
        });
        test.each (invalidValues().addNumbers())
        ("Invalid items (delete)(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.splice(0, 1, value);
            expect(positions.length).toBe(2);
            expect(positions[0]).toStrictEqual(acceptableValue[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(HuTime.ErrorInfos.log[0].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].method).toBe("splice");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("items");
        });
        test.each (invalidValues().addNumbers())
        ("Invalid items array(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.splice(0, 0,
                ...addedItems.concat([value]));
            expect(positions.length).toBe(3);
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(HuTime.ErrorInfos.log[0].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].method).toBe("splice");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("items");
        });
        test.each (invalidValues().except(Infinity).except(true))
        ("Invalid start(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.splice(value, 0, ...addedItems);
            expect(positions.length).toBe(5);
            expect(positions[0]).toStrictEqual(addedItems[0]);
            expect(positions[1]).toStrictEqual(addedItems[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(0);
        });
        test.each (invalidValues().except(Infinity).except(true))
        ("Invalid start(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.splice(0, value, ...addedItems);
            expect(positions.length).toBe(5);
            expect(positions[0]).toStrictEqual(addedItems[0]);
            expect(positions[1]).toStrictEqual(addedItems[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(0);
        });
        test("Acceptable items (non-delete)", () => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.splice(0, 0, ...addedItems);
            expect(positions.length).toBe(5);
            expect(positions[0]).toStrictEqual(addedItems[0]);
            expect(positions[1]).toStrictEqual(addedItems[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(0);

            positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.splice(1, 0, ...addedItems);
            expect(positions.length).toBe(5);
            expect(positions[1]).toStrictEqual(addedItems[0]);
            expect(positions[2]).toStrictEqual(addedItems[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(0);

            positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.splice(-1, 0, ...addedItems);
            expect(positions.length).toBe(5);
            expect(positions[2]).toStrictEqual(addedItems[0]);
            expect(positions[3]).toStrictEqual(addedItems[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(0);
        });
        test("Acceptable items (delete)", () => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.splice(0, 1, ...addedItems);
            expect(positions.length).toBe(4);
            expect(positions[0]).toStrictEqual(addedItems[0]);
            expect(positions[1]).toStrictEqual(addedItems[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(0);

            positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.splice(1, 1, ...addedItems);
            expect(positions.length).toBe(4);
            expect(positions[1]).toStrictEqual(addedItems[0]);
            expect(positions[2]).toStrictEqual(addedItems[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(0);

            positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            positions.splice(-1, 1, ...addedItems);
            expect(positions.length).toBe(4);
            expect(positions[2]).toStrictEqual(addedItems[0]);
            expect(positions[3]).toStrictEqual(addedItems[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(0);
        });
    });
    describe("concat", () => {
        test.each (invalidValues().addNumbers().exceptArrays())
        ("Invalid items(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            let newArray = positions.concat(value);
            expect(positions.length).toBe(3);
            expect(newArray.length).toBe(3);
            expect(newArray).toBeInstanceOf(HuTime.PositionArray);
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(HuTime.ErrorInfos.log[0].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].method).toBe("concat");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("items");
        });
        test.each (invalidValues().addNumbers())
        ("Invalid items array(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            let newArray = positions.concat(addedItems.concat([value]));
            expect(positions.length).toBe(3);
            expect(newArray.length).toBe(3);
            expect(newArray).toBeInstanceOf(HuTime.PositionArray);
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(HuTime.ErrorInfos.log[0].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].method).toBe("concat");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("items");
        });
        test("Acceptable items", () => {
            HuTime.ErrorInfos.clearLog();
            let positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            let newArray = positions.concat(addedItems);
            expect(positions.length).toBe(3);
            expect(newArray.length).toBe(5);
            expect(newArray).toBeInstanceOf(HuTime.PositionArray);
            expect(newArray[3]).toStrictEqual(addedItems[0]);
            expect(newArray[4]).toStrictEqual(addedItems[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(0);

            HuTime.ErrorInfos.clearLog();
            positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            newArray = positions.concat(...addedItems);
            expect(positions.length).toBe(3);
            expect(newArray.length).toBe(5);
            expect(newArray).toBeInstanceOf(HuTime.PositionArray);
            expect(newArray[3]).toStrictEqual(addedItems[0]);
            expect(newArray[4]).toStrictEqual(addedItems[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(0);

            HuTime.ErrorInfos.clearLog();
            positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            newArray = positions.concat(...addedItems, addedItems);
            expect(positions.length).toBe(3);
            expect(newArray.length).toBe(7);
            expect(newArray).toBeInstanceOf(HuTime.PositionArray);
            expect(newArray[3]).toStrictEqual(addedItems[0]);
            expect(newArray[4]).toStrictEqual(addedItems[1]);
            expect(newArray[5]).toStrictEqual(addedItems[0]);
            expect(newArray[6]).toStrictEqual(addedItems[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(0);

            HuTime.ErrorInfos.clearLog();
            positions = new HuTime.PositionArray(...acceptableValue);
            expect(positions.length).toBe(3);
            newArray = positions.concat(addedItems, ...addedItems);
            expect(positions.length).toBe(3);
            expect(newArray.length).toBe(7);
            expect(newArray).toBeInstanceOf(HuTime.PositionArray);
            expect(newArray[3]).toStrictEqual(addedItems[0]);
            expect(newArray[4]).toStrictEqual(addedItems[1]);
            expect(newArray[5]).toStrictEqual(addedItems[0]);
            expect(newArray[6]).toStrictEqual(addedItems[1]);
            expect(HuTime.ErrorInfos.log.length).toBe(0);
        });

    });
    describe("toPositionArray", () => {
        test.each (invalidValues().addNumbers().exceptArrays())
        ("Invalid items(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = HuTime.PositionArray.toPositionArray(value);
            expect(positions.length).toBe(0);
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(HuTime.ErrorInfos.log[0].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].method).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("items");
        });
        test.each (invalidValues().addNumbers())
        ("Invalid items array(%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let positions = HuTime.PositionArray.toPositionArray(
                addedItems.concat([value]));
            expect(positions.length).toBe(0);
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(HuTime.ErrorInfos.log[0].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].method).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("items");
        });
        test("Acceptable items", () => {
            HuTime.ErrorInfos.clearLog();
            let positions = HuTime.PositionArray.toPositionArray(acceptableValue);
            expect(positions.length).toBe(3);
            expect(HuTime.ErrorInfos.log.length).toBe(0);
        });
    });
});

