import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { TransactionDto } from './transaction-dto';
import { Observable } from 'rxjs';

@Injectable()
export class FirstService {

  rootUrl = 'http://localhost:9098';

  constructor(
    private httpClient: HttpClient
  ) { }

  findAllTransactions(): Observable<any> {
    let _headers: HttpHeaders = new HttpHeaders();
    _headers = _headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjb21lLnBpbmFAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJDaHJpc3RpYW4gRG9iZSIsImV4cCI6MTcwODI0MjA3OCwidXNlcklkIjoxLCJpYXQiOjE3MDc1MjIwNzgsImF1dGhvcml0aWVzIjpbXX0.JSbvELLZw3ViOE-iDBu34cYTbv45AneSD1vhFBGr0PQ');
    const request = new HttpRequest<any>(
      'GET',
      this.rootUrl + '/transactions/',
      {
        headers: _headers,
        params: null,
        responseType: 'json'
      }
    );
    return this.httpClient.request(request)
      .pipe(
        filter(r => r instanceof HttpResponse),
        map(res => res as any)
      );
  }

  findAllTransactionsV2(): Observable<Array<TransactionDto>> {
    let _headers: HttpHeaders = new HttpHeaders();
    _headers = _headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJteXVzZXJAZ21haWwuY29tIiwiZXhwIjoxNjY1NDQwMjM5LCJpYXQiOjE2NjQ3MjAyMzksImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV19.UVs4VclebetFTiTg8tB7v7USQ6MSHfS_iStTAze9QFk');
    return this.httpClient.get(
      this.rootUrl + '/transactions/',
      {
        headers: _headers
      }
    ).pipe(
      filter(r => r instanceof HttpResponse),
      map(res => {
        console.log(res);
        return (res as HttpResponse<TransactionDto>).body as Array<TransactionDto>;
      })
    );
  }
}

