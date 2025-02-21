import {ConfigService} from '@nestjs/config';

import {EXCHANG_NAME, EXCHANG_TYPE} from '@project/const';

export function getRabbitMQOptions() {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: EXCHANG_NAME,
          type: EXCHANG_TYPE
        },
      ],
      uri: `amqp://${config.get<string>('rabbitmq.user')}:${config.get<string>('rabbitmq.password')}@${config.get<string>('rabbitmq.host')}:${config.get<string>('rabbitmq.port')}`,
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService]
  }
}
