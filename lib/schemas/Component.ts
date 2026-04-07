import mongoose, { Schema, models } from 'mongoose';

const componentSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  // 🔥 frontend | backend
  type: {
    type: String,
    enum: ['frontend', 'backend'],
    required: true,
  },
  // 🔥 STRING (frontend) OR OBJECT (backend)
  code: {
    type: Schema.Types.Mixed,
    required: true,
  },
  // 🔥 frameworks for backend
  frameworks: {
    type: [String],
    default: [],
  },
  // code: { type: String, required: true },
  npmPackages: { type: [String], default: [] },
  category: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
   // 🔥 optional dynamic data
  extraFields: {
    type: Schema.Types.Mixed,
    default: {},
  },
  dateCreated: { type: Date, default: Date.now },

  previewImage: {
    type: String,
    default: '',
  },
});

const Component = models.Component || mongoose.model('Component', componentSchema);
export default Component;
