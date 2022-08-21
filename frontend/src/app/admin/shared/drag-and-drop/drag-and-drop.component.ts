import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageContainerHostDirective } from './directives/image-container-host.directive';
import { ImageContainer } from './drag-and-drop.interfaces';
import { DragAndDropService } from './drag-and-drop.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent implements OnInit {
  files: any;
  data: any;
  deleteSubscription: Subscription;

  // Keep track of the view from the elements queried with panelHost directive
  @ViewChild(ImageContainerHostDirective, { static: true })
  imageContainerHost!: ImageContainerHostDirective;
  constructor(private dragAndDropService: DragAndDropService) {}

  ngOnInit(): void {}

  /**
   * handle file from dropping
   */
  onFileDropped(files) {
    this.prepareFilesList(files);

    for (let file of files) {
      this.loadComponent(file);
    }
  }

  /**
   * handle file from browsing
   */
  fileBrowserHandle(event) {
    const files = event.target.files;
    // save the files
    this.prepareFilesList(files);

    for (let file of files) {
      this.loadComponent(file);
    }
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    this.files = files;
    // this.data ={}
    // this.uploadFilesSimulator(0);
  }

  onSubmitFiles() {
    // update the control
    // this.append();

    // console.log({ control: this.fileControl });
    // send the control
    this.dragAndDropService.uploadFiles(this.files).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (response) => {
        console.error(response.error);
      },
    });
  }

  loadComponent(file) {
    /**
     * Create a view container where we will insert our
     * newlly created compnent
     */
    const imageItem = this.dragAndDropService.getImageComponent(file);
    const viewContainerRef = this.imageContainerHost.viewContainerRef;

    // create the new component
    const componentRef = viewContainerRef.createComponent<ImageContainer>(
      imageItem.component
    );
    // pass the data from provided from the accordion service
    componentRef.instance.data = imageItem.data;
  }
}
