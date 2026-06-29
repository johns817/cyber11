import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('certifications')
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Get()
  findAll() {
    return this.certificationsService.findAll();
  }

  @Get(':code')
  findByCode(@Param('code') code: string) {
    return this.certificationsService.findByCode(code);
  }

  @Post(':code/start')
  @UseGuards(JwtAuthGuard)
  startExam(@Param('code') code: string, @Body() body: { userId: string }) {
    return this.certificationsService.startExam(code, body.userId);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  getUserCertifications(@Param('userId') userId: string) {
    return this.certificationsService.getUserCertifications(userId);
  }

  @Get('verify/:certId')
  verifyCertification(@Param('certId') certId: string) {
    return this.certificationsService.verify(certId);
  }
}
