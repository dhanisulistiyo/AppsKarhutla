import { NgModule } from '@angular/core';
import { TimeHelperPipe, LowerCase } from './time-helper/time-helper';
@NgModule({
	declarations: [TimeHelperPipe, LowerCase],
	imports: [],
	exports: [TimeHelperPipe, LowerCase]
})
export class PipesModule { }
