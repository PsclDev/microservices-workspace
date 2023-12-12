import { Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';

export async function performIntercommCallWithTimeout<P, R>(
  logger: Logger,
  client: ClientProxy,
  identifier: string,
  payload?: P,
): Promise<R> {
  logger.debug(`doRpcCall: call ${identifier}, `, payload);

  let result: R;
  try {
    result = await lastValueFrom(
      client.send<R>(identifier, payload || {}).pipe(timeout(5000)),
    );
  } catch (ex) {
    logger.error(`Exception on RPC call:`, ex);
    throw new RpcException(`Cannot call "${identifier}": ${ex?.message || ex}`);
  }

  logger.debug(`doRpcCall: recv:`, result);
  return result;
}
