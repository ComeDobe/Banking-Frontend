
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { UserDto } from '../models/user-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  static readonly FindAllPath = '/users/';

  findAll$Response(params?: {
                     context?: HttpContext
                   }
  ): Observable<StrictHttpResponse<Array<UserDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.FindAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserDto>>;
      })
    );
  }

  findAll(params?: {
            context?: HttpContext
          }
  ): Observable<Array<UserDto>> {

    return this.findAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UserDto>>) => r.body as Array<UserDto>)
    );
  }

  static readonly SavePath = '/users/';

  save$Response(params: {
                  context?: HttpContext
                  body: UserDto
                }
  ): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.SavePath, 'post');
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
  save(params: {
         context?: HttpContext
         body: UserDto
       }
  ): Observable<number> {

    return this.save$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  static readonly ValidateAccountPath = '/users/validate/{user-id}';

  validateAccount$Response(params: {
                             'user-id': number;
                             context?: HttpContext
                           }
  ): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.ValidateAccountPath, 'patch');
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
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }
  validateAccount(params: {
                    'user-id': number;
                    context?: HttpContext
                  }
  ): Observable<number> {

    return this.validateAccount$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  static readonly InvalidateAccountPath = '/users/invalidate/{user-id}';

  invalidateAccount$Response(params: {
                               'user-id': number;
                               context?: HttpContext
                             }
  ): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.InvalidateAccountPath, 'patch');
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
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  invalidateAccount(params: {
                      'user-id': number;
                      context?: HttpContext
                    }
  ): Observable<number> {

    return this.invalidateAccount$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  static readonly FindByIdPath = '/users/{user-id}';

  findById$Response(params: {
                      'user-id': number;
                      context?: HttpContext
                    }
  ): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.FindByIdPath, 'get');
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
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  findById(params: {
             'user-id': number;
             context?: HttpContext
           }
  ): Observable<UserDto> {

    return this.findById$Response(params).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  static readonly DeletePath = '/users/{user-id}';

  delete$Response(params: {
                    'user-id': number;
                    context?: HttpContext
                  }
  ): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.DeletePath, 'delete');
    if (params) {
      rb.path('user-id', params['user-id'], {});
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

  delete(params: {
           'user-id': number;
           context?: HttpContext
         }
  ): Observable<void> {

    return this.delete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
