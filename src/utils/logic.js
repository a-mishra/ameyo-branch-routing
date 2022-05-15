import {constants} from './constants'

const getRecord = () => {
    let prom = new Promise((resolve, reject)=>{
        let client = window.AmeyoClient.init();

        let filter = {
            "customKey": constants.customKey
        }

        client.appConf.get(filter)
        .then((response)=>{
            let record = null;
            if(response?.totalRecordsCount > 0) {
              record = response?.records?.[0] || null;
            }
            resolve(record);
        })
        .catch(reject)
    })

    return prom;
}


const createRecord = () => {

}


const updateRecord = () => {

}


export const addRecord = (data) => {
    let prom = new Promise((resolve, reject)=>{
      getRecord()
      .then((record)=>{
        if(record) {
          // update records;
          
        } else {
          // create records
        }
      })
      .catch(()=>{

      })



    });

    return prom;


    


    client.appConf.get(filter)
    .then((response)=>{
      let id = response?.records?.[0]?.id >= 0 ? response?.records?.[0]?.id : -1;
      if(id >= 0) {
        // update record
        let data = JSON.parse(response?.records[0]?.data);
        data.push({id: `${campaign?.campaignId}-${branchCode}-${nodeflow?.id}`, campaign, branchCode, nodeflow, dateAdded: new Date().toISOString()});

        let record = {
          "id": id,
          "data": JSON.stringify(data)
          }
          client.appConf.update(record).then(()=>{
            sendSuccessNotification('Record Added')
          }).catch(()=>{
            sendFailureNotification('Failed')
          });
      }
      else {
        // create record
        let data = [];
        data.push({id: `${campaign?.campaignId}-${branchCode}-${nodeflow?.id}`, campaign, branchCode, nodeflow, dateAdded: new Date().toISOString()});

        let record = {
          "customKey": constants.customKey,
          "data": JSON.stringify(data)
          }
          client.appConf.create(record).then(()=>{
            sendSuccessNotification('Record Added')
            refresh();
          }).catch(()=>{
            sendFailureNotification('Failed')
          });

      }

    })
    .catch((e)=>{
      console.log('FAILED TO GET APP CONF DATA, before save')
      console.log(e)
    })



}