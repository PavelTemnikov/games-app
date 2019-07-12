import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { HeaderComponent } from './header/header.component';
import { GenreListComponent } from './shared/genre-list/genre-list.component';
import { DevelopersComponent } from './developers/developers.component';
import { EntityNameComponent } from './shared/entity-name/entity-name.component';
import { PublishersComponent } from './publishers/publishers.component';
import { GameComponent } from './game/game.component';
import { DeveloperComponent } from './developer/developer.component';
import { PublisherComponent } from './publisher/publisher.component';
import { BackButtonComponent } from './shared/back-button/back-button.component';
import { GameListComponent } from './shared/game-list/game-list.component';
import { EntityCreatingComponent } from './shared/entity-creating/entity-creating.component';
import { GenresComponent } from './genres/genres.component';
import { HeaderManagerComponent } from './shared/header-manager/header-manager.component';
import { GameManagerComponent } from './shared/game-manager/game-manager.component';

@NgModule({
    declarations: [
        AppComponent,
        GamesComponent,
        HeaderComponent,
        GenreListComponent,
        DevelopersComponent,
        EntityNameComponent,
        PublishersComponent,
        GameComponent,
        DeveloperComponent,
        PublisherComponent,
        BackButtonComponent,
        GameListComponent,
        EntityCreatingComponent,
        GenresComponent,
        HeaderManagerComponent,
        GameManagerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CustomMaterialModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
