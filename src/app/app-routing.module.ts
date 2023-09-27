import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';

const routes: Routes = [
  {
    path: 'playlists',
    component: PlaylistListComponent,
  },
  {
    path: '**',
    redirectTo: 'playlists',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
