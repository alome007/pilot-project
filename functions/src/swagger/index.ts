import * as functions from 'firebase-functions';
import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { parse } from 'yaml';
import * as fs from 'fs';
import * as path from 'path';

const app = express();

// Read and parse the OpenAPI/Swagger document
const swaggerDocument = parse(
  fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8')
);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export const swagger = functions.https.onRequest(app);