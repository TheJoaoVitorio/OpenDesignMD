import { Company } from '../types';
import rawData from './data.json';
import { normalizeCompany } from '../utils/normalizeCompany';

export const mockCompanies: Company[] = (rawData as any[]).map(normalizeCompany);
