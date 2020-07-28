import { Request, Response } from 'express';
import { FabcarControllerBackEnd } from '../convector';
import { FinanceiroControllerBackEnd } from '../convector';
import { MultasControllerBackEnd } from '../convector';


export async function FabcarController_deleteOneCar_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FabcarControllerBackEnd
                .deleteOneCar(params.id));
            
    } catch(ex) {
        console.log('Error post FabcarController_deleteOneCar', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FabcarController_initCar_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FabcarControllerBackEnd
                .initCar());
            
    } catch(ex) {
        console.log('Error post FabcarController_initCar', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FabcarController_createCar_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FabcarControllerBackEnd
                .createCar(params.car,params.ownerID));
            
    } catch(ex) {
        console.log('Error post FabcarController_createCar', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FabcarController_updateProprietarioCar_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FabcarControllerBackEnd
                .updateProprietarioCar(params.id,params.proprietario));
            
    } catch(ex) {
        console.log('Error post FabcarController_updateProprietarioCar', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FabcarController_getOneCar_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await FabcarControllerBackEnd
            .getOneCar(params.id));
        
    } catch(ex) {
        console.log('Error get FabcarController_getOneCar', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FabcarController_getAllCar_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await FabcarControllerBackEnd
            .getAllCar());
        
    } catch(ex) {
        console.log('Error get FabcarController_getAllCar', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FabcarController_getHistoryCar_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await FabcarControllerBackEnd
            .getHistoryCar(params.id));
        
    } catch(ex) {
        console.log('Error get FabcarController_getHistoryCar', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FabcarController_createSinistro_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FabcarControllerBackEnd
                .createSinistro(params.data));
            
    } catch(ex) {
        console.log('Error post FabcarController_createSinistro', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FabcarController_getOneSinistro_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await FabcarControllerBackEnd
            .getOneSinistro(params.id));
        
    } catch(ex) {
        console.log('Error get FabcarController_getOneSinistro', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FinanceiroController_initFinanceiro_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FinanceiroControllerBackEnd
                .initFinanceiro());
            
    } catch(ex) {
        console.log('Error post FinanceiroController_initFinanceiro', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FinanceiroController_createFinanceiro_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FinanceiroControllerBackEnd
                .createFinanceiro(params.financeiro));
            
    } catch(ex) {
        console.log('Error post FinanceiroController_createFinanceiro', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FinanceiroController_updateFinanceiroDataSinistro_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FinanceiroControllerBackEnd
                .updateFinanceiroDataSinistro(params.id,params.datasinistro,params.assetOwner));
            
    } catch(ex) {
        console.log('Error post FinanceiroController_updateFinanceiroDataSinistro', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FinanceiroController_updateFinanceiroPagoValor_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FinanceiroControllerBackEnd
                .updateFinanceiroPagoValor(params.id,params.assetOwner));
            
    } catch(ex) {
        console.log('Error post FinanceiroController_updateFinanceiroPagoValor', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FinanceiroController_transferAssetOwnerFinanceiro_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FinanceiroControllerBackEnd
                .transferAssetOwnerFinanceiro(params.id,params.to));
            
    } catch(ex) {
        console.log('Error post FinanceiroController_transferAssetOwnerFinanceiro', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FinanceiroController_deleteOneFinanceiro_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FinanceiroControllerBackEnd
                .deleteOneFinanceiro(params.id));
            
    } catch(ex) {
        console.log('Error post FinanceiroController_deleteOneFinanceiro', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FinanceiroController_getOneFinanceiro_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await FinanceiroControllerBackEnd
            .getOneFinanceiro(params.id));
        
    } catch(ex) {
        console.log('Error get FinanceiroController_getOneFinanceiro', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FinanceiroController_getAllFinanceiro_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await FinanceiroControllerBackEnd
            .getAllFinanceiro());
        
    } catch(ex) {
        console.log('Error get FinanceiroController_getAllFinanceiro', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FinanceiroController_getHistoryFinanceiro_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await FinanceiroControllerBackEnd
            .getHistoryFinanceiro(params.id));
        
    } catch(ex) {
        console.log('Error get FinanceiroController_getHistoryFinanceiro', ex.stack);
        res.status(500).send(ex);
    }
}
export async function MultasController_initMultas_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await MultasControllerBackEnd
                .initMultas());
            
    } catch(ex) {
        console.log('Error post MultasController_initMultas', ex.stack);
        res.status(500).send(ex);
    }
}
export async function MultasController_createMultas_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await MultasControllerBackEnd
                .createMultas(params.multas));
            
    } catch(ex) {
        console.log('Error post MultasController_createMultas', ex.stack);
        res.status(500).send(ex);
    }
}
export async function MultasController_getOneMultas_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await MultasControllerBackEnd
            .getOneMultas(params.id));
        
    } catch(ex) {
        console.log('Error get MultasController_getOneMultas', ex.stack);
        res.status(500).send(ex);
    }
}
export async function MultasController_getAllMultas_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await MultasControllerBackEnd
            .getAllMultas());
        
    } catch(ex) {
        console.log('Error get MultasController_getAllMultas', ex.stack);
        res.status(500).send(ex);
    }
}
export async function MultasController_getHistoryMultas_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await MultasControllerBackEnd
            .getHistoryMultas(params.id));
        
    } catch(ex) {
        console.log('Error get MultasController_getHistoryMultas', ex.stack);
        res.status(500).send(ex);
    }
}
export async function MultasController_updateMultasPagoValor_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await MultasControllerBackEnd
                .updateMultasPagoValor(params.id));
            
    } catch(ex) {
        console.log('Error post MultasController_updateMultasPagoValor', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FabcarController_getOneParticipant_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await FabcarControllerBackEnd
            .getOneParticipant(params.id));
        
    } catch(ex) {
        console.log('Error get FabcarController_getOneParticipant', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FabcarController_registerParticipant_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FabcarControllerBackEnd
                .registerParticipant(params.id,params.name));
            
    } catch(ex) {
        console.log('Error post FabcarController_registerParticipant', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FabcarController_changeParticipantIdentity_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FabcarControllerBackEnd
                .changeParticipantIdentity(params.id,params.newIdentity));
            
    } catch(ex) {
        console.log('Error post FabcarController_changeParticipantIdentity', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FabcarController_transferAssetOwnerCar_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FabcarControllerBackEnd
                .transferAssetOwnerCar(params.id,params.to));
            
    } catch(ex) {
        console.log('Error post FabcarController_transferAssetOwnerCar', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FinanceiroController_registerParticipant_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FinanceiroControllerBackEnd
                .registerParticipant(params.id,params.name));
            
    } catch(ex) {
        console.log('Error post FinanceiroController_registerParticipant', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FinanceiroController_changeParticipantIdentity_post(req: Request, res: Response): Promise<void>{
    try{
        let params = req.body;
            res.status(200).send(await FinanceiroControllerBackEnd
                .changeParticipantIdentity(params.id,params.newIdentity));
            
    } catch(ex) {
        console.log('Error post FinanceiroController_changeParticipantIdentity', ex.stack);
        res.status(500).send(ex);
    }
}
export async function FinanceiroController_getOneParticipant_get(req: Request, res: Response): Promise<void>{
    try{
        let params = req.params;
        res.status(200).send(await FinanceiroControllerBackEnd
            .getOneParticipant(params.id));
        
    } catch(ex) {
        console.log('Error get FinanceiroController_getOneParticipant', ex.stack);
        res.status(500).send(ex);
    }
}