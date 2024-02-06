
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AuthenticationRequest } from '../models/authentication-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { UserDto } from '../models/user-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  static readonly RegisterPath = '/auth/register';

  register$Response(params: {
                      context?: HttpContext
                      body: UserDto
                    }
  ): Observable<StrictHttpResponse<AuthenticationResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.RegisterPath, 'post');
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
        return r as StrictHttpResponse<AuthenticationResponse>;
      })
    );
  }


  register(params: {
             context?: HttpContext
             body: UserDto
           }
  ): Observable<AuthenticationResponse> {

    return this.register$Response(params).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>) => r.body as AuthenticationResponse)
    );
  }


  static readonly AuthenticatePath = '/auth/authenticate';

  authenticate$Response(params: {
                          context?: HttpContext
                          body: AuthenticationRequest
                        }
  ): Observable<StrictHttpResponse<AuthenticationResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticatePath, 'post');
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
        return r as StrictHttpResponse<AuthenticationResponse>;
      })
    );
  }

  authenticate(params: {
                 context?: HttpContext
                 body: AuthenticationRequest
               }
  ): Observable<AuthenticationResponse> {

    return this.authenticate$Response(params).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>) => r.body as AuthenticationResponse)
    );
  }

}
