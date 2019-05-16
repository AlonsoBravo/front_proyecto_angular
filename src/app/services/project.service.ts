import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Project} from '../models/project';
import {Global} from './global';

@Injectable()
export class ProjectService{

	public url:string;
	private headers: any;

	constructor(private _http: HttpClient){
		
		this.url = Global.url;
		this.headers = new HttpHeaders().set('Content-Type','application/json');
		
	}

	testService(){

		return 'Probando el servicio de Angular';

	}

	//SE GUARDA UN PROYECTO A LA BASE DE DATOS MEDIANTE LA API
	saveProject(project:Project): Observable<any>{

		let params = JSON.stringify(project);
		this.headers;

		return this._http.post(this.url+'/save-project', params, {headers: this.headers});	
 
	}

	getProjects(): Observable<any>{

		this.headers;

		return this._http.get(this.url+'projects', {headers:this.headers});

	}

	getProject(id): Observable<any>{

		this.headers;

		return this._http.get(this.url+'project/'+id, {headers:this.headers});

	}

	deleteProject(id): Observable<any>{

		this.headers;

		return this._http.delete(this.url+'project/'+id, {headers:this.headers});

	}

	updateProject(project): Observable<any>{

		let params = JSON.stringify(project);
		this.headers;

		return this._http.put(this.url+'project/'+project._id, params,{headers: this.headers});
	}

}