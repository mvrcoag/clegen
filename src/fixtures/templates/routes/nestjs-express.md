import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ParseUUIDPipe,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { {{ Entity }}Service } from '../services/{{ Entity }}Service';
import { {{ Entity }} } from '../domain/{{ Entity }}Types';
import { Create{{ Entity }}Dto, Update{{ Entity }}Dto, {{ Entity }}ResponseDto } from '../infrastructure/{{ Entity }}Dto';

/**

* {{ Entity }} Controller
*
* RESTful API endpoints for {{ Entity }} resource management.
* Uses NestJS with Express adapter.
*
* @description Handles HTTP requests for {{ entity }} CRUD operations
* following clean architecture principles with proper separation of concerns.
 */
@ApiTags('{{ entity }}')
@Controller('{{ entity }}')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class {{ Entity }}Controller {
  constructor(private readonly {{ entity }}Service: {{ Entity }}Service) {}

  /**

* GET /{{ entity }}
* Retrieve all {{ entity }} records
   */
  @Get()
  @ApiOperation({ summary: 'Get all {{ entity }} items' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all {{ entity }} items',
    type: [{{ Entity }}ResponseDto],
  })
  async findAll(): Promise<{{ Entity }}[]> {
    return this.{{ entity }}Service.getAll();
  }

  /**

* GET /{{ entity }}/:id
* Retrieve a single {{ entity }} by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get {{ entity }} by ID' })
  @ApiParam({ name: 'id', description: '{{ Entity }} unique identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the {{ entity }} item',
    type: {{ Entity }}ResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '{{ Entity }} not found',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<{{ Entity }}> {
    const {{ entity }} = await this.{{ entity }}Service.getById(id);

    if (!{{ entity }}) {
      throw new NotFoundException(`{{ Entity }} with ID "${id}" not found`);
    }

    return {{ entity }};
  }

  /**

* POST /{{ entity }}
* Create a new {{ entity }}
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new {{ entity }}' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '{{ Entity }} created successfully',
    type: {{ Entity }}ResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async create(@Body() create{{ Entity }}Dto: Create{{ Entity }}Dto): Promise<{{ Entity }}> {
    return this.{{ entity }}Service.create(create{{ Entity }}Dto);
  }

  /**

* PUT /{{ entity }}/:id
* Update an existing {{ entity }}
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update {{ entity }} by ID' })
  @ApiParam({ name: 'id', description: '{{ Entity }} unique identifier' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '{{ Entity }} updated successfully',
    type: {{ Entity }}ResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '{{ Entity }} not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() update{{ Entity }}Dto: Update{{ Entity }}Dto,
  ): Promise<{{ Entity }}> {
    const {{ entity }} = await this.{{ entity }}Service.getById(id);

    if (!{{ entity }}) {
      throw new NotFoundException(`{{ Entity }} with ID "${id}" not found`);
    }

    return this.{{ entity }}Service.update(id, update{{ Entity }}Dto);
  }

  /**

* DELETE /{{ entity }}/:id
* Remove a {{ entity }} by ID
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete {{ entity }} by ID' })
  @ApiParam({ name: 'id', description: '{{ Entity }} unique identifier' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '{{ Entity }} deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '{{ Entity }} not found',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const {{ entity }} = await this.{{ entity }}Service.getById(id);

    if (!{{ entity }}) {
      throw new NotFoundException(`{{ Entity }} with ID "${id}" not found`);
    }

    await this.{{ entity }}Service.delete(id);
  }
}
