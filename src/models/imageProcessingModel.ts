import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  serial_number: { type: Number, required: true },
  product_name: { type: String, required: true },
  input_images: { type: [String], required: true }, 
  output_images: { type: [String], default: [] }, 
});

const ImageProcessingSchema = new mongoose.Schema({
  request_id: { type: String, required: true, unique: true },
  status: { type: String, enum: ["processing", "completed"], default: "processing" },
  products: { type: [productSchema], required: true },
  webhook_url: { type: String }, 
  created_at: { type: Date, default: Date.now },
});

const ImageProcessing = mongoose.model("ImageProcessing", ImageProcessingSchema);

export const saveProcessingRequest = async (requestId: string, products: any, webhook_url?: string) => {
  return await ImageProcessing.create({ request_id: requestId, products, webhook_url });
};

export const getRequestStatus = async (requestId: string) => {
  const record = await ImageProcessing.findOne({ request_id: requestId });
  return record ? record.status : "not found";
};
