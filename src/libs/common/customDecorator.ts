import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FormDataValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type === 'body') {
      // Parse FormData here and return structured data
      const parsedData = {}; // Parse value into a structured object
      return parsedData;
    }
    return value;
  }
}
