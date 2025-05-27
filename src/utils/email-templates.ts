import { CreateEventRequestDto } from '../event-request/dto/create-event-request.dto';

export const EventRequestConfirmation = (data: CreateEventRequestDto): string => {
  const formattedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return `
    <div style="font-family: 'Times New Roman', serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #000;">
      <!-- Document Header -->
      <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #000; padding-bottom: 20px;">
        <h1 style="font-size: 24px; margin: 0; text-transform: uppercase;">OFFICIAL EVENT REQUEST CONFIRMATION</h1>
        <p style="margin-top: 15px; font-size: 14px;">
          DATE ISSUED: ${formattedDate}
        </p>
      </div>

      <!-- Subject Line -->
      <div style="margin-bottom: 30px;">
        <p style="margin: 0;"><strong>RE: Event Request Application Acknowledgment</strong></p>
      </div>

      <!-- Greeting -->
      <div style="margin-bottom: 30px;">
        <p>Dear ${data.name},</p>
        <p style="line-height: 1.6; text-align: justify;">
          This document serves as the official acknowledgment and receipt of your event request submission to LMU Event Management Services. This document should be retained for your records and referenced in all future correspondence regarding this request.
        </p>
      </div>

      <!-- Event Details -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16px; margin-bottom: 20px; text-decoration: underline;">EVENT SPECIFICATIONS</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; width: 200px;"><strong>Applicant Name:</strong></td>
            <td style="padding: 8px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Event Duration:</strong></td>
            <td style="padding: 8px 0;">${data.startDate} to ${data.endDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Scheduled Time:</strong></td>
            <td style="padding: 8px 0;">${data.startTime} to ${data.endTime}</td>
          </tr>
        </table>
      </div>

      <!-- Terms and Conditions -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16px; margin-bottom: 20px; text-decoration: underline;">TERMS AND CONDITIONS</h2>
        <ol style="margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 10px;">This acknowledgment does not constitute approval of the event request.</li>
          <li style="margin-bottom: 10px;">The event request is subject to review by authorized personnel.</li>
          <li style="margin-bottom: 10px;">A formal decision will be communicated within two to three (2-3) business days.</li>
          <li style="margin-bottom: 10px;">All correspondence must reference the provided reference number.</li>
        </ol>
      </div>

      <!-- Next Steps -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 16px; margin-bottom: 20px; text-decoration: underline;">Next Steps:</h2>
        <p style="text-align: justify;">
          Your request will undergo a comprehensive review by our event management team. You will receive formal notification regarding the status of your application within the specified duration.
        </p>
        <p style="text-align: justify;">
          For urgent inquiries or modifications to your submission, please contact our support department at (555) 123-4567 or events@lmu-events.com.
        </p>
      </div>

      <!-- Footer -->
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #000; font-size: 12px; text-align: center;">
        <p style="margin: 0;">
          LMU Event Management Services<br>
          This is an automatically generated document. No signature is required.
        </p>
      </div>
    </div>
  `;
};