
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { TransactionDto } from '../models/transaction-dto';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  static readonly FindAll1Path = '/transactions/';

  findAll1$Response(params?: {
                      context?: HttpContext
                    }
  ): Observable<StrictHttpResponse<Array<TransactionDto>>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionsService.FindAll1Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TransactionDto>>;
      })
    );
  }

  findAll1(params?: {
             context?: HttpContext
           }
  ): Observable<Array<TransactionDto>> {

    return this.findAll1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TransactionDto>>) => r.body as Array<TransactionDto>)
    );
  }

  static readonly Save1Path = '/transactions/';

  save1$Response(params: {
                   context?: HttpContext
                   body: TransactionDto
                 }
  ): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionsService.Save1Path, 'post');
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

  save1(params: {
          context?: HttpContext
          body: TransactionDto
        }
  ): Observable<number> {

    return this.save1$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  static readonly FindById1Path = '/transactions/{transaction-id}';

  findById1$Response(params: {
                       'transaction-id': number;
                       context?: HttpContext
                     }
  ): Observable<StrictHttpResponse<TransactionDto>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionsService.FindById1Path, 'get');
    if (params) {
      rb.path('transaction-id', params['transaction-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TransactionDto>;
      })
    );
  }

  findById1(params: {
              'transaction-id': number;
              context?: HttpContext
            }
  ): Observable<TransactionDto> {

    return this.findById1$Response(params).pipe(
      map((r: StrictHttpResponse<TransactionDto>) => r.body as TransactionDto)
    );
  }


  static readonly Delete1Path = '/transactions/{transaction-id}';


  delete1$Response(params: {
                     'transaction-id': number;
                     context?: HttpContext
                   }
  ): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionsService.Delete1Path, 'delete');
    if (params) {
      rb.path('transaction-id', params['transaction-id'], {});
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

  delete1(params: {
            'transaction-id': number;
            context?: HttpContext
          }
  ): Observable<void> {

    return this.delete1$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  static readonly FindAllByUserIdPath = '/transactions/users/{user-id}';


  findAllByUserId$Response(params: {
                             'user-id': number;
                             context?: HttpContext
                           }
  ): Observable<StrictHttpResponse<Array<TransactionDto>>> {

    const rb = new RequestBuilder(this.rootUrl, TransactionsService.FindAllByUserIdPath, 'get');
    if (params) {
      rb.path('user-id', params['user-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TransactionDto>>;
      })
    );
  }

  findAllByUserId(params: {
                    'user-id': number;
                    context?: HttpContext
                  }
  ): Observable<Array<TransactionDto>> {

    return this.findAllByUserId$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TransactionDto>>) => r.body as Array<TransactionDto>)
    );
  }

}
