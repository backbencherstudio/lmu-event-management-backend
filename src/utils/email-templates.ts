import { CreateEventRequestDto } from '../event-request/dto/create-event-request.dto';

export const EventRequestConfirmation = (data: CreateEventRequestDto): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2c3e50; margin-bottom: 20px;">Event Request Confirmation</h1>
        <p style="color: #7f8c8d; font-size: 14px;">Reference Number: ${Date.now()}</p>
      </div>

      <div style="margin-bottom: 30px;">
        <p>Dear ${data.name},</p>
        <p>This email serves as official confirmation that we have received your event request submission. Please retain this document for your records.</p>
      </div>

      <div style="background-color: #f9f9f9; padding: 20px; margin-bottom: 30px; border-left: 4px solid #2c3e50;">
        <h2 style="color: #2c3e50; font-size: 18px; margin-bottom: 15px;">Event Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #7f8c8d;">Event Name:</td>
            <td style="padding: 8px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #7f8c8d;">Date:</td>
            <td style="padding: 8px 0;">${data.startDate} to ${data.endDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #7f8c8d;">Time:</td>
            <td style="padding: 8px 0;">${data.startTime} to ${data.endTime}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 30px;">
        <p>Your request is currently under review by our events management team. You will receive a follow-up communication regarding the status of your request within 2-3 business days.</p>
        <p>If you have any immediate questions or need to modify your request, please contact our support team with your reference number.</p>
      </div>

      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #7f8c8d; font-size: 12px;">LMU Event Management<br>Your Trusted Event Partner</p>
      </div>
    </div>
  `;
};