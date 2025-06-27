import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }, // ✅ renamed from phoneNumber → phone
  purpose: { type: String, required: true }, // ✅ renamed from purposeOfVisit → purpose
  arrivalDate: { type: Date, required: true }, // ✅ renamed from dateOfArrival
  departureDate: { type: Date, required: true }, // ✅ renamed from dateOfDeparture
  mealRequired: { type: Boolean, default: false }, // ✅ renamed from mealsIncluded
  groupType: { type: String, required: true }, // ✅ renamed from bookingType
  groupSize: { type: String, required: true }, // ✅ add missing groupSize
  specialRequests: { type: String } // ✅ keep as is
});

export default mongoose.model('Guest', guestSchema);
