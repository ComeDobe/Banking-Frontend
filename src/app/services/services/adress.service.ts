
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AddressDto } from '../models/address-dto';

@Injectable({
  providedIn: 'root',
})
export class AddressService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }
  static readonly FindAll3Path = '/adresses/';

  findAll3$Response(params?: {
                      context?: HttpContext
                    }
  ): Observable<StrictHttpResponse<Array<AddressDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AddressService.FindAll3Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AddressDto>>;
      })
    );
  }

  findAll3(params?: {
             context?: HttpContext
           }
  ): Observable<Array<AddressDto>> {

    return this.findAll3$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AddressDto>>) => r.body as Array<AddressDto>)
    );
  }

  static readonly Save3Path = '/adresses/';

  save3$Response(params: {
                   context?: HttpContext
                   body: AddressDto
                 }
  ): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, AddressService.Save3Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  save3(params: {
          context?: HttpContext
          body: AddressDto
        }
  ): Observable<number> {

    return this.save3$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  static readonly FindById3Path = '/adresses/{address-id}';

  findById3$Response(params: {
                       'address-id': number;
                       context?: HttpContext
                     }
  ): Observable<StrictHttpResponse<AddressDto>> {

    const rb = new RequestBuilder(this.rootUrl, AddressService.FindById3Path, 'get');
    if (params) {
      rb.path('address-id', params['address-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AddressDto>;
      })
    );
  }

  findById3(params: {
              'address-id': number;
              context?: HttpContext
            }
  ): Observable<AddressDto> {

    return this.findById3$Response(params).pipe(
      map((r: StrictHttpResponse<AddressDto>) => r.body as AddressDto)
    );
  }

  static readonly Delete3Path = '/adresses/{address-id}';

  delete3$Response(params: {
                     'address-id': number;
                     context?: HttpContext
                   }
  ): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AddressService.Delete3Path, 'delete');
    if (params) {
      rb.path('address-id', params['address-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  delete3(params: {
            'address-id': number;
            context?: HttpContext
          }
  ): Observable<void> {

    return this.delete3$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
