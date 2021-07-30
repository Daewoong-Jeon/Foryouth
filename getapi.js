// 엄격한 js 문법검사
'use strict'
// 현재 날짜
let today = new Date();
var today_date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
const num_get = 10;

// XMLHttpRequest 객체 생성
var xhr = new XMLHttpRequest();

// 요청보낼 서버의 url 작성
var url = 'http://apis.data.go.kr/B552555/lhNoticeInfo/getNoticeInfo'; /*URL*/
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'QAhz0fVQ0EaHGSFwGEwVJSdulqxl0mvQ9kOoUrcZMUpvsWVTIHRFhAwsxzqCmKJwxjHtWEXwiAlCVTeP0KNgJQ%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('PG_SZ') + '=' + encodeURIComponent(num_get); /**/
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

// 서버로 보낸 요청에 대한 응답을 받았을 때 수행할 함수
xhr.onreadystatechange = function () {
    // 4 == XMLHttpRequest.DONE
    if (this.readyState == 4) {
        var myArray = this.responseText;
        var obj = JSON.parse(myArray);
        buildTable(obj);
    }
};

// 서버에 요청 전송
xhr.open('GET', url + queryParams);
xhr.send('');

// 테이블 작성 함수
function buildTable(data) {
    var table = document.getElementById('table1');

    for (var i = 0; i < num_get; i++) {
        var row = `<tr>
                    <td>${i + 1}</td>
                    <td>${data[1].dsList[i].BBS_WOU_DTTM}</td>
                    <td>${data[1].dsList[i].AIS_TP_CD_NM}</td>
                    <td>${data[1].dsList[i].BBS_TL}</td>
                    <td>${data[1].dsList[i].LINK_URL}</td>
                   </tr>`;
        table.innerHTML += row;
    }
}