const express = require('express');
const { body } = require('express-validator');
const {
  createContract,
  getContracts,
  getContractById,
  updateContract,
  deleteContract,
  renewContract
} = require('../controllers/contractController');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

const contractValidation = [
  body('propertyId').isInt().withMessage('Valid property ID is required'),
  body('unitId').isInt().withMessage('Valid unit ID is required'),
  body('tenantId').isInt().withMessage('Valid tenant ID is required'),
  body('leaseDuration').isInt({ min: 1 }).withMessage('Valid lease duration is required'),
  body('contractStartDate').isISO8601().withMessage('Valid start date is required'),
  body('contractEndDate').isISO8601().withMessage('Valid end date is required'),
  body('monthlyRent').isFloat({ min: 0 }).withMessage('Valid monthly rent is required'),
  body('deposit').isFloat({ min: 0 }).withMessage('Valid deposit is required'),
];

router.post('/', authenticateToken, authorize('landlord', 'admin'), contractValidation, createContract);
router.get('/', authenticateToken, getContracts);
router.get('/:id', authenticateToken, getContractById);
router.put('/:id', authenticateToken, authorize('landlord', 'admin'), updateContract);
router.delete('/:id', authenticateToken, authorize('landlord', 'admin'), deleteContract);
router.post('/:id/renew', authenticateToken, authorize('landlord', 'admin'), renewContract);

module.exports = router;