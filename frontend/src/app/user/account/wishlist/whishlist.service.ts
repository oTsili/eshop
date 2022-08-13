import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL + 'user';

@Injectable({ providedIn: 'root' })
export class WhishlistService {}
