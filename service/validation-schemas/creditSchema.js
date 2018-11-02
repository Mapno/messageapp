const creditSchema = {
    "id": "/Message",
    "type": "object",
    "properties":
    {
        "amount": { "type": "number", "min": "0"},
    }
}

module.exports = creditSchema;