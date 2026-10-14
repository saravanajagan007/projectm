import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyQueryDto } from './dto/company-query.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserRole, UserDto, MAX_COMPANY_IMAGES } from '@projectm/shared';

const multerOptions = {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: MAX_COMPANY_IMAGES, // Restrict to max 5 images
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new BadRequestException(
          `Invalid file type "${file.mimetype}". Only .jpg, .jpeg, .png, and .webp images are allowed.`,
        ),
        false,
      );
    }
  },
};

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Roles(UserRole.ADMIN, UserRole.ADD_COMPANY)
  @Post()
  @UseInterceptors(FilesInterceptor('images', MAX_COMPANY_IMAGES, multerOptions))
  async create(
    @Body() createDto: CreateCompanyDto,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser() user: UserDto,
  ) {
    return this.companiesService.create(createDto, files || [], user.id);
  }

  @Roles(UserRole.ADMIN, UserRole.ADD_COMPANY)
  @Get()
  async findAll(@Query() query: CompanyQueryDto) {
    return this.companiesService.findAll(query);
  }

  @Roles(UserRole.ADMIN, UserRole.ADD_COMPANY)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', MAX_COMPANY_IMAGES, multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCompanyDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.companiesService.update(id, updateDto, files || []);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.companiesService.delete(id);
  }
}
