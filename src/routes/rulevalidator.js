/* eslint-disable prefer-destructuring */
import express from 'express';
import rulevalidator from '../controllers/validateRule';

/**
 * @swagger
 * /validate-rule:
 *   post:
 *     tags:
 *       - validate Rule
 *     name: Rule validator
 *     summary: Validates Rule
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                rule:
 *                 type: json
 *                data:
 *                 type: json
 *     responses:
 *       201:
 *             description:  successfully validated.
 *       400:
 *             description: failed validation.
 * */

const router = express.Router();

router.post('/validate-rule', rulevalidator);

export default router;
