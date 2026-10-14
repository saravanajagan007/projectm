import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyQueryDto } from './dto/company-query.dto';
import { STORAGE_SERVICE } from '../storage/storage.module';
import { IStorageService } from '../storage/storage.service';
import { MAX_COMPANY_IMAGES } from '@projectm/shared';

function formatPhoneWithCountryCode(num?: string | null, countryCode?: string | null): string | null {
  if (!num) return null;
  const trimmed = num.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('+')) return trimmed;
  const code = (countryCode && countryCode.trim()) || '+91';
  return `${code} ${trimmed}`;
}

@Injectable()
export class CompaniesService {
  constructor(
    private prisma: PrismaService,
    @Inject(STORAGE_SERVICE) private storageService: IStorageService,
  ) {}

  async create(createDto: CreateCompanyDto, files: Express.Multer.File[], userId: string) {
    if (files && files.length > MAX_COMPANY_IMAGES) {
      throw new BadRequestException(
        `A maximum of ${MAX_COMPANY_IMAGES} images is allowed per company. You selected ${files.length}.`,
      );
    }

    const imageUrls: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const savedUrl = await this.storageService.saveFile(file);
        imageUrls.push(savedUrl);
      }
    }

    const formattedContact = formatPhoneWithCountryCode(
      createDto.contactNumber,
      createDto.contactCountryCode,
    )!;

    const formattedAltContact = formatPhoneWithCountryCode(
      createDto.alternateContactNumber,
      createDto.alternateContactCountryCode,
    );

    const company = await this.prisma.company.create({
      data: {
        name: createDto.name.trim(),
        contactPerson: createDto.contactPerson.trim(),
        contactNumber: formattedContact,
        alternateContactNumber: formattedAltContact,
        email: createDto.email?.trim() || null,
        createdById: userId,
        images: {
          create: imageUrls.map((url) => ({ url })),
        },
      },
      include: {
        images: true,
        createdBy: {
          select: { id: true, email: true, role: true },
        },
      },
    });

    return company;
  }

  async findAll(query: CompanyQueryDto) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 10));
    const skip = (page - 1) * limit;

    const searchTerm = query.search?.trim();
    let whereClause: any = {};

    if (searchTerm && searchTerm.length > 0) {
      whereClause = {
        OR: [
          { name: { contains: searchTerm } },
          { contactPerson: { contains: searchTerm } },
          { contactNumber: { contains: searchTerm } },
          { alternateContactNumber: { contains: searchTerm } },
          { email: { contains: searchTerm } },
        ],
      };
    }

    const [total, companies] = await Promise.all([
      this.prisma.company.count({ where: whereClause }),
      this.prisma.company.findMany({
        where: whereClause,
        include: {
          images: {
            orderBy: { createdAt: 'desc' },
          },
          createdBy: {
            select: { id: true, email: true, role: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      data: companies,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async findOne(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { createdAt: 'desc' },
        },
        createdBy: {
          select: { id: true, email: true, role: true },
        },
      },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID "${id}" not found`);
    }

    return company;
  }

  async update(id: string, updateDto: UpdateCompanyDto, files: Express.Multer.File[]) {
    const company = await this.findOne(id);

    // Handle image deletions
    let deletedImageIds: string[] = [];
    if (updateDto.deletedImageIds) {
      if (Array.isArray(updateDto.deletedImageIds)) {
        deletedImageIds = updateDto.deletedImageIds;
      } else if (typeof updateDto.deletedImageIds === 'string') {
        try {
          const parsed = JSON.parse(updateDto.deletedImageIds);
          deletedImageIds = Array.isArray(parsed) ? parsed : [updateDto.deletedImageIds];
        } catch {
          deletedImageIds = updateDto.deletedImageIds.split(',').map((s) => s.trim());
        }
      }
    }

    const currentImageCount = company.images.length;
    const deletedCount = deletedImageIds.length;
    const newFilesCount = files ? files.length : 0;
    const projectedTotalImages = currentImageCount - deletedCount + newFilesCount;

    if (projectedTotalImages > MAX_COMPANY_IMAGES) {
      throw new BadRequestException(
        `A maximum of ${MAX_COMPANY_IMAGES} images is allowed per company. Resulting count would be ${projectedTotalImages}.`,
      );
    }

    if (deletedImageIds.length > 0) {
      const imagesToDelete = await this.prisma.companyImage.findMany({
        where: {
          id: { in: deletedImageIds },
          companyId: id,
        },
      });

      for (const img of imagesToDelete) {
        await this.storageService.deleteFile(img.url);
      }

      await this.prisma.companyImage.deleteMany({
        where: {
          id: { in: imagesToDelete.map((img) => img.id) },
        },
      });
    }

    // Handle new image uploads
    if (files && files.length > 0) {
      for (const file of files) {
        const savedUrl = await this.storageService.saveFile(file);
        await this.prisma.companyImage.create({
          data: {
            url: savedUrl,
            companyId: id,
          },
        });
      }
    }

    // Prepare updated phone numbers if provided
    let formattedContact: string | undefined;
    if (updateDto.contactNumber) {
      formattedContact = formatPhoneWithCountryCode(
        updateDto.contactNumber,
        updateDto.contactCountryCode,
      )!;
    }

    let formattedAltContact: string | null | undefined;
    if (updateDto.alternateContactNumber !== undefined) {
      formattedAltContact = formatPhoneWithCountryCode(
        updateDto.alternateContactNumber,
        updateDto.alternateContactCountryCode,
      );
    }

    // Update text fields
    const updated = await this.prisma.company.update({
      where: { id },
      data: {
        ...(updateDto.name && { name: updateDto.name.trim() }),
        ...(updateDto.contactPerson && { contactPerson: updateDto.contactPerson.trim() }),
        ...(formattedContact && { contactNumber: formattedContact }),
        ...(formattedAltContact !== undefined && {
          alternateContactNumber: formattedAltContact,
        }),
        ...(updateDto.email !== undefined && {
          email: updateDto.email ? updateDto.email.trim() : null,
        }),
      },
      include: {
        images: {
          orderBy: { createdAt: 'desc' },
        },
        createdBy: {
          select: { id: true, email: true, role: true },
        },
      },
    });

    return updated;
  }

  async delete(id: string) {
    const company = await this.findOne(id);

    // Clean up all related image files from storage
    if (company.images && company.images.length > 0) {
      for (const img of company.images) {
        await this.storageService.deleteFile(img.url);
      }
    }

    await this.prisma.company.delete({
      where: { id },
    });

    return {
      success: true,
      message: `Company "${company.name}" and associated images deleted successfully`,
    };
  }
}
