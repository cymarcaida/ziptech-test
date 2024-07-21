import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [AccountService],
  exports: [AccountService]
})

export class AccountModule { }