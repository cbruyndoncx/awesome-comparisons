// GENERATED FILE - MANUAL EDIT

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type AlertLevel = 'info' | 'warn' | 'error';

export interface AlertMessage {
  id: string;
  timestamp: Date;
  level: AlertLevel;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigAlertService {
  private readonly maxEntries = 200;
  private readonly messagesSubject = new BehaviorSubject<AlertMessage[]>([]);

  readonly messages$: Observable<AlertMessage[]> = this.messagesSubject.asObservable();

  info(text: string): void {
    this.push('info', text);
  }

  warn(text: string): void {
    this.push('warn', text);
  }

  error(text: string): void {
    this.push('error', text);
  }

  private push(level: AlertLevel, text: string): void {
    const entry: AlertMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date(),
      level,
      text
    };

    const next = [...this.messagesSubject.value, entry];
    if (next.length > this.maxEntries) {
      next.splice(0, next.length - this.maxEntries);
    }

    this.messagesSubject.next(next);

    // Mirror to console for existing workflows
    const prefix = '[ConfigAlert]';
    if (level === 'error') {
      console.error(prefix, text);
    } else if (level === 'warn') {
      console.warn(prefix, text);
    } else {
      console.log(prefix, text);
    }
  }
}
