import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsDateString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**

* Create {{ Entity }} DTO
*
* Data Transfer Object for creating a new {{ Entity }}.
* Includes validation decorators for input sanitization.
 */
export class Create{{ Entity }}Dto {
  @ApiProperty({
    description: 'Name of the {{ entity }}',
    example: 'Sample {{ Entity }}',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the {{ entity }}',
    example: 'This is a sample {{ entity }} description',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}

/**

* Update {{ Entity }} DTO
*
* Data Transfer Object for updating an existing {{ Entity }}.
* All fields are optional using PartialType.
 */
export class Update{{ Entity }}Dto extends PartialType(Create{{ Entity }}Dto) {}

/**

* {{ Entity }} Response DTO
*
* Data Transfer Object for {{ Entity }} API responses.
* Used for Swagger documentation and response serialization.
 */
export class {{ Entity }}ResponseDto {
  @ApiProperty({
    description: 'Unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Name of the {{ entity }}',
    example: 'Sample {{ Entity }}',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the {{ entity }}',
    example: 'This is a sample {{ entity }} description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  @IsDateString()
  updatedAt: Date;
}

/**

* {{ Entity }} Query DTO
*
* Data Transfer Object for filtering and pagination.
 */
export class {{ Entity }}QueryDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    default: 1,
  })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    default: 10,
  })
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Search query for filtering',
    example: 'sample',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
