import { Component, OnInit } from '@angular/core';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project.service';
import {UploadService} from '../../services/upload.service';
import {Global} from '../../services/global';
import {Router, ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: '../create-project/create-project.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  	public title: string;
	public project: Project;
	public status: string;
	public filesToUpload: Array<File>;
	public saveProject;
	public url: string;

  constructor(private _projectService: ProjectService, private _uploadService: UploadService, private _route: ActivatedRoute){ 

  	this.title = 'Editar proyecto';
  	this.url = Global.url;

  }

  ngOnInit() {

  	this._route.params.subscribe(

  		params => {
  			let id = params.id;

  			this.getProject(id);
  		}

  	);

  }

  getProject(id){

  	this._projectService.getProject(id).subscribe(

  		(response) =>{
  			this.project = response.project;
  		},
  		(error) => {
  			console.log(<any>error);
  		}

  	);

  }

  onSubmit(){

  	this._projectService.updateProject(this.project).subscribe(

  		response => {
	  		if(response.project){
	  			
	  			if(this.filesToUpload){
	  				//subir imagen
	           	 	this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image').then(
		                (result: any)=>{

		                    this.status = 'success';
		                    this.saveProject = response.project._id;
		                }
			        );  				
			  	}else{
			  		this.saveProject = response.project._id;
			  		this.status = 'success';
			  	}
	  		}else{
	  			this.status = 'failed';
	  		}	
  		},	
  		error=>{
  			console.log(<any>error);
  		}

  	);

  }

  fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
