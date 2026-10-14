import { z } from 'zod';

export const DEFAULT_COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'United States / Canada', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+971', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
] as const;

// Exactly 10 digits
export const tenDigitPhoneRegex = /^\d{10}$/;

// Combined phone: +<code> <10-digits> or 10 digits
export const fullPhoneRegex = /^(\+\d{1,4}\s)?\d{10}$/;

export const createCompanySchema = z.object({
  name: z
    .string({ required_error: 'Company name is required' })
    .trim()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name cannot exceed 100 characters'),
  contactPerson: z
    .string({ required_error: 'Contact person is required' })
    .trim()
    .min(2, 'Contact person name must be at least 2 characters')
    .max(100, 'Contact person cannot exceed 100 characters'),
  contactCountryCode: z.string().optional().default('+91'),
  contactNumber: z
    .string({ required_error: 'Contact number is required' })
    .trim()
    .refine(
      (val) => tenDigitPhoneRegex.test(val) || fullPhoneRegex.test(val),
      'Contact number must be exactly 10 digits',
    ),
  alternateContactCountryCode: z.string().optional().nullable().default('+91'),
  alternateContactNumber: z
    .string()
    .trim()
    .optional()
    .nullable()
    .refine(
      (val) => !val || tenDigitPhoneRegex.test(val) || fullPhoneRegex.test(val),
      'Alternative contact number must be exactly 10 digits',
    ),
  email: z
    .string()
    .trim()
    .optional()
    .nullable()
    .refine(
      (val) => !val || z.string().email().safeParse(val).success,
      'Invalid company email address format',
    ),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;

export const updateCompanySchema = createCompanySchema.partial().extend({
  deletedImageIds: z.array(z.string().uuid()).optional(),
});

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;

export const companyQuerySchema = z.object({
  search: z.string().optional().default(''),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export type CompanyQueryInput = z.infer<typeof companyQuerySchema>;

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
];

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// Maximum up to 5 images per company
export const MAX_COMPANY_IMAGES = 5;
