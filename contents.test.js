require("../WebHuTime/release/HuTime.js");

describe("99999", () => {
    test("HuTime.StringStyleA", () => {
        const a = "ぼよん";
        let cs = new HuTime.StringStyleA(a);
        expect(cs.a).toBe(a);
        //expect(cs._a).toBe(a);
        let ds = new HuTime.StringStyleA();
        expect(ds.a).toBe(2);
        //expect(ds._a).toBe(2);
    });

    /*
    const expO = {a: "aaa", b: 12};
    const expA = ["aaa", "bbbb", "cc"];

    test("test1", () => {
        expect(1 + 1).toEqual(2);
        expect(1 + 2).toEqual(3);
        expect({a: "aaa", b: 12, c:12}).toMatchObject(expO);
    });
    test("sub test", () => {
        expect(1 - 1).toEqual(0);
        document.body.innerHTML =
            '<div id="a">qqq</div>';
        expect(document.getElementById("a").innerHTML).toEqual("qqq");
    });
    // */

    let a = 0;
    function forEach(items) {
      for (let index = 0; index < items.length; index++) {
        obj.callback(items[index]);
      }
    }
    let obj = {
        callback: function callback (item) {
            ++a;
        }
    }
    test("aaa", () => {
        const mockCallback = jest.spyOn(obj, "callback");
        forEach([0, 1]);

        // The mock function is called twice
        expect(mockCallback.mock.calls.length).toBe(2);

        // The first argument of the first call to the function was 0
        expect(mockCallback.mock.calls[0][0]).toBe(0);

        // The first argument of the second call to the function was 1
        expect(mockCallback.mock.calls[1][0]).toBe(1);

        expect(a).toBe(2);

        //console.log(mockCallback.getMockName());
    })

});

