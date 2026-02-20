import mongoose, { Schema, models } from 'mongoose';

const componentSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  npmPackages: { type: [String], default: [] },
  category: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  dateCreated: { type: Date, default: Date.now },

  previewImage: {
    type: String,
    default: '',
  },
});

const Component = models.Component || mongoose.model('Component', componentSchema);
export default Component;
