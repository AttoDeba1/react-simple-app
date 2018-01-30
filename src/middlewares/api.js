export const CALL_API = symbol('Call API');
import {UrlBuilderParameters } from './utils/UrlBuilderHelper';
export default store =>next =>action=>{
  const callAPI = action[CALL_API];
  if(callAPI==="undefined"){
      return next(action);
  }
  const { types, methods,body, successCallback,failureCallback, message, args={},queryParam={} }= callAPI;
  const [ requestType, successType, failureType] = types;
  let {endpoint}=callAPI;
  //verify call api parameters
    if(typeof endpoint  !=='string'){
        throw new Error('Specify a string endpoint URL.');
    }
    if(!Array.isArray(types) || types.length !==3 ){
        throw new Error('Expected an array of three action types.');
    }
    if(!types.every(type => typeof type==='string')){
        throw new Error('Expected action types to be string.');
    }
    if(typeof methods !== 'string'){
        throw new Error('Specify a string request method.');
    }
    //dispatch request action type before request
    next(actionWith({type: requestType, parameter: body}));

    function actionWith(data) {
        const finalAction = Object.assign({},action,data);
        delete finalAction[CALL_API];
        return finalAction;
    }
    return callApi(endpoint, methods,body, queryParam, message).then(
        response => {
            dispatchCallBackAction(response,body,message,failureCallback,successCallback);
        },
        error => {
            dispatchErrorAction(error);
        }
        );

    function dispatchErrorAction(error) {
        if(error){
            if(message && message.error){

            }
            const errorAction= {
                type: failureType
            };
            if(args.hideErrorMessage !==true || typeof args.hideErrorMessage === 'function'){
                errorAction.callError ={errorContent:error};
            }
            next(actionWith(errorAction));
        }
    }

    function getErrorsCode(errors) {
        if(errors && errors.length>0){
            return errors[0]['code'];
        }
        return null;
    }
    function getErrorsParams(errors) {
        let params={};
        if(errors && errors.length>0){
            if( errors[0]['messageParams'] !=null && errors[0]['messageParams'].length > 0 ){
                try {
                    params =JSON.parse(errors[0]['messageParams'][0]);
                }catch (e){
                    params = {params: errors[0]['messageParams'][0]}
                }
            }
        }
        return params;
    }

    function handleCallBackAction(response, action, callback, message, isFailure ) {
        let isError;
        if(isFailure){
            if (message && message.error){
                action.callError = message.error;
            }else if(args.hideErrorMessage !==true ){
                if( typeof args.hideErrorMessage === 'function') {
                    isError = args.hideErrorMessage(response);
                } else {
                    isError= args.hideErrorMessage;
                }
                if(isError !== true){
                    action.callError = getErrorsCode(response.error);
                    action.params = getErrorsParams(response.error);
                }
            }
        }else if(message && message.success){
            action.callSuccess= message.success;
        }

        next(actionWith(action));

        if(callback) {
            callback(response);
        }
    }
    function dispatchCallBackAction(response,body,message,failureCallback,successCallback) {
        let type, isFailure, callback;
        if(response && response.error && response.error.length >0){
            type = failureType;
            isFailure = true;
            callback = failureCallback;
        } else {
            type = successType;
            isFailure = false;
            callback = successCallback;
        }

        const callBackAction ={
            response:response,
            parameters: body,
            type: type
        };

        handleCallBackAction(response,callBackAction, callback, message, isFailure );
    }
    function resetWindowContext() {
        if(window.opener){
            sessionStorage.removeItem('windowId');
            window.opener= null;
        }
    }
};

function callApi(endpoint, methods, jsonBody, queryParams) {
    let parameters =UrlBuilderParameters({method: methods},endpoint);
    if(jsonBody){
        parameters.body = JSON.stringify(jsonBody);
    }
    queryParams['local']='fr/en';
    let serviceUrl = buildServiceUrl(endpoint, queryParams);
    return fetch(serviceUrl, queryParams).then(
        function (response) {
            var contentType = response.headers.get('content-type');
            if(contentType && contentType.indexOf('application/json')!== -1){
                return response.json().then(function (json) { return Promise.resolve(json);  });
            }
            return response.json().then(
                function (json) {
                    return Promise.reject({
                            status: response.status,
                            url: response.url,
                            body: json
                    });
                });
        });
}

//todo:  buildServiceUrl; UrlBuilderParameters;

