import { CreateEventRequestDto } from '../event-request/dto/create-event-request.dto';

export const EventRequestConfirmation = (
  data: CreateEventRequestDto,
): string => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  const isSameDay = startDate.toDateString() === endDate.toDateString();

  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; color: #333333; background-color: #f8f8f8;">
      <!-- Main Container -->
      <div style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        
        <!-- Header with Branding -->
        <div style="background: #005f87; padding: 30px; text-align: center;">
          <img src="https://caymanbizevents.com/logo.png" alt="Cayman Biz Events" width="180" style="max-width: 180px;">
          <p style="margin: 15px 0 0 0; font-size: 16px; color: #ffffff; letter-spacing: 0.5px; font-weight: 300;">
            PREMIER EVENT VENUE IN THE CAYMAN ISLANDS
          </p>
        </div>
        
        <!-- Confirmation Content -->
        <div style="padding: 40px 30px;">
          <!-- Greeting -->
          <div style="margin-bottom: 25px;">
            <p style="margin: 0 0 10px 0; font-size: 16px; color: #333333;">Dear ${data.name},</p>
            <p style="line-height: 1.6; margin: 0; font-size: 15px; color: #555555;">
              Thank you for choosing Cayman Biz Events for your upcoming celebration. We're delighted to confirm we've received your event request and our team is reviewing your details.
            </p>
          </div>
          
          <!-- Confirmation Box -->
          <div style="margin: 30px 0; padding: 25px; background: #f5f9fa; border-radius: 6px; border-left: 4px solid #0099cc;">
            <h2 style="font-size: 18px; margin: 0 0 20px 0; color: #005f87; font-weight: 600;">YOUR EVENT REQUEST</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; width: 120px; vertical-align: top; color: #666666;"><strong>Contact:</strong></td>
                <td style="padding: 10px 0; color: #333333;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; vertical-align: top; color: #666666;"><strong>Event Date:</strong></td>
                <td style="padding: 10px 0; color: #333333;">
                  ${formatDate(data.startDate)}${!isSameDay ? ` to ${formatDate(data.endDate)}` : ''}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; vertical-align: top; color: #666666;"><strong>Event Time:</strong></td>
                <td style="padding: 10px 0; color: #333333;">
                  ${formatTime(data.startDate)} - ${formatTime(data.endDate)}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; vertical-align: top; color: #666666;"><strong>Event Type:</strong></td>
                <td style="padding: 10px 0; color: #333333;">${data.description || 'Not specified'}</td>
              </tr>
            </table>
          </div>
          
          <!-- Next Steps -->
          <div style="margin-bottom: 30px;">
            <h2 style="font-size: 18px; margin: 0 0 20px 0; color: #005f87; font-weight: 600;">NEXT STEPS</h2>
            <div style="display: flex; margin-bottom: 20px; align-items: flex-start;">
              <div style="background: #0099cc; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; margin-right: 15px; flex-shrink: 0; font-size: 12px; font-weight: bold;">1</div>
              <div style="flex-grow: 1;">
                <p style="margin: 0 0 5px 0; font-weight: 600; color: #005f87;">Initial Review</p>
                <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.5;">Our event specialist will contact you within 24 hours to discuss your requirements.</p>
              </div>
            </div>
            <div style="display: flex; margin-bottom: 20px; align-items: flex-start;">
              <div style="background: #0099cc; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; margin-right: 15px; flex-shrink: 0; font-size: 12px; font-weight: bold;">2</div>
              <div style="flex-grow: 1;">
                <p style="margin: 0 0 5px 0; font-weight: 600; color: #005f87;">Custom Proposal</p>
                <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.5;">You'll receive a tailored proposal with venue options, menus, and pricing.</p>
              </div>
            </div>
            <div style="display: flex; align-items: flex-start;">
              <div style="background: #0099cc; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; margin-right: 15px; flex-shrink: 0; font-size: 12px; font-weight: bold;">3</div>
              <div style="flex-grow: 1;">
                <p style="margin: 0 0 5px 0; font-weight: 600; color: #005f87;">Finalize Booking</p>
                <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.5;">Secure your date with a signed contract and deposit payment.</p>
              </div>
            </div>
          </div>
          
          <!-- Contact Information -->
          <div style="background: #f5f9fa; border-radius: 6px; padding: 25px; margin-bottom: 30px;">
            <h2 style="font-size: 18px; margin: 0 0 20px 0; color: #005f87; font-weight: 600;">CONTACT OUR TEAM</h2>
            <div style="display: flex; margin-bottom: 15px;">
              <div style="width: 24px; margin-right: 15px; text-align: center;">
                <span style="color: #0099cc;">📧</span>
              </div>
              <div>
                <p style="margin: 0 0 5px 0; font-weight: 600; color: #005f87;">Email</p>
                <p style="margin: 0; font-size: 14px; color: #666666;">
                  <a href="mailto:events@caymanbizevents.com" style="color: #0099cc; text-decoration: none;">events@caymanbizevents.com</a>
                </p>
              </div>
            </div>
            <div style="display: flex; margin-bottom: 15px;">
              <div style="width: 24px; margin-right: 15px; text-align: center;">
                <span style="color: #0099cc;">📞</span>
              </div>
              <div>
                <p style="margin: 0 0 5px 0; font-weight: 600; color: #005f87;">Phone</p>
                <p style="margin: 0; font-size: 14px; color: #666666;">
                  <a href="tel:3451234567" style="color: #0099cc; text-decoration: none;">(345) 123-4567</a>
                </p>
              </div>
            </div>
            <div style="display: flex;">
              <div style="width: 24px; margin-right: 15px; text-align: center;">
                <span style="color: #0099cc;">🕒</span>
              </div>
              <div>
                <p style="margin: 0 0 5px 0; font-weight: 600; color: #005f87;">Hours</p>
                <p style="margin: 0; font-size: 14px; color: #666666;">Daily, 9:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
          
          <!-- Closing -->
          <div style="text-align: center;">
            <p style="margin: 0 0 20px 0; font-size: 15px; color: #555555; line-height: 1.6;">
              We look forward to helping you create an unforgettable experience at our venue.
            </p>
            <p style="margin: 0; font-weight: 600; color: #005f87;">The Cayman Biz Events Team</p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #003d5a; padding: 25px; text-align: center; color: #ffffff; font-size: 13px;">
          <div style="margin-bottom: 20px;">
            <a href="https://caymanbizevents.com" style="margin: 0 10px; display: inline-block;">
              <img src="https://caymanbizevents.com/icons/website.png" alt="Website" width="24" style="vertical-align: middle; margin-right: 5px;"> Website
            </a>
            <a href="https://caymanbizevents.com/gallery" style="margin: 0 10px; display: inline-block;">
              <img src="https://caymanbizevents.com/icons/gallery.png" alt="Gallery" width="24" style="vertical-align: middle; margin-right: 5px;"> Gallery
            </a>
            <a href="https://caymanbizevents.com/menus" style="margin: 0 10px; display: inline-block;">
              <img src="https://caymanbizevents.com/icons/menu.png" alt="Menus" width="24" style="vertical-align: middle; margin-right: 5px;"> Menus
            </a>
            <a href="https://caymanbizevents.com/contact" style="margin: 0 10px; display: inline-block;">
              <img src="https://caymanbizevents.com/icons/contact.png" alt="Contact" width="24" style="vertical-align: middle; margin-right: 5px;"> Contact
            </a>
          </div>
          <p style="margin: 0 0 10px 0; color: rgba(255,255,255,0.7);">
            Cayman Biz Events • Grand Cayman, Cayman Islands
          </p>
          <p style="margin: 0; color: rgba(255,255,255,0.7);">
            &copy; ${new Date().getFullYear()} Cayman Biz Events. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  `;
};