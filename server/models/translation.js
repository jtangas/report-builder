import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let TranslationSchema = new Schema({
  token: String,
  client: String,
  variant: String,
  'report_types': Array,
  translations: Object,
  'draft_translations': Object
});

module.exports = mongoose.model('tokens', TranslationSchema);