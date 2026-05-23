import express from 'express';
import IntakeForm from '../models/IntakeForm.js';

const router = express.Router();

// Get all intake forms (admin)
router.get('/', async (req, res) => {
  try {
    const forms = await IntakeForm.find().populate('userId', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms', error: error.message });
  }
});

// Get user's intake forms
router.get('/user/:userId', async (req, res) => {
  try {
    const forms = await IntakeForm.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms', error: error.message });
  }
});

// Get form by ID
router.get('/:id', async (req, res) => {
  try {
    const form = await IntakeForm.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching form', error: error.message });
  }
});

// Create intake form
router.post('/', async (req, res) => {
  try {
    const { userId, formType } = req.body;
    
    const form = new IntakeForm({
      userId,
      formType,
      status: 'draft'
    });

    await form.save();
    res.status(201).json({ message: 'Form created', form });
  } catch (error) {
    res.status(500).json({ message: 'Error creating form', error: error.message });
  }
});

// Update intake form
router.put('/:id', async (req, res) => {
  try {
    const formData = req.body;
    formData.updatedAt = Date.now();
    
    const form = await IntakeForm.findByIdAndUpdate(req.params.id, formData, { new: true });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    
    res.json({ message: 'Form updated', form });
  } catch (error) {
    res.status(500).json({ message: 'Error updating form', error: error.message });
  }
});

// Submit form
router.patch('/:id/submit', async (req, res) => {
  try {
    const form = await IntakeForm.findByIdAndUpdate(
      req.params.id,
      { status: 'submitted', submittedAt: Date.now(), updatedAt: Date.now() },
      { new: true }
    );
    res.json({ message: 'Form submitted', form });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
});

export default router;
