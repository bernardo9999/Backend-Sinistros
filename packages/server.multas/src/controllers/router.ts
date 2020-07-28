import * as express from 'express';
import { 
    FabcarController_deleteOneCar_post,
    FabcarController_initCar_post,
    FabcarController_createCar_post,
    FabcarController_updateProprietarioCar_post,
    FabcarController_getOneCar_get,
    FabcarController_getAllCar_get,
    FabcarController_getHistoryCar_get,
    FabcarController_createSinistro_post,
    FabcarController_getOneSinistro_get,
    FinanceiroController_initFinanceiro_post,
    FinanceiroController_createFinanceiro_post,
    FinanceiroController_updateFinanceiroDataSinistro_post,
    FinanceiroController_updateFinanceiroPagoValor_post,
    FinanceiroController_transferAssetOwnerFinanceiro_post,
    FinanceiroController_deleteOneFinanceiro_post,
    FinanceiroController_getOneFinanceiro_get,
    FinanceiroController_getAllFinanceiro_get,
    FinanceiroController_getHistoryFinanceiro_get,
    MultasController_initMultas_post,
    MultasController_createMultas_post,
    MultasController_getOneMultas_get,
    MultasController_getAllMultas_get,
    MultasController_getHistoryMultas_get,
    MultasController_updateMultasPagoValor_post,
    FabcarController_getOneParticipant_get,
    FabcarController_registerParticipant_post,
    FabcarController_changeParticipantIdentity_post,
    FabcarController_transferAssetOwnerCar_post,
    FinanceiroController_registerParticipant_post,
    FinanceiroController_changeParticipantIdentity_post,
    FinanceiroController_getOneParticipant_get } from './controllers'
export default express.Router()
.post('/fabcar/deleteOneCar', FabcarController_deleteOneCar_post)
.post('/fabcar/initCar', FabcarController_initCar_post)
.post('/fabcar/createCar', FabcarController_createCar_post)
.post('/fabcar/updateProprietarioCar', FabcarController_updateProprietarioCar_post)
.get('/fabcar/getOneCar/:id', FabcarController_getOneCar_get)
.get('/fabcar/getAllCar', FabcarController_getAllCar_get)
.get('/fabcar/getHistoryCar/:id', FabcarController_getHistoryCar_get)
.post('/fabcar/createSinistro', FabcarController_createSinistro_post)
.get('/fabcar/getOneSinistro/:id', FabcarController_getOneSinistro_get)
.post('/financeiro/initFinanceiro', FinanceiroController_initFinanceiro_post)
.post('/financeiro/createFinanceiro', FinanceiroController_createFinanceiro_post)
.post('/financeiro/updateFinanceiroDataSinistro', FinanceiroController_updateFinanceiroDataSinistro_post)
.post('/financeiro/updateFinanceiroPagoValor', FinanceiroController_updateFinanceiroPagoValor_post)
.post('/financeiro/transferAssetOwnerFinanceiro', FinanceiroController_transferAssetOwnerFinanceiro_post)
.post('/financeiro/deleteOneFinanceiro', FinanceiroController_deleteOneFinanceiro_post)
.get('/financeiro/getOneFinanceiro/:id', FinanceiroController_getOneFinanceiro_get)
.get('/financeiro/getAllFinanceiro', FinanceiroController_getAllFinanceiro_get)
.get('/financeiro/getHistoryFinanceiro/:id', FinanceiroController_getHistoryFinanceiro_get)
.post('/multas/initMultas', MultasController_initMultas_post)
.post('/multas/createMultas', MultasController_createMultas_post)
.get('/multas/getOneMultas/:id', MultasController_getOneMultas_get)
.get('/multas/getAllMultas', MultasController_getAllMultas_get)
.get('/multas/getHistoryMultas/:id', MultasController_getHistoryMultas_get)
.post('/multas/updateMultasPagoValor', MultasController_updateMultasPagoValor_post)
.get('/fabcar/getOneParticipant/:id', FabcarController_getOneParticipant_get)
.post('/fabcar/registerParticipant', FabcarController_registerParticipant_post)
.post('/fabcar/changeParticipantIdentity', FabcarController_changeParticipantIdentity_post)
.post('/fabcar/transferAssetOwnerCar', FabcarController_transferAssetOwnerCar_post)
.post('/financeiro/registerParticipant', FinanceiroController_registerParticipant_post)
.post('/financeiro/changeParticipantIdentity', FinanceiroController_changeParticipantIdentity_post)
.get('/financeiro/getOneParticipant/:id', FinanceiroController_getOneParticipant_get)
