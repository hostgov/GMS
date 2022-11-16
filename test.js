const model = require("./models/orderModel")
model.insertMany([
    {
        "order_number": "1030",
        "product_name": "Edible oil",
        "product_quantity": 30,
        "product_price": 90,
        "total_price": 2700,
        "payment_mode": "Online",
        "order_date": new Date("2022-05-28"),
        "customer_number": 1234234456,
        "product_code": 1
    },
    {
        "order_number": "1031",
        "product_name": "Toothbrush",
        "product_quantity": 20,
        "product_price": 40,
        "total_price": 800,
        "payment_mode": "Online",
        "order_date": new Date("2022-05-28"),
        "customer_number": 1234234456,
        "product_code": 6
    },
    {
        "order_number": "1032",
        "product_name": "Shampoo",
        "product_quantity": 50,
        "product_price": 20,
        "total_price": 1000,
        "payment_mode": "Online",
        "order_date": new Date("2022-05-28"),
        "customer_number": 1234234456,
        "product_code": 9
    }
]);
model.find({
    $and:
        [
            {
                "order_date": {$gte: new Date("2022-05-26")}
            },
            {
                "order_date": {$lte: new Date("2022-05-30")}
            }
        ]
});
model.updateMany({$and: [{"product_name": "Cookies"}, {"product_price": 10}]}, {$set: {"product_price": 11}})

model.insertOne({
    "role_id": db.counters.findOneAndUpdate(
        {"seqName": "role_id_seq"},
        {$inc: {
                "seq": 1
            }},
        {returnNewDocument: true}
    ).seq,
    "role_name": "admin",
    "action": {
        "employees": "1111",
        "orders": "1111",
        "products": "1111"
    }
});
model.insertOne({
    "role_id": db.counters.findOneAndUpdate(
        {"seqName": "role_id_seq"},
        {$inc: {
                "seq": 1
            }},
        {returnNewDocument: true}
    ).seq,
    "role_name": "storeManager",
    "action": {
        "employees": "0111",
        "orders": "0111",
        "products": "0111"
    }
});

model.insertOne({
    "role_id": db.counters.findOneAndUpdate(
        {"seqName": "role_id_seq"},
        {$inc: {
                "seq": 1
            }},
        {returnNewDocument: true}
    ).seq,
    "role_name": "billingEmployee",
    "action": {
        "employees": "0000",
        "orders": "0110",
        "products": "0000"
    }
});
model.insertOne({
    "role_id": db.counters.findOneAndUpdate(
        {"seqName": "role_id_seq"},
        {$inc: {
                "seq": 1
            }},
        {returnNewDocument: true}
    ).seq,
    "role_name": "employee",
    "action": {
        "employees": "0000",
        "orders": "0000",
        "products": "0000"
    }
});
model.insertOne({
    customer_number: 8238988832,
    lastModifyDate: new Date(),
    cartDetail: [
        {"product_code": 1},
        {"product_price": 90},
        {"purchase_quantity": 2},
        {"total": 180}
    ]
});
