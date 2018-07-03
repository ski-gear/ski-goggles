import { expect } from "chai";
import { parse } from "../Parser";
import { keys } from "ramda"

describe("Parser", () => {
  describe("parse", () => {
      const url = "https://smetrics.mydomain.com.au/b/ss/my-dev/1/JS-2.1.0/s5230049855810?AQB=1&ndh=1&pf=1&t=2%2F4%2F2018%2015%3A35%3A33%203%20-600&sdid=5777F20A4EE66956-63AA047E0846A89B&mid=90306787622975876769095255606777251334&aamlh=8&ce=UTF-8&ns=reagroup&pageName=rea%3Asold%3Aproperty%20details&g=https%3A%2F%2Fwww.realestate.com.au%2Fsold%2Fproperty-house-vic-apollo%2Bbay-127931502&cc=AUD&ch=sold&server=www.realestate.com.au&events=event60&c6=sold&v6=sold&c7=logged_out&v7=logged_out&c14=12793"
      it("parses the URL into an object", () => {
        expect(keys(parse(url)).length).to.eql(20);
        expect(parse(url)).to.deep.include({'ndh': '1'});
      });
    });

});
