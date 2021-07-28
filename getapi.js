var list = document.getElementById('list');
list.addEventListener('click', function(){
    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/B552555/lhNoticeInfo/getNoticeInfo'; /*URL*/
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'QAhz0fVQ0EaHGSFwGEwVJSdulqxl0mvQ9kOoUrcZMUpvsWVTIHRFhAwsxzqCmKJwxjHtWEXwiAlCVTeP0KNgJQ%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('PG_SZ') + '=' + encodeURIComponent('10'); /**/
    queryParams += '&' + encodeURIComponent('SCH_ST_DT') + '=' + encodeURIComponent('2019-01-03'); /**/
    queryParams += '&' + encodeURIComponent('SCH_ED_DT') + '=' + encodeURIComponent('2019-10-10'); /**/
    queryParams += '&' + encodeURIComponent('BBS_TL') + '=' + encodeURIComponent('결과'); /**/
    queryParams += '&' + encodeURIComponent('BBS_DTL_CTS') + '=' + encodeURIComponent('현황'); /**/
    queryParams += '&' + encodeURIComponent('UPP_AIS_TP_CD') + '=' + encodeURIComponent('01'); /**/
    queryParams += '&' + encodeURIComponent('AIS_TP_CD') + '=' + encodeURIComponent('02'); /**/
    queryParams += '&' + encodeURIComponent('AIS_TP_CD_INT') + '=' + encodeURIComponent('36'); /**/
    queryParams += '&' + encodeURIComponent('AIS_TP_CD_INT2') + '=' + encodeURIComponent('26'); /**/
    queryParams += '&' + encodeURIComponent('AIS_TP_CD_INT3') + '=' + encodeURIComponent('17'); /**/
    queryParams += '&' + encodeURIComponent('PAGE') + '=' + encodeURIComponent('1'); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            alert('Status: ' + this.status + 'nHeaders: ' + JSON.stringify(this.getAllResponseHeaders()) + 'nBody: ' + this.responseText);
        }
    };

    xhr.send('');
})