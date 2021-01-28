/* eslint-disable eqeqeq */
/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
import isObject from 'isobject';

const validaterule = require('../models').validaterule;

const rulevalidator = async (req, res) => {
  if ((req.body.rule || req.body.data) && Object.keys(req.body).length === 2) {
    if (req.body.rule == null) {
      return res.status(400).json(
        {
          message: 'rule is required.',
          status: 'error',
          data: null,
        },
      );
    }
    if (req.body.data == null) {
      return res.status(400).json(
        {
          message: 'data is required.',
          status: 'error',
          data: null,
        },
      );
    }
    if (!isObject(req.body.rule)) {
      return res.status(400).json(
        {
          message: 'rule should be an object.',
          status: 'error',
          data: null,
        },
      );
    }
    if (!isObject(req.body.data)) {
      return res.status(400).json(
        {
          message: 'data should be an object.',
          status: 'error',
          data: null,
        },
      );
    }

    // start validating

    const dataField = req.body.data;
    const ruleField = req.body.rule.field;

    const checkField = ruleField in dataField;
    const conditionValue = req.body.rule.condition_value;

    if (!checkField) {
      return res.status(400).json(
        {
          message: `field ${ruleField} is missing from data.`,
          status: 'error',
          data: null,
        },
      );
    }
    const fieldValue = Object.values(dataField);

    const find = fieldValue.find((el) => el == conditionValue);
    if (req.body.rule && req.body.data) {
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
      validaterule.create({
        rule: req.body.rule,
        data: req.body.data,
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
      }).catch((error) => { res.status(500).json({ error }); });
    }
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
