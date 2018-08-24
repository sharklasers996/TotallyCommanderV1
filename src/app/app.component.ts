import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { FileBrowser } from '../Utils/file-browser';

import { MousetrapStatic } from 'mousetrap';
import { Windows } from '../enums/windows';

@Component({
  selector: 'tc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TotallyCommanderV1';

  public leftPanel: Windows = Windows.LeftFileBrowserPanel;
  public rightPanel: Windows = Windows.RightFileBrowserPanel;


  constructor(private _electronService: ElectronService) {


    const mouseTrap: MousetrapStatic = window.require("mousetrap");
    mouseTrap.bind('esc', (e, c) => {
      console.log(e);
      console.log(c);
    });





    // let process = window.require('child-process-promise');

    // process.spawn(
    //   '/bin/bash',
    //   [
    //     '-c',
    //     'sshfs -o password_stdin ponaspx@192.168.0.100:/ /home/ponaspx/Network/media_center/ <<< \"bimbam\"'
    //   ],
    //   {
    //     capture: ['stdout', 'stderr']
    //   }
    // ).then(r => {
    //   console.log(r);
    // })
    // .catch(e=> {
    //   console.log(e);
    // });




    //     const StreamZip = window.require("node-stream-zip");
    //     console.time("zip");
    //     const zip = new StreamZip({
    //       file: '/home/ponaspx/Downloads/JetBrains.Rider-2018.1.4.tar.zip',
    //       storeEntries: true
    //   });

    //   zip.on('ready', () => {
    //       // Take a look at the files
    //       console.log('Entries read: ' + zip.entriesCount);
    //       for (const entry of Object.values<any>(zip.entries())) {
    //           const desc = entry.isDirectory ? 'directory' : `${entry.size} bytes`;
    //           console.log(`Entry ${entry.name}: ${desc}`);
    //       }

    //       // // Read a file in memory
    //       // let zipDotTxtContents = zip.entryDataSync('path/inside/zip.txt');
    //       // console.log("The content of path/inside/zip.txt is: " + zipDotTxtContents);

    //       // Do not forget to close the file once you're done
    //       zip.close()
    //   });

    // console.timeEnd("zip");






    // let path = '/home/ponaspx/Code/Angular/angular-electron-bootstrap-boilerplate/src/app/';
    // const fsj: FSJetpack = window.require("fs-jetpack");


    // var aa = fsj.inspect(path);
    // console.log(aa);





  }
}
