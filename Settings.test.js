require("./debugHuTime.js");
require("./testCommon.js");

describe("SettingsRoot", () => {
    describe("reset", () => {
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types (%o)", (value) => {
            let settings = HuTime.Settings.OLObject;
            settings.initSize = 40;
            expect(settings.initSize).toBe(40);
            settings.reset(value);
            expect(settings.initSize).toBe(40);
        });
        test.each([
            "initSize", " initSize", "initSize ", " initSize "
        ])
        ("Acceptable Values (%o)", (value) => {
            let settings = HuTime.Settings.OLObject;
            settings.initSize = 40;
            expect(settings.initSize).toBe(40);
            settings.reset(value);
            expect(settings.initSize).toBe(settings.default.initSize);
        });
        test.each([
             null, undefined
        ])
        ("null", (value) => {
            let settings = HuTime.Settings.OLObject;
            settings.initSize = 40;
            settings.minSize = 40;
            settings.maxSize = 40;
            expect(settings.initSize).toBe(40);
            expect(settings.minSize).toBe(40);
            expect(settings.maxSize).toBe(40);
            settings.reset(value);
            expect(settings.initSize).toBe(settings.default.initSize);
            expect(settings.minSize).toBe(settings.default.minSize);
            expect(settings.maxSize).toBe(settings.default.maxSize);
        });
        test.each([
            null, undefined
        ])
        ("all object", (value) => {
            let settings = HuTime.Settings.OLObject;
            let settings2 = HuTime.Settings.FigureStyle;
            let settings3 = HuTime.Settings.StringStyle;
            settings.initSize = 40;
            settings2.initFillColor = "red";
            settings3.initFontSize = "40px";
            expect(settings.initSize).toBe(40);
            expect(settings2.initFillColor).toBe("red");
            expect(settings3.initFontSize).toBe("40px");
            HuTime.Settings.reset(value);
            expect(settings.initSize).toBe(settings.default.initSize);
            expect(settings2.initFillColor).toBe(settings2.default.initFillColor);
            expect(settings3.initFontSize).toBe(settings3.default.initFontSize);
        });
    });
});

describe("OLObject", () => {
    test("init", () => {
        let settings = HuTime.Settings.OLObject;
        let keys = Object.keys(settings)
                    .filter((key) => key !== "reset" && key !== "default");
        expect(keys.length)
            .toBe(Object.keys(settings.default).length);
    })
    test("reset", () => {
        let settings = HuTime.Settings.OLObject;
        settings.initSize = 40;
        expect(settings.initSize).toBe(40);
        settings.reset("initSize");
        expect(settings.initSize).toBe(settings.default.initSize);
        settings.initSize = 40;
        expect(settings.initSize).toBe(40);
        settings.reset();
        expect(settings.initSize).toBe(settings.default.initSize);
    })
});

describe("FigureStyle", () => {
    test("init", () => {
        let settings = HuTime.Settings.FigureStyle;
        let keys = Object.keys(settings)
            .filter((key) => key !== "reset" && key !== "default");
        expect(keys.length)
            .toBe(Object.keys(settings.default).length);
    })
    test("reset", () => {
        let settings = HuTime.Settings.FigureStyle;
        settings.initFillColor = "red";
        expect(settings.initFillColor).toBe("red");
        settings.reset("initFillColor");
        expect(settings.initFillColor).toBe(settings.default.initFillColor);
        settings.initFillColor = "red";
        expect(settings.initFillColor).toBe("red");
        settings.reset();
        expect(settings.initFillColor).toBe(settings.default.initFillColor);
    })
});

describe("StringStyle", () => {
    test("init", () => {
        let settings = HuTime.Settings.StringStyle;
        let keys = Object.keys(settings)
            .filter((key) => key !== "reset" && key !== "default");
        expect(keys.length)
            .toBe(Object.keys(settings.default).length);
    })
    test("reset", () => {
        let settings = HuTime.Settings.StringStyle;
        settings.initFontSize = "20px";
        expect(settings.initFontSize).toBe("20px");
        settings.reset("initFontSize");
        expect(settings.initFontSize).toBe(settings.default.initFontSize);
        settings.initFontSize = "20px";
        expect(settings.initFontSize).toBe("20px");
        settings.reset();
        expect(settings.initFontSize).toBe(settings.default.initFontSize);
    })
});
