
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SMPM API',
      version: '1.0.0',
      description: 'Documentação da API do Sistema de Manutenção Preventiva de Máquinas'
    },
    servers: [
      { url: 'http://localhost:3001' }
    ]
  },
  apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options)

export default function swaggerDocs(app){
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
