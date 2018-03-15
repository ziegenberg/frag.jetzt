import { Injectable } from '@angular/core';
import { AnswerText } from './answer-text';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handling.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ContentAnswerService extends ErrorHandlingService {
  private answerUrl = 'api/answerTexts';

  constructor(private http: HttpClient) {
    super();
  }

  getAnswerTexts(contentId: string): Observable<AnswerText[]> {
    const url = `${this.answerUrl}/?contentId=${contentId}`;
    return this.http.get<AnswerText[]>(url).pipe(
      catchError(this.handleError('getAnswerTexts', []))
    );
  }

  addAnswerText(answerText: AnswerText): Observable<AnswerText> {
    return this.http.post<AnswerText>(this.answerUrl, answerText, httpOptions).pipe(
      catchError(this.handleError<AnswerText>('addAnswerText'))
    );
  }

  getAnswerText(id: string): Observable<AnswerText> {
    const url = `${this.answerUrl}/${id}`;
    return this.http.get<AnswerText>(url).pipe(
      catchError(this.handleError<AnswerText>(`getAnswerText id=${id}`))
    );
  }
}