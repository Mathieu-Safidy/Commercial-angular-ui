import { Injectable } from '@angular/core';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  private baseUrl = '/detailBoutique';
  
  constructor(private utils: Utils) {}



}
