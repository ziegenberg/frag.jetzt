import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list/comment-list.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomPageComponent } from './room-page/room-page.component';
import { CommentPageComponent } from './comment-page/comment-page.component';
import { EssentialsModule } from '../essentials/essentials.module';
import { SharedRoutingModule } from './shared-routing.module';
import { RoomJoinComponent } from './room-join/room-join.component';
import { RoomCreateComponent } from './_dialogs/room-create/room-create.component';
import { UserBonusTokenComponent } from '../participant/_dialogs/user-bonus-token/user-bonus-token.component';
import { RemindOfTokensComponent } from '../participant/_dialogs/remind-of-tokens/remind-of-tokens.component';
import { LoginComponent } from './login/login.component';
import { CommentComponent } from './comment/comment.component';
import { CreateCommentComponent } from './_dialogs/create-comment/create-comment.component';
import { PresentCommentComponent } from './_dialogs/present-comment/present-comment.component';
import { DeleteAccountComponent } from './_dialogs/delete-account/delete-account.component';
import { DialogActionButtonsComponent } from './dialog/dialog-action-buttons/dialog-action-buttons.component';
import { QrCodeDialogComponent } from './_dialogs/qr-code-dialog/qr-code-dialog.component';
import { ArsModule } from '../../../../projects/ars/src/lib/ars.module';
import { RemoveFromHistoryComponent } from './_dialogs/remove-from-history/remove-from-history.component';
import { CommentAnswerComponent } from './comment-answer/comment-answer.component';
import { MarkdownModule } from 'ngx-markdown';
import { MatRippleModule } from '@angular/material/core';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    EssentialsModule,
    SharedRoutingModule,
    MatRippleModule,
    ArsModule,
    MarkdownModule,
    QRCodeModule
  ],
  declarations: [
    RoomJoinComponent,
    PageNotFoundComponent,
    RoomPageComponent,
    RoomListComponent,
    HeaderComponent,
    FooterComponent,
    CommentPageComponent,
    CommentListComponent,
    RoomCreateComponent,
    UserBonusTokenComponent,
    RemindOfTokensComponent,
    LoginComponent,
    CommentComponent,
    CreateCommentComponent,
    PresentCommentComponent,
    DeleteAccountComponent,
    DialogActionButtonsComponent,
    QrCodeDialogComponent,
    RemoveFromHistoryComponent,
    CommentAnswerComponent
  ],
  exports: [
    RoomJoinComponent,
    PageNotFoundComponent,
    RoomPageComponent,
    RoomListComponent,
    HeaderComponent,
    FooterComponent,
    CommentPageComponent,
    CommentListComponent,
    CreateCommentComponent,
    PresentCommentComponent,
    CommentComponent,
    DialogActionButtonsComponent,
    UserBonusTokenComponent
  ]
})
export class SharedModule {
}
