
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = 'http://localhost:9098';
}

export interface ApiConfigurationParams {
  rootUrl?: string;
}
