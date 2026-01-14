import { ModularGenerator } from '../../src/Generators/ModularGenerator';
import * as fs from 'fs/promises';
import { ParsedCliConfig } from '../../src/core/types/CliOptions';

jest.mock('fs/promises');

describe('ModularGenerator', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFs.mkdir.mockResolvedValue(undefined);
    mockFs.writeFile.mockResolvedValue(undefined);
    mockFs.access.mockRejectedValue(new Error('ENOENT')); // Simulate module does not exist
    mockFs.readFile.mockResolvedValue('export interface {{ Entity }}Types {}');
  });

  it('should generate files with correct casing for hyphenated module names', async () => {
    const config: ParsedCliConfig = {
      name: 'emergency-fund',
      path: 'src/modules/emergency-fund',
      elements: ['types'],
      framework: 'none'
    };

    const generator = new ModularGenerator(config);
    await generator.run();

    // Check generated file names
    const writeCalls = mockFs.writeFile.mock.calls;

    // We expect at least one call for the types file
    expect(writeCalls.length).toBeGreaterThan(0);

    const typesFileCall = writeCalls.find(call => call[0].toString().includes('Types.ts'));
    expect(typesFileCall).toBeDefined();

    const filePath = typesFileCall![0].toString();

    // Normalize path separators for cross-platform compatibility
    const normalizedPath = filePath.replace(/\\/g, '/');

    expect(normalizedPath).toContain('src/modules/emergency-fund/domain/EmergencyFundTypes.ts');
  });

  it('should generate files with correct casing for camelCase module names', async () => {
    const config: ParsedCliConfig = {
      name: 'userProfile',
      path: 'src/modules/userProfile',
      elements: ['types'],
      framework: 'none'
    };

    const generator = new ModularGenerator(config);
    await generator.run();

    const writeCalls = mockFs.writeFile.mock.calls;
    const typesFileCall = writeCalls.find(call => call[0].toString().includes('Types.ts'));

    expect(typesFileCall).toBeDefined();
    // Normalize path separators for cross-platform compatibility
    const normalizedPath = typesFileCall![0].toString().replace(/\\/g, '/');
    expect(normalizedPath).toContain('src/modules/userProfile/domain/UserProfileTypes.ts');
  });

  it('should generate files with correct casing for PascalCase module names', async () => {
    const config: ParsedCliConfig = {
      name: 'BlogPost',
      path: 'src/modules/BlogPost',
      elements: ['types'],
      framework: 'none'
    };

    const generator = new ModularGenerator(config);
    await generator.run();

    const writeCalls = mockFs.writeFile.mock.calls;
    const typesFileCall = writeCalls.find(call => call[0].toString().includes('Types.ts'));

    expect(typesFileCall).toBeDefined();
    const normalizedPath = typesFileCall![0].toString().replace(/\\/g, '/');
    expect(normalizedPath).toContain('src/modules/BlogPost/domain/BlogPostTypes.ts');
  });

  it('should generate files with correct casing for single word module names', async () => {
    const config: ParsedCliConfig = {
      name: 'user',
      path: 'src/modules/user',
      elements: ['types'],
      framework: 'none'
    };

    const generator = new ModularGenerator(config);
    await generator.run();

    const writeCalls = mockFs.writeFile.mock.calls;
    const typesFileCall = writeCalls.find(call => call[0].toString().includes('Types.ts'));

    expect(typesFileCall).toBeDefined();
    const normalizedPath = typesFileCall![0].toString().replace(/\\/g, '/');
    expect(normalizedPath).toContain('src/modules/user/domain/UserTypes.ts');
  });
});

