import { TestBed } from '@angular/core/testing';

import { CryptoService, iv, keyHex } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;
  const data = 'Chuck Norris makes onions cry.';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should encrypt data', () => {
    const encryptedData = service.encrypt(data);
    expect(encryptedData).toBeTruthy();

    expect(Object.keys(encryptedData)).toContain('data');
    expect(Object.keys(encryptedData)).toContain('iv');
    expect(Object.keys(encryptedData)).toContain('tag');
  });

  it('should decrypt data', () => {
    const encryptedData = service.encrypt(data);
    const decryptedData = service.decrypt(encryptedData.data, encryptedData.iv, encryptedData.tag, keyHex)

    expect(decryptedData).toEqual(data);
  });
});
