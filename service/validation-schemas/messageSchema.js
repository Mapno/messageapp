const messageSchema = {
    "id": "/Message",
    "type": "object",
    "properties":
    {
        "destination": { "type": "string", "maxLength": "20", "regex": "([a-z])", "minLength": "1" },
        "body": { "type": "string", "maxLength": "20", "regex": "([a-z])", "minLength": "1" }
    }
}

module.exports = messageSchema;