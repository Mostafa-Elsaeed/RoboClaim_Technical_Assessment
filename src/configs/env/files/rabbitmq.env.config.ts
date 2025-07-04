export const rabbitmqConfig = () => ({
  rabbitmq: {
    serviceName: process.env.RABBITMQ_SERVICE_NAME || 'FileUploadService',
    host: process.env.RABBITMQ_HOST,
    port: parseInt(process.env.RABBITMQ_PORT, 10) || 5672,
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
    queueName: process.env.RABBITMQ_QUEUE_NAME || 'file_uploads',
  },
});
