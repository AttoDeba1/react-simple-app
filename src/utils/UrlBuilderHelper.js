const UrlBuilderParameters= function(params, endpoint) {
    let headers= new Headers();
    headers.append('Accept', 'text/html, application/json, */*');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Methods', params.method);


};
export default UrlBuilderParameters;