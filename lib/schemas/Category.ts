// lib/schemas/Category.ts
import mongoose, { Schema, models } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  components: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Component' }], // must be here
  dateCreated: { type: Date, default: Date.now },
});

const Category = models.Category || mongoose.model('Category', categorySchema);
export default Category;
