import mongoose from 'mongoose';

const intakeFormSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  formType: {
    type: String,
    enum: ['individual', 'business', 'partnership', 's-corp'],
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'review', 'completed'],
    default: 'draft'
  },
  
  // Personal Information
  ssn: String,
  dateOfBirth: Date,
  maritalStatus: String,
  spouse: {
    firstName: String,
    lastName: String,
    ssn: String,
    dateOfBirth: Date
  },
  
  // Income Information
  w2Income: [
    {
      employer: String,
      amount: Number,
      year: Number
    }
  ],
  businessIncome: {
    businessName: String,
    businessType: String,
    grossIncome: Number,
    expenses: Number,
    netIncome: Number
  },
  capitalGains: Number,
  dividends: Number,
  otherIncome: Number,
  
  // Deductions
  standardDeduction: Boolean,
  itemizedDeductions: {
    mortgageInterest: Number,
    propertyTaxes: Number,
    charitableDonations: Number,
    medicalExpenses: Number,
    other: Number
  },
  
  // Additional Information
  dependents: [
    {
      name: String,
      ssn: String,
      relationship: String,
      dateOfBirth: Date
    }
  ],
  
  notes: String,
  documents: [String],
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  submittedAt: Date,
  completedAt: Date,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('IntakeForm', intakeFormSchema);
