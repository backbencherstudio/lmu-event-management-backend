import { CreateEventRequestDto } from '../event-request/dto/create-event-request.dto';

export const EventRequestConfirmation = (
  data: CreateEventRequestDto,
): string => {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formatTime = (time: string) => {
    return time.replace(/([AP]M)/, ' $1').toLowerCase();
  };

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f4f6f8; color: #333;">
      <!-- Container -->
      <div style="background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;">

        <!-- Header -->
        <div style="background-color: #004aad; color: white; padding: 30px 25px; text-align: left;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Cayman Biz Events</h1>
          <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Your event request has been received</p>
        </div>

        <!-- Body -->
        <div style="padding: 30px;">
          
          <!-- Date & Ref -->
          <div style="text-align: right; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 14px; color: #666;">${formattedDate}</p>
            <p style="margin: 0; font-size: 13px; color: #999;">Ref #: ${Math.floor(100000 + Math.random() * 900000)}</p>
          </div>

          <!-- Greeting -->
          <h2 style="font-size: 20px; margin-bottom: 15px;">Dear ${data.name},</h2>
          <p style="line-height: 1.6; margin-bottom: 25px;">
            Thank you for reaching out to us at Cayman Biz Events. We’re excited that you're considering our venue for your upcoming event.
            Your request has been successfully received and is now being reviewed by our team.
          </p>

          <!-- Details Box -->
          <div style="background-color: #f9f9f9; border-left: 4px solid #004aad; padding: 20px; margin-bottom: 25px; border-radius: 6px;">
            <h3 style="margin-top: 0; font-size: 16px; color: #004aad; margin-bottom: 15px;">Event Details</h3>
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr><td style="padding: 6px 0;"><strong>Contact Name:</strong></td><td style="padding: 6px 0;">${data.name}</td></tr>
              <tr><td style="padding: 6px 0;"><strong>Email:</strong></td><td style="padding: 6px 0;">${data.email}</td></tr>
              <tr><td style="padding: 6px 0;"><strong>Phone:</strong></td><td style="padding: 6px 0;">${data.phone}</td></tr>
              <tr><td style="padding: 6px 0;"><strong>Dates:</strong></td><td style="padding: 6px 0;">${data.startDate}${data.endDate !== data.startDate ? ` to ${data.endDate}` : ''}</td></tr>
              <tr><td style="padding: 6px 0;"><strong>Time:</strong></td><td style="padding: 6px 0;">${formatTime(data.startTime)} to ${formatTime(data.endTime)}</td></tr>
              <tr><td style="padding: 6px 0; vertical-align: top;"><strong>Description:</strong></td><td style="padding: 6px 0;">${data.description}</td></tr>
            </table>
          </div>

          <!-- Next Steps -->
          <h3 style="color: #004aad; margin-bottom: 10px;">What Happens Next?</h3>
          <ol style="padding-left: 20px; line-height: 1.6;">
            <li style="margin-bottom: 8px;">Our events coordinator will reach out within 24 hours.</li>
            <li style="margin-bottom: 8px;">We'll confirm availability and discuss any special requirements.</li>
            <li style="margin-bottom: 8px;">You’ll receive a detailed proposal including pricing and options.</li>
            <li>We’ll finalize details once we receive your confirmation and deposit.</li>
          </ol>

          <!-- Contact Info -->
          <div style="margin-top: 30px; background-color: #f0f4ff; padding: 20px; border-radius: 6px;">
            <h4 style="margin: 0 0 10px 0; color: #004aad;">Need Help?</h4>
            <p style="margin: 0 0 10px 0; font-size: 14px;">
              📞 Call us: (345) 555-0123<br/>
              📧 Email: events@caymanbizevents.com<br/>
              🕒 Hours: Mon - Sun | 9 AM - 7 PM
            </p>
          </div>

          <!-- Closing -->
          <p style="margin-top: 30px; line-height: 1.6;">
            Thank you again for choosing Cayman Biz Events. We look forward to helping make your occasion truly memorable.
          </p>
          <p style="margin-top: 20px; font-weight: 600;">Best regards,<br/><strong>The Cayman Biz Events Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f1f3f5; padding: 15px 25px; font-size: 12px; color: #888; text-align: center;">
          <p style="margin: 0;">This is an automated confirmation email. Please do not reply directly.</p>
          <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} Cayman Biz Events. All rights reserved.</p>
          <p style="margin: 10px 0 0;">
            <a href="https://caymanbizevents.com " style="color: #004aad; text-decoration: none;">Visit our website</a>
          </p>
        </div>
      </div>
    </div>
  `;
};