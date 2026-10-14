import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ContactService } from './contact.service';
import { ContactInquiryDto } from './dto/contact-inquiry.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } }) // Anti-spam rate limiting: 5 inquiries per minute
  @Post()
  @HttpCode(HttpStatus.OK)
  async submitInquiry(@Body() inquiryDto: ContactInquiryDto) {
    return this.contactService.handleInquiry(inquiryDto);
  }
}
