import { Router } from "express";

import SchemaValidator from './helpers/schema-validator'; 
import appointmentsSchema from './app/schemas/appointments'; 
import PatientSchema from './app/schemas/Patients'; 
import DoctorsSchema from './app/schemas/doctors'
import ProceduresSchema from './app/schemas/procedures'

import PatientController from './app/controllers/PatientController';
import appointmentsController from "./app/controllers/appointmentsController";
import DoctorsController from './app/controllers/doctorsController'
import ProceduresController from './app/controllers/proceduresController'

const routes = new Router();

// Routes for Patients
routes.post('/patients/', SchemaValidator.validate(PatientSchema.create), PatientController.Create);
routes.get('/patients/', SchemaValidator.validate(PatientSchema.list), PatientController.GetAll);
routes.get('/patients/:id', SchemaValidator.validate(PatientSchema.find), PatientController.GetById);
routes.put('/patients/:id', SchemaValidator.validate(PatientSchema.update), PatientController.Update);
routes.delete('/patients/:id', SchemaValidator.validate(PatientSchema.delete), PatientController.Delete);

// Routes for appointments
routes.post('/appointments/', SchemaValidator.validate(appointmentsSchema.create), appointmentsController.Create);
routes.get('/appointments/:id', SchemaValidator.validate(appointmentsSchema.find), appointmentsController.GetById);
routes.get('/appointments/', SchemaValidator.validate(appointmentsSchema.list), appointmentsController.GetAll);
routes.put('/appointments/:id', SchemaValidator.validate(appointmentsSchema.update), appointmentsController.Update);
routes.delete('/appointments/:id', SchemaValidator.validate(appointmentsSchema.delete), appointmentsController.Delete);

// Routes for Doctors
routes.post('/doctors/', SchemaValidator.validate(DoctorsSchema.create), DoctorsController.Create);
routes.get('/doctors/', SchemaValidator.validate(DoctorsSchema.list), DoctorsController.GetAll);
routes.get('/doctors/:id', SchemaValidator.validate(DoctorsSchema.find), DoctorsController.GetById);
routes.put('/doctors/:id', SchemaValidator.validate(DoctorsSchema.update), DoctorsController.Update);
routes.delete('/doctors/:id', SchemaValidator.validate(DoctorsSchema.delete), DoctorsController.Delete);

// Routes for Procedures
routes.post('/procedures/', SchemaValidator.validate(ProceduresSchema.create), ProceduresController.Create);
routes.get('/procedures/', SchemaValidator.validate(ProceduresSchema.list), ProceduresController.GetAll);
routes.get('/procedures/:id', SchemaValidator.validate(ProceduresSchema.find), ProceduresController.GetById);
routes.put('/procedures/:id', SchemaValidator.validate(ProceduresSchema.update), ProceduresController.Update);
routes.delete('/procedures/:id', SchemaValidator.validate(ProceduresSchema.delete), ProceduresController.Delete);




export default routes;