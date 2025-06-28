import { Router } from 'express';
import Guest from '../models/Guest';
import { sendEmail, sendWhatsApp } from '../utils/notificationService';

const router = Router();

router.post('/', async (req, res) => {
  try {
    // Save guest
    const guest = new Guest(req.body);
    await guest.save();

    // Extract data
    const {
      fullName,
      email,
      phone,
      arrivalDate,
      departureDate,
      groupSize,
      groupType,
      purpose
    } = guest;

    // Format phone numbers safely
    const formattedGuestPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
    const formattedAdminPhone = process.env.ADMIN_PHONE?.startsWith('whatsapp:')
      ? process.env.ADMIN_PHONE
      : `whatsapp:${process.env.ADMIN_PHONE}`;

    //
    // 📩 EMAIL to Guest
    //
    await sendEmail(
      email,
      'Welcome to Anandwan!',
      `Dear ${fullName},

Thank you for registering your visit to Anandwan. We’re delighted to welcome you to our community.
Your visit means a lot to us. We hope your time here will be meaningful and filled with memorable experiences.

🌿 Arrival Date: ${new Date(arrivalDate).toDateString()}
🌿 Departure Date: ${new Date(departureDate).toDateString()}

If you have any questions, feel free to reach out.

Warm regards,  
Team Anandwan Awaas`
    );

    //
    // 📲 WhatsApp to Guest
    //
    try {
      await sendWhatsApp(
        `whatsapp:${formattedGuestPhone}`,
        `Dear ${fullName}, thank you for registering your visit to Anandwan!

We are happy to welcome you to our home of humanity, healing, and harmony. 🤝

🗓️ Arrival: ${new Date(arrivalDate).toDateString()}
🗓️ Departure: ${new Date(departureDate).toDateString()}

We look forward to hosting you!🌼  
– Team Anandwan Awaas`
      );
    } catch (err: any) {
      console.error('❌ WhatsApp to guest failed:', err.message);
    }

    //
    // 📩 EMAIL to Admin
    //
    await sendEmail(
      process.env.ADMIN_EMAIL!,
      '📥 New Guest Registered!',
      `A new guest has just registered for a visit to Anandwan.

👤 Name: ${fullName}
🎯 Purpose: ${purpose}
👥 Group: ${groupType} (${groupSize})
🗓️ Dates: ${new Date(arrivalDate).toDateString()} to ${new Date(departureDate).toDateString()}

Full guest details are available on the admin dashboard.`
    );

    //
    // 📲 WhatsApp to Admin
    //
    try {
      await sendWhatsApp(
        formattedAdminPhone!,
        `📥 New Guest Registered!

👤 ${fullName}
🎯 Purpose: ${purpose}
👥 ${groupType} (${groupSize})
🗓️ ${new Date(arrivalDate).toDateString()} ➡ ${new Date(departureDate).toDateString()}

Check admin panel for full details.`
      );
    } catch (err: any) {
      console.error('❌ WhatsApp to admin failed:', err.message);
    }

    res.status(201).json({ message: 'Guest registered successfully' });

  } catch (err: any) {
    console.error('❌ Guest registration failed:', err.message);
    res.status(400).json({ error: err.message });
  }
});

export default router;
