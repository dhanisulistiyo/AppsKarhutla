import moment from 'moment';
import { Injectable } from "@angular/core";
@Injectable()
export class FunctionServiceProvider {

 getStringDate(){
    return moment().format().slice(0,-15);
}

}