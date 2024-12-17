import * as functions from 'firebase-functions';
import express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { parse } from 'yaml';
import * as fs from 'fs';
import * as path from 'path';

const app = express();
const basePath = '/pilot-87003/us-central1/swagger';

// Read and parse the OpenAPI/Swagger document
const swaggerDocument = parse(
  fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8')
);

// Update servers configuration to include the correct base path
swaggerDocument.servers = [{
  url: basePath,
  description: 'Firebase Functions endpoints'
}];

// Serve Swagger UI directly with the document
app.use(`${basePath}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }'
}));

// Health check endpoint
app.get(`${basePath}/health`, (req, res) => {
  res.json({ status: 'ok' });
});

export const swagger = functions.https.onRequest(app);