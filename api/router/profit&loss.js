const router = require("express").Router();
const { error, success, ErrorResponse } = require("../services/response");
const PL = require("../model/profit&loss");

// clacluting profit and loss by user selling price and cost price
router.post("/profit&loss", async (req, res) => {
  try {
    const { Selling_Price, Cost_Price, Loss, Loss_in_percent, User_ID } =
      req.body;
    if (Selling_Price > Cost_Price) {
      const profit = Selling_Price - Cost_Price;
      const profit_percent = ((profit / Cost_Price) * 100).toFixed(2);
      //   res.send(`your profit is ${profit}`);
      //   res.send(`your profit in percentage ${profit_percent}%`);
    } else if (Selling_Price < Cost_Price) {
      const loss = Cost_Price - Selling_Price;
      const loss_percent = ((loss / Cost_Price) * 100).toFixed(2);
      //   res.send(`your Loss is ${loss}`);
      // res.send(`your Loss in percentage ${loss_percent}%`);

      const data = {
        Selling_Price: Selling_Price,
        Cost_Price: Cost_Price,
        Loss: loss,
        Loss_in_percent: loss_percent,
        User_ID: User_ID,
      };
      const data2 = new PL(data);
      await data2.save();
      res.send(data);
    }
  } catch (e) {
    error(res, e);
  }
});

module.exports = router;
