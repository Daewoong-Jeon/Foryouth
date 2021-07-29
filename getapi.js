let today = new Date();
var today_date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/B552555/lhNoticeInfo/getNoticeInfo'; /*URL*/
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'QAhz0fVQ0EaHGSFwGEwVJSdulqxl0mvQ9kOoUrcZMUpvsWVTIHRFhAwsxzqCmKJwxjHtWEXwiAlCVTeP0KNgJQ%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('PG_SZ') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('PAGE') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('SCH_ST_DT') + '=' + encodeURIComponent('2020-01-01'); /**/
queryParams += '&' + encodeURIComponent('SCH_ED_DT') + '=' + encodeURIComponent(today_date); /**/
queryParams += '&' + encodeURIComponent('BBS_TL') + '=' + encodeURIComponent('청년'); /*결과*/
queryParams += '&' + encodeURIComponent('BBS_DTL_CTS') + '=' + encodeURIComponent(''); /*현황*/
queryParams += '&' + encodeURIComponent('UPP_AIS_TP_CD') + '=' + encodeURIComponent('13'); /**/
queryParams += '&' + encodeURIComponent('AIS_TP_CD') + '=' + encodeURIComponent(''); /**/
queryParams += '&' + encodeURIComponent('AIS_TP_CD_INT') + '=' + encodeURIComponent(''); /**/
queryParams += '&' + encodeURIComponent('AIS_TP_CD_INT2') + '=' + encodeURIComponent(''); /**/
queryParams += '&' + encodeURIComponent('AIS_TP_CD_INT3') + '=' + encodeURIComponent(''); /**/

xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        alert('Status: ' + this.status + 'nHeaders: ' + JSON.stringify(this.getAllResponseHeaders()) + 'nBody: ' + this.responseText);
        var myArray = this.responseText;
        console.log(this.responseText);
        console.log(myArray);
        buildTable(myArray);
    }
};

xhr.send('');
console.log(xhr);
console.log(xhr.response);

function buildTable(data) {
    var table = document.getElementById('table1');

    for (var i = 0; i < data[1].dsList[1].ALL_CNT; i++) {
        var row = `<tr>
                    <td>${i}</td>
                    <td>${data[1].dsList[i].BBS_WOU_DTTM}</td>
                    <td>${data[1].dsList[i].AIS_TP_CD_NM}</td>
                    <td>${data[1].dsList[i].BBS_TL}</td>
                    <td>${data[1].dsList[i].LINK_URL}</td>
                   </tr>`;
        table.innerHTML += row;
    }
}