import mongoose, { Schema, models } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  dateCreated: { type: Date, default: Date.now },
});

const Category = models.Category || mongoose.model('Category', categorySchema);
export default Category;