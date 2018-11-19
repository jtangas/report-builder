import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let ReportConfigSchema = new Schema({
  name: String,
  type: String,
  client: String,
  variant: String,
  template: String,
  language: String,
  phenotypes: Array,
  phenotypeSpecificTemplates: Object,
  createdBy: Number,
  approved: Boolean,
  approvedBy: Number,
  createdAt: Date,
});

module.exports = mongoose.model('ReportConfig', ReportConfigSchema);