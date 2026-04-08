import { Module, Global } from '@nestjs/common';
import { ZenStackService } from './zenstack.service';

@Global()
@Module({
  providers: [ZenStackService],
  exports: [ZenStackService],
})
export class ZenStackModule {}
