import { Injectable, Logger } from '@nestjs/common';
import { ContactInquiryDto } from './dto/contact-inquiry.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly logPath = path.resolve(process.cwd(), 'inquiries_log.txt');

  async handleInquiry(dto: ContactInquiryDto) {
    // 1. Invisible Honeypot check (anti-bot safeguard)
    if (dto.honeypot || dto.website_url) {
      this.logger.warn(`Bot detected via honeypot field from ${dto.name}`);
      return {
        success: true,
        message: 'Thank you for reaching out!',
      };
    }

    const name = dto.name.trim();
    const email = dto.email.trim();
    const phone = dto.phone?.trim() || 'N/A';
    const company = dto.company?.trim() || 'N/A';
    const service = dto.service?.trim() || 'General Inquiry';
    const budget = dto.budget?.trim() || 'Not Specified';
    const message = dto.message.trim();

    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] Name: ${name} | Email: ${email} | Phone: ${phone} | Company: ${company} | Service: ${service} | Budget: ${budget} | Message: ${message}\n`;

    try {
      await fs.promises.appendFile(this.logPath, logEntry, 'utf8');
      this.logger.log(`Logged new inquiry from ${name} (${email}) for service "${service}"`);
    } catch (err) {
      this.logger.error('Failed to write to inquiry log file', err);
    }

    return {
      success: true,
      message: `Thank you, ${name}! Your project brief has been received. Our senior strategist will review it and get in touch within 24 hours.`,
      lead: {
        name,
        service,
      },
    };
  }
}
