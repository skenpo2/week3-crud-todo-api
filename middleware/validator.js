const Joi = require('joi');
//For POST - Create new todo
const validateTodo = (req, res, next) => {
    const schema = Joi.object({
        task: Joi.string().trim().min(3).max(150).required(),
        completed: Joi.boolean().default(false)
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    req.body = value;
    next();
};

// For PATCH - Update todo (NEW)
const validatePatchTodo = (req, res, next) => {
    const schema = Joi.object({
        task: Joi.string().trim().min(3).max(150).optional(),
        completed: Joi.boolean().optional()
    }).min(1); // At least one field must be provided for PATCH

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    req.body = value;
    next();
};

module.exports = { validateTodo, validatePatchTodo };