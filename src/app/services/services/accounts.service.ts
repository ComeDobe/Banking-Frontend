
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AccountDto } from '../models/account-dto';

@Injectable({
  providedIn: 'root',
})
export class AccountsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }


  static readonly FindAll4Path = '/accounts/';

  findAll4$Response(params?: {
                      context?: HttpContext
                    }
  ): Observable<StrictHttpResponse<Array<AccountDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AccountsService.FindAll4Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AccountDto>>;
      })
    );
  }

  findAll4(params?: {
             context?: HttpContext
           }
  ): Observable<Array<AccountDto>> {

    return this.findAll4$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AccountDto>>) => r.body as Array<AccountDto>)
    );
  }

  static readonly Save4Path = '/accounts/';

  save4$Response(params: {
                   context?: HttpContext
                   body: AccountDto
                 }
  ): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, AccountsService.Save4Path, 'post');
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

  save4(params: {
          context?: HttpContext
          body: AccountDto
        }
  ): Observable<number> {

    return this.save4$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  static readonly FindById4Path = '/accounts/{account-id}';

  findById4$Response(params: {
                       'account-id': number;
                       context?: HttpContext
                     }
  ): Observable<StrictHttpResponse<AccountDto>> {

    const rb = new RequestBuilder(this.rootUrl, AccountsService.FindById4Path, 'get');
    if (params) {
      rb.path('account-id', params['account-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AccountDto>;
      })
    );
  }


  findById4(params: {
              'account-id': number;
              context?: HttpContext
            }
  ): Observable<AccountDto> {

    return this.findById4$Response(params).pipe(
      map((r: StrictHttpResponse<AccountDto>) => r.body as AccountDto)
    );
  }

  static readonly Delete4Path = '/accounts/{account-id}';

  delete4$Response(params: {
                     'account-id': number;
                     context?: HttpContext
                   }
  ): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AccountsService.Delete4Path, 'delete');
    if (params) {
      rb.path('account-id', params['account-id'], {});
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


  delete4(params: {
            'account-id': number;
            context?: HttpContext
          }
  ): Observable<void> {

    return this.delete4$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
