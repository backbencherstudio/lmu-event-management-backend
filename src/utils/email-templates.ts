import { CreateEventRequestDto } from '../event-request/dto/create-event-request.dto';

export const EventRequestConfirmation = (
  data: CreateEventRequestDto,
): string => {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format time to be more readable (remove if you prefer the original format)
  const formatTime = (time: string) => {
    return time.replace(/([AP]M)/, ' $1').toLowerCase();
  };

  return `
    <div style="font-family: 'Georgia', 'Times New Roman', serif; max-width: 700px; margin: 0 auto; padding: 0; color: #333; background-color: #f9f9f7;">
      <!-- Letter-style Container -->
      <div style="padding: 40px; background: white; border: 1px solid #e0e0e0; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        
        <!-- Letterhead -->
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 1px solid #e0e0e0; padding-bottom: 20px;">
          <h1 style="font-size: 28px; margin: 0 0 5px 0; color: #222; letter-spacing: 1px;">Grand Celebrations Venue</h1>
          <p style="margin: 0; font-size: 14px; color: #666; letter-spacing: 0.5px;">
            Event Request Confirmation
          </p>
        </div>
        
        <!-- Date and Reference -->
        <div style="margin-bottom: 30px; text-align: right; font-size: 13px; color: #666;">
          <p style="margin: 0 0 5px 0;">${formattedDate}</p>
          <p style="margin: 0;">Reference #: ${Math.floor(100000 + Math.random() * 900000)}</p>
        </div>
        
        <!-- Greeting -->
        <div style="margin-bottom: 25px;">
          <p style="margin: 0 0 10px 0;">Dear ${data.name},</p>
          <p style="line-height: 1.6; margin: 0;">
            Thank you for considering Grand Celebrations Venue for your event. We're pleased to confirm we've received your request and it's now being reviewed by our events team.
          </p>
        </div>
        
        <!-- Event Details Box -->
        <div style="margin: 30px 0; padding: 20px; background: #f8f5f2; border-left: 4px solid #c8a97e;">
          <h2 style="font-size: 18px; margin: 0 0 15px 0; color: #333; font-weight: normal; text-transform: uppercase; letter-spacing: 1px;">Your Event Details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; width: 150px; vertical-align: top;"><strong>Contact Name:</strong></td>
              <td style="padding: 8px 0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;"><strong>Event Dates:</strong></td>
              <td style="padding: 8px 0;">${data.startDate}${data.endDate !== data.startDate ? ` to ${data.endDate}` : ''}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;"><strong>Event Times:</strong></td>
              <td style="padding: 8px 0;">${formatTime(data.startTime)} to ${formatTime(data.endTime)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;"><strong>Event Description:</strong></td>
              <td style="padding: 8px 0;">${data.description}</td>
            </tr>
          </table>
        </div>
        
        <!-- Next Steps -->
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 16px; margin: 0 0 15px 0; color: #333; font-weight: normal; text-transform: uppercase; letter-spacing: 1px;">Next Steps</h2>
          <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
            <li style="margin-bottom: 10px;">Our event coordinator will review your request within 24 hours</li>
            <li style="margin-bottom: 10px;">We'll contact you to discuss venue availability and any special requirements</li>
            <li style="margin-bottom: 10px;">You'll receive a customized proposal with pricing and package options</li>
            <li>Final confirmation will require a signed contract and deposit</li>
          </ol>
        </div>
        
        <!-- Contact Information -->
        <div style="margin-bottom: 25px; padding: 15px; background: #f8f5f2; border-radius: 4px;">
          <p style="margin: 0 0 10px 0; font-weight: bold; color: #333;">Our Events Team</p>
          <p style="margin: 0 0 5px 0; font-size: 14px;">
            <strong>Phone:</strong> (555) 123-4567
          </p>
          <p style="margin: 0 0 5px 0; font-size: 14px;">
            <strong>Email:</strong> events@grandcelebrations.com
          </p>
          <p style="margin: 0; font-size: 14px;">
            <strong>Hours:</strong> Monday-Sunday, 8am-8pm
          </p>
        </div>
        
        <!-- Closing -->
        <div style="margin-top: 30px;">
          <p style="margin: 0 0 15px 0; line-height: 1.6;">
            We appreciate the opportunity to be part of your special occasion. Our team is committed to making your event unforgettable.
          </p>
          <p style="margin: 0; line-height: 1.6;">Warm regards,</p>
          <p style="margin: 10px 0 0 0; line-height: 1.6;">
            <strong>Sarah Johnson</strong><br>
            <span style="font-size: 13px; color: #666;">Event Director, Grand Celebrations Venue</span>
          </p>
        </div>
        
        <!-- Footer -->
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999; text-align: center;">
          <p style="margin: 0;">
            This is an automatically generated confirmation. Please contact us directly with any questions.<br>
            &copy; ${new Date().getFullYear()} Grand Celebrations Venue. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  `;
};
