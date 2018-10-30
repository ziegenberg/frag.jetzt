import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/_dialogs/register/register.component';
import { PasswordResetComponent } from './components/_dialogs/password-reset/password-reset.component';
import { AppRoutingModule } from './app-routing.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/http/user.service';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NotificationService } from './services/util/notification.service';
import { AuthenticationService } from './services/http/authentication.service';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RoomService } from './services/http/room.service';
import { CommentService } from './services/http/comment.service';
import { DataStoreService } from './services/util/data-store.service';
import { ContentService } from './services/http/content.service';
import { ContentAnswerService } from './services/http/content-answer.service';
import { UserActivationComponent } from './components/_dialogs/user-activation/user-activation.component';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { GenericDataDialogComponent } from './components/shared/_dialogs/generic-data-dialog/generic-data-dialog.component';
import { FooterLoginDialogComponent } from './components/shared/_dialogs/footer-login-dialog/footer-login-dialog.component';
import { EssentialsModule } from './components/essentials/essentials.module';
import { SharedModule } from './components/shared/shared.module';
export function dialogClose(dialogResult: any) {
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginComponent,
    PasswordResetComponent,
    RegisterComponent,
    UserActivationComponent,
    FooterLoginDialogComponent
  ],
  entryComponents: [
    RegisterComponent,
    PasswordResetComponent,
    UserActivationComponent,
    GenericDataDialogComponent,
    FooterLoginDialogComponent
  ],
  imports: [
    AppRoutingModule,
    EssentialsModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    NotificationService,
    AuthenticationService,
    AuthenticationGuard,
    DataStoreService,
    RoomService,
    CommentService,
    ContentService,
    ContentAnswerService,
    UserService,
    {
      provide: MatDialogRef,
      useValue: {
        dialogClose
      }
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: []
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
