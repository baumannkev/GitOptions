import { v4 as uuidV4 } from "uuid"

import Option from "../models/options.js"
// import router from "../routes/source.js"


//CREATE ONE OPTION
export const createOption = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const option = new Option({
        callOrPut: req.body.callOrPut,
        strategy: req.body.strategy,
        stock: req.body.stock,
        todayPrice: req.body.todayPrice,
        todayDate: req.body.todayDate,
        strikeDate: req.body.strikeDate,
        strikePrice: req.body.strikePrice,
        inputs: req.body.inputs,
    });

    option.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err)
            res.json({ message: err });
        });
}