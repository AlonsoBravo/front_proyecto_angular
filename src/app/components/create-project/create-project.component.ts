import { Component, OnInit } from '@angular/core';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project.service';
import {UploadService} from '../../services/upload.service';
import {Global} from '../../services/global';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateProjectComponent implements OnInit {

	public title: string;
	public project: Project;
	public status: string;
    public filesToUpload: Array<File>;

  constructor(

  	private _projectService: ProjectService,
    private _uploadService: UploadService

  ) { 

  	this.title = 'Crear Proyecto';
  	this.project = new Project('','','','',2019,'','');

  }

  ngOnInit() {
  }


  //SE GUARDA UN PROYECTO A LA BASE DE DATOS CONSUMIENDO LA API EN NODE
  onSubmit(form){

  	console.log(this.project);

      //guardar datos
  	this._projectService.saveProject(this.project).subscribe(
  		response => {
  			if(response.project){
  				
                //subir imagen
                this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image').then(
                
                    (result: any)=>{

                        this.status = 'success';
                        console.log(result);
                        form.reset();

                    }
                );  				
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
