import {constants} from './constants'
import {sendSuccessNotification, sendFailureNotification} from './helper';

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

const createRecord = (dataToUpload) => {
  let prom = new Promise((resolve, reject)=>{
    let client = window.AmeyoClient.init();
    let record = {
      "customKey": constants.customKey,
      "data": dataToUpload
      }
      client.appConf.create(record).then(()=>{
        resolve();
      }).catch((e)=>{
        console.log('Failed in createRecord', e);
        reject(e);
      });
  })

  return prom;
}

const updateRecord = (recordId, dataToUpload) => {
  let prom = new Promise((resolve, reject)=>{
    let client = window.AmeyoClient.init();
    let record = {
      "id": recordId,
      "data": dataToUpload
      }
      client.appConf.update(record).then(()=>{
        resolve();
      }).catch((e)=>{
        console.log('Failed in updateRecord', e);
        reject(e);
      });
  })

  return prom;
}

//--------------------- START: Record Manipulations --------------------------------------------

  export const addRecord = (newData) => {
      let prom = new Promise((resolve, reject)=>{
        getRecord()
        .then((record)=>{
          try{
            let existingData = record?.data || '[]';
            let parsedExistingData = JSON.parse(existingData);

            let shouldAdd = true;
            parsedExistingData.map((item)=>{
              if(item.id == newData.id) {
                shouldAdd(false);
                sendFailureNotification(`Error!!! Record with ID: ${newData.id} already exists`)
                reject()
              }
            })

            if(shouldAdd) {
              parsedExistingData.push(newData);
              let dataToPush = JSON.stringify(parsedExistingData);    
    
              let recordId = record?.id || -1;
              if(recordId >= 0) {
                updateRecord(recordId, dataToPush).then(()=>{resolve()}).catch((e)=>{reject(e)});
              } else {
                createRecord(dataToPush).then(()=>{resolve()}).catch((e)=>{reject(e)});
              }
            }

          } catch(e) {
            reject(e);
          }
        })
        .catch((e)=>{
          console.log('FAILED TO GET APP CONF DATA, before save', e)
        })
      });

      return prom;

  }


  export const deleteRecord = (dropDataRecordId) => {
    let prom = new Promise((resolve, reject)=>{

      getRecord()
        .then((record)=>{
          try{
            let existingData = record?.data || '[]';
            let parsedExistingData = JSON.parse(existingData);

            let dataToPush = parsedExistingData.filter((item)=>{
              return item.id!= dropDataRecordId;
            });
            dataToPush = JSON.stringify(dataToPush);
            let recordId = record?.id || -1;
            updateRecord(recordId, dataToPush).then(()=>{resolve()}).catch((e)=>{reject(e)});

          } catch(e) {
            reject(e);
          }
        })
    })
    return prom;
  }


  export const getTableData = () => {
    let prom = new Promise((resolve, reject)=>{
      getRecord()
      .then((record)=>{
        try{
          let data = record?.data || '[]';
          data = JSON.parse(data);
          resolve(data);
        } catch(e) {
          console.log(e)
          reject(e);
        }
      })
      .catch((e)=>{
        console.log(e)
        reject(e);
      })
    })

    return prom;

  }

//--------------------- END: Record Manipulations --------------------------------------------




//--------------------- START: LOGICS SPECIFIC FOR ADDER --------------------------------------------

  export const getCampaigns = () => {
    let prom = new Promise((resolve, reject)=>{
      let client = window.AmeyoClient.init();
      client.globalData.get("loggedInUser")
      .then((response)=>{
    
        let userType = response?.userType;
    
        let requestObject = {
            url: userType == 'Administrator' ? 'ameyorestapi/cc/campaigns/getAllCampaigns' : 'ameyorestapi/cc/campaigns/getAssigned',
            headers: {
                "content-type": "application/json"
            },
            method: "GET",
        };
        client.httpRequest.invokeAmeyo(requestObject)
        .then((response)=>{
          try {
            let data = JSON.parse(response?.response);
            let filterData = data.filter((item)=>{
              return item.campaignType == 'Interactive Voice Application';
            }); 
            resolve(filterData)
          } catch(e) {
            console.log(e)
            reject(e);
          }
        })
        .catch((error)=>{
          console.log('FAILED TO RECEIVE CAMPAIGN LIST')
          console.log(error)
          reject(e);
        });
      
      })
      .catch((error)=>{
        console.log('FAILED TO RECEIVE LOGGED IN  USER')
        console.log(error)
        reject(e);
      });
    })

    return prom;

  }


  export const getNodeflowsForCampaign = (campaignId) => {
    let prom = new Promise((resolve, reject)=>{
      let client = window.AmeyoClient.init();

      let requestObject = {
          url: `ameyorestapi/voice/getAllCampaignDefaultFeatureContextForCampaign?campaignId=${campaignId}`,
          headers: {
              "content-type": "application/json"
          },
          method: "GET",
      };
    
      client.httpRequest.invokeAmeyo(requestObject)
      .then((response)=>{
        try {
          let data = JSON.parse(response?.response);
          let modData = data.map((item)=>{return({name: item.contextName, id: item.contextId})})
          resolve(modData);
        } catch(e) {
          console.log('FAILED TO Parse CAMPAIGN LIST RESULT')
          console.log(e)
          reject(e)
        }
      })
      .catch((e)=>{
        console.log(`FAILED TO GET NODEFLOW LIST FOR CAMPAIGN ${campaignId}`);
        console.log(e);
        reject(e)
      });
    })

    return prom;
  }

//--------------------- END: LOGICS SPECIFIC FOR ADDER --------------------------------------------


