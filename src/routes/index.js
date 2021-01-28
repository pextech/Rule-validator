/* eslint-disable no-unused-vars */
import express from 'express';
import Sequelize from 'sequelize';
import documentation from './documentation';
import rulevalidator from './rulevalidator';

const router = express.Router();

// router.use('/', documentation);

router.use('/', documentation);

// rulevalidator Route

router.use('/', rulevalidator);

// welcome Route

router.get('/', (req, res) => {
  res.status(200).json(
    {
      message: 'My Rule-Validation API',
      status: 'success',
      data: {
        name: 'Cedrick Mupenzi',
        github: '@pextech',
        email: 'mcstain1639@gmail.com',
        mobile: '+250780812252',
      },
    },
  );
});

// page not Found Route

router.use((req, res) => {
  const error = new Error('Page Not found');
  res.status(404).json({

    error: {
      message: error.message,
    },
  });
});

export default router;
