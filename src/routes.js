import { Router } from "express";

import SchemaValidator from './helpers/schema-validator'; 
import ServiceSchema from './app/schemas/Services'; 


import PatientController from './app/controllers/PatientController';
import ServicesController from "./app/controllers/ServicesController";

const routes = new Router();

// routes.post('/patients', SchemaValidator.validate(PatientSchema.create), PatientController.Create);

routes.post('/services', SchemaValidator.validate(ServiceSchema.create), ServicesController.Create);
routes.get('/services/:id', SchemaValidator.validate(ServiceSchema.find), ServicesController.GetById);
routes.get('/services', SchemaValidator.validate(ServiceSchema.list), ServicesController.GetAll);
routes.put('/services/:id', SchemaValidator.validate(ServiceSchema.update), ServicesController.Update);
routes.delete('/services/:id', SchemaValidator.validate(ServiceSchema.delete), ServicesController.Delete);



export default routes;