import { ModularGenerator } from '../../src/generators/ModularGenerator';
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
    
    // CURRENT BUG: It generates emergency-fundTypes.ts
    // EXPECTED: EmergencyFundTypes.ts
    // We will assert the current BUGGY behavior first to confirm reproduction, 
    // or assert the CORRECT behavior to watch it fail.
    // The instructions say "run the test to confirm failure". So I will assert the CORRECT behavior.
    
    expect(filePath).toContain('src/modules/emergency-fund/domain/EmergencyFundTypes.ts');
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
    expect(typesFileCall![0].toString()).toContain('src/modules/userProfile/domain/UserProfileTypes.ts');
  });
});
