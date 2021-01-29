import isObject from 'isobject';

// import model
const { validaterule } = require('../models');

// function Validate rules

const rulevalidator = async (req, res) => {
  // check if only Rule and data are passed

  if ((req.body.rule || req.body.data) && Object.keys(req.body).length === 2) {
    // adding flattened field type to data field

    const addFlatten = { ...req.body.data, type: 'flattened' };

    // check if Rule is passed

    if (req.body.rule == null) {
      return res.status(400).json(
        {
          message: 'rule is required.',
          status: 'error',
          data: null,
        },
      );
    }

    // check if Data is passed

    if (addFlatten == null) {
      return res.status(400).json(
        {
          message: 'data is required.',
          status: 'error',
          data: null,
        },
      );
    }

    // check if Rule is an Object

    if (!isObject(req.body.rule)) {
      return res.status(400).json(
        {
          message: 'rule should be an object.',
          status: 'error',
          data: null,
        },
      );
    }

    // check if Data is an object

    if (!isObject(addFlatten)) {
      return res.status(400).json(
        {
          message: 'data should be an object.',
          status: 'error',
          data: null,
        },
      );
    }

    // start validating

    const ruleField = req.body.rule.field;

    const field = ruleField.split('.')[0];

    // const checkField = ruleField in addFlatten;

    const checkField = addFlatten.hasOwnProperty(field);

    const conditionValue = req.body.rule.condition_value;

    // check if Field passed has corresponding field in data

    if (!checkField) {
      return res.status(400).json(
        {
          message: `field ${ruleField} is missing from data.`,
          status: 'error',
          data: null,
        },
      );
    }

    const fieldValue = Object.values(addFlatten);

    const find = fieldValue.find((el) => el == conditionValue);

    // this tests only rule and data

    if (req.body.rule && req.body.data) {
      // perform given tasks when passed 'eq'

      if (req.body.rule.condition === 'eq' || req.body.rule.condition === 'contains') {
        if (find != conditionValue) {
          return res.status(400).json(
            {
              message: `field ${req.body.rule.field} failed validation.`,
              status: 'error',
              data: {
                validation: {
                  error: true,
                  field: req.body.rule.field,
                  field_value: find,
                  condition: req.body.rule.condition,
                  condition_value: req.body.rule.condition_value,
                },
              },
            },
          );
        }
      }

      // perform given tasks when passed 'neq'

      if (req.body.rule.condition === 'neq') {
        if (find == conditionValue) {
          return res.status(400).json(
            {
              message: `field ${req.body.rule.field} failed validation.`,
              status: 'error',
              data: {
                validation: {
                  error: true,
                  field: req.body.rule.field,
                  field_value: find,
                  condition: req.body.rule.condition,
                  condition_value: req.body.rule.condition_value,
                },
              },
            },
          );
        }
      }

      // perform given tasks when passed 'gt'

      if (req.body.rule.condition === 'gt') {
        if (find < conditionValue) {
          return res.status(400).json(
            {
              message: `field ${req.body.rule.field} failed validation.`,
              status: 'error',
              data: {
                validation: {
                  error: true,
                  field: req.body.rule.field,
                  field_value: find,
                  condition: req.body.rule.condition,
                  condition_value: req.body.rule.condition_value,
                },
              },
            },
          );
        }
      }

      // this puts data in the database

      validaterule.create({
        rule: req.body.rule,
        data: addFlatten,
      }).then(() => {
        res.status(201).json({
          message: `field ${req.body.rule.field} successfully validated.`,
          status: 'success',
          data: {
            validation: {
              error: false,
              field: req.body.rule.field,
              field_value: find,
              condition: req.body.rule.condition,
              condition_value: req.body.rule.condition_value,
            },
          },

        });

        // below line catches any error
      }).catch((error) => { res.status(500).json({ error }); });
    } // if payload passed doesn't exists
  } else {
    return res.status(400).json(
      {
        message: 'Invalid JSON payload passed.',
        status: 'error',
        data: null,
      },
    );
  }
};

export default rulevalidator;
