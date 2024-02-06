
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ContactDto } from '../models/contact-dto';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  static readonly FindAll2Path = '/contacts/';

  findAll2$Response(params?: {
                      context?: HttpContext
                    }
  ): Observable<StrictHttpResponse<Array<ContactDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ContactService.FindAll2Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ContactDto>>;
      })
    );
  }

  findAll2(params?: {
             context?: HttpContext
           }
  ): Observable<Array<ContactDto>> {

    return this.findAll2$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ContactDto>>) => r.body as Array<ContactDto>)
    );
  }

  static readonly Save2Path = '/contacts/';

  save2$Response(params: {
                   context?: HttpContext
                   body: ContactDto
                 }
  ): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, ContactService.Save2Path, 'post');
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


  save2(params: {
          context?: HttpContext
          body: ContactDto
        }
  ): Observable<number> {

    return this.save2$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  static readonly FindById2Path = '/contacts/{contact-id}';

  findById2$Response(params: {
                       'contact-id': number;
                       context?: HttpContext
                     }
  ): Observable<StrictHttpResponse<ContactDto>> {

    const rb = new RequestBuilder(this.rootUrl, ContactService.FindById2Path, 'get');
    if (params) {
      rb.path('contact-id', params['contact-id'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ContactDto>;
      })
    );
  }

  findById2(params: {
              'contact-id': number;
              context?: HttpContext
            }
  ): Observable<ContactDto> {

    return this.findById2$Response(params).pipe(
      map((r: StrictHttpResponse<ContactDto>) => r.body as ContactDto)
    );
  }

  static readonly Delete2Path = '/contacts/{contact-id}';


  delete2$Response(params: {
                     'contact-id': number;
                     context?: HttpContext
                   }
  ): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ContactService.Delete2Path, 'delete');
    if (params) {
      rb.path('contact-id', params['contact-id'], {});
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

  delete2(params: {
            'contact-id': number;
            context?: HttpContext
          }
  ): Observable<void> {

    return this.delete2$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  static readonly FindAllByUserId1Path = '/contacts/users/{user-id}';

  findAllByUserId1$Response(params: {
                              'user-id': number;
                              context?: HttpContext
                            }
  ): Observable<StrictHttpResponse<Array<ContactDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ContactService.FindAllByUserId1Path, 'get');
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
        return r as StrictHttpResponse<Array<ContactDto>>;
      })
    );
  }

  findAllByUserId1(params: {
                     'user-id': number;
                     context?: HttpContext
                   }
  ): Observable<Array<ContactDto>> {

    return this.findAllByUserId1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ContactDto>>) => r.body as Array<ContactDto>)
    );
  }

}
