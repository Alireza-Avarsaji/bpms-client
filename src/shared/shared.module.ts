import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { JALALI_MOMENT_FORMATS, MOMENT_FORMATS } from './helper/date-picker/jalali_moment_formats';
import { JalaliMomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from './helper/date-picker/material.persian-date.adapter';
import { SharedPipesModule } from './pipes/sharedPipes.module';

@NgModule({
  imports: [
    MatIconModule,
    CommonModule,
    SharedPipesModule
  ],
  exports: [
    MatIconModule,
    CommonModule,
    SharedPipesModule
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: JalaliMomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_LOCALE, useValue: 'fa' },
    {
      provide: MAT_DATE_FORMATS,
      useFactory: (locale: string) => {
        if (locale === 'fa') {
          return JALALI_MOMENT_FORMATS;
        } else {
          return MOMENT_FORMATS;
        }
      },
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
  ]
})
export class SharedModule { }
