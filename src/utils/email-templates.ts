import { CreateEventRequestDto } from '../event-request/dto/create-event-request.dto';

export const EventRequestConfirmation = (data: CreateEventRequestDto): string => {
  const referenceNumber = Date.now();
  return `
    <div style="font-family: 'Times New Roman', Times, serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #333; line-height: 1.6;">
      <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #333; padding-bottom: 20px;">
        <h1 style="font-size: 24px; margin-bottom: 10px; text-transform: uppercase;">OFFICIAL EVENT REQUEST CONFIRMATION</h1>
        <p style="font-size: 14px;">REFERENCE NUMBER: ${referenceNumber}</p>
        <p style="font-size: 14px;">DATE ISSUED: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div style="margin-bottom: 30px;">
        <p><strong>RE: Event Request Application Acknowledgment</strong></p>
        <p>Dear ${data.name},</p>
        <p>This document serves as the official acknowledgment and receipt of your event request submission to LMU Event Management Services. This document should be retained for your records and referenced in all future correspondence regarding this request.</p>
      </div>

      <div style="margin-bottom: 30px; background-color: #f9f9f9; padding: 20px;">
        <h2 style="font-size: 18px; margin-bottom: 20px; text-decoration: underline;">EVENT SPECIFICATIONS</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; width: 200px;"><strong>Applicant Name:</strong></td>
            <td style="padding: 10px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0;"><strong>Event Duration:</strong></td>
            <td style="padding: 10px 0;">${data.startDate} to ${data.endDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0;"><strong>Scheduled Time:</strong></td>
            <td style="padding: 10px 0;">${data.startTime} to ${data.endTime}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 18px; margin-bottom: 20px; text-decoration: underline;">TERMS AND CONDITIONS</h2>
        <ol style="padding-left: 20px;">
          <li>This acknowledgment does not constitute approval of the event request.</li>
          <li>The event request is subject to review by authorized personnel.</li>
          <li>A formal decision will be communicated within two to three (2-3) business days.</li>
          <li>All correspondence must reference the provided reference number.</li>
        </ol>
      </div>

      <div style="margin-bottom: 30px;">
        <p><strong>Next Steps:</strong></p>
        <p>Your request will undergo a comprehensive review by our events management team. You will receive formal notification regarding the status of your application within the specified timeframe.</p>
        <p>For urgent inquiries or modifications to your submission, please contact our support department and reference number ${referenceNumber}.</p>
      </div>

      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc;">
        <p style="font-size: 12px; color: #666;">
          LMU Event Management<br>
          Your Trusted Event Partner<br>
          <em>This is an automatically generated document. No signature is required.</em>
        </p>
      </div>
    </div>
  `;
};