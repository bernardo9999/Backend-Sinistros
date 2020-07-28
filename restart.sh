#!/bin/sh
echo "############ Limpando o ambiente ###########"

npm run env:clean

npx lerna clean --yes

echo "######## Reiniciando o Hyperledger ############"

npm run env:restart

echo "############ Atualizando Hyperledger profiles #############"

cp /root/hyperledger-fabric-network/network-profiles/org1.network-profile.yaml.bak /root/hyperledger-fabric-network/network-profiles/org1.network-profile.yaml
cp /root/hyperledger-fabric-network/network-profiles/org2.network-profile.yaml.bak /root/hyperledger-fabric-network/network-profiles/org2.network-profile.yaml
cp /root/hyperledger-fabric-network/network-profiles/org3.network-profile.yaml.bak /root/hyperledger-fabric-network/network-profiles/org3.network-profile.yaml

echo "############ Bootstrapping #############"

npx lerna bootstrap

sleep 5

echo "############ Empacotando Chaincodes #############"

npm run cc:package -- fabcar org1

sleep 5

npm run cc:package -- financeiro org2

sleep 5

npm run cc:package -- multas org3

sleep 5

echo "############ Instalando Chaincodes #############"

npm run cc:start -- fabcar org1

sleep 15

npm run cc:start -- financeiro org2

sleep 15

npm run cc:start -- multas org3

sleep 15

echo "############## Levantando REST Servers ################"

npx lerna run start --scope server.fabcar --stream &
sleep 10
npx lerna run start --scope server.financeiro --stream &
sleep 10
npx lerna run start --scope server.multas --stream &
sleep 10

echo "############## Inicializando dados ################"

curl http://localhost:8000/fabcar/initCar -H "Content-Type: application/json" --request POST
sleep 10
curl http://localhost:8001/financeiro/initFinanceiro -H "Content-Type: application/json" --request POST
sleep 10
curl http://localhost:8002/multas/initMultas -H "Content-Type: application/json" --request POST

echo "############## Inicializando participantes ################"

hurl invoke fabcar fabcar_registerParticipant "joao" "PSCarros" --user PSCarros -o org1

sleep 2

hurl invoke financeiro financeiro_registerParticipant "pedro" "BCFinancas" --user BCFinancas -o org2

sleep 2

hurl invoke financeiro financeiro_registerParticipant "maria" "PSSinistros" --user PSSinistros -o org2

sleep 2

echo "############## Consultando dados ################"

curl http://localhost:8000/fabcar/getOneCar/1 -H "Content-Type: application/json" --request GET

curl http://localhost:8001/financeiro/getOneFinanceiro/1 -H "Content-Type: application/json" --request GET

curl http://localhost:8002/multas/getOneMultas/1 -H "Content-Type: application/json" --request GET

echo "############## Consultando participantes ################"

curl http://localhost:8000/fabcar/getOneParticipant/joao -H "Content-Type: application/json" --request GET

curl http://localhost:8001/financeiro/getOneParticipant/pedro -H "Content-Type: application/json" --request GET

curl http://localhost:8001/financeiro/getOneParticipant/maria -H "Content-Type: application/json" --request GET