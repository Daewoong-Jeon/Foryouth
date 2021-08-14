// 엄격한 js 문법검사
'use strict'
// 현재 날짜
let today = new Date();
var today_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

// 한 페이지에 출력할 최대 공지글 수
const num_get = 10;

// XMLHttpRequest 객체 생성
var xhr = new XMLHttpRequest();

var getApi = function (pageReq = 1) {
    // 요청보낼 서버의 url 작성
    var url = 'http://apis.data.go.kr/B552555/lhNoticeInfo/getNoticeInfo'; /*URL*/
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + 'QAhz0fVQ0EaHGSFwGEwVJSdulqxl0mvQ9kOoUrcZMUpvsWVTIHRFhAwsxzqCmKJwxjHtWEXwiAlCVTeP0KNgJQ%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('PG_SZ') + '=' + encodeURIComponent(num_get); /**/
    queryParams += '&' + encodeURIComponent('PAGE') + '=' + encodeURIComponent(pageReq); /**/
    queryParams += '&' + encodeURIComponent('SCH_ST_DT') + '=' + encodeURIComponent('2020-01-01'); /**/
    queryParams += '&' + encodeURIComponent('SCH_ED_DT') + '=' + encodeURIComponent(today_date); /**/
    queryParams += '&' + encodeURIComponent('BBS_TL') + '=' + encodeURIComponent('청년'); /*결과*/
    queryParams += '&' + encodeURIComponent('BBS_DTL_CTS') + '=' + encodeURIComponent(''); /*현황*/
    queryParams += '&' + encodeURIComponent('UPP_AIS_TP_CD') + '=' + encodeURIComponent('13'); /*유형*/
    queryParams += '&' + encodeURIComponent('AIS_TP_CD') + '=' + encodeURIComponent(''); /**/
    queryParams += '&' + encodeURIComponent('AIS_TP_CD_INT') + '=' + encodeURIComponent(''); /**/
    queryParams += '&' + encodeURIComponent('AIS_TP_CD_INT2') + '=' + encodeURIComponent(''); /**/
    queryParams += '&' + encodeURIComponent('AIS_TP_CD_INT3') + '=' + encodeURIComponent(''); /**/

    // 서버로 보낸 요청에 대한 응답을 받았을 때 수행할 함수
    xhr.onreadystatechange = function () {
        // 4 == XMLHttpRequest.DONE
        if (this.readyState == 4) {
            var myArray = this.responseText;
            if (this.responseText[0] == "s")
            {
                let tmp = myArray.substr(455, myArray.length);
                var obj = JSON.parse(tmp);
            }
            else
                var obj = JSON.parse(myArray);
            var allCnt = obj[1].dsList[0].ALL_CNT;
            buildTable(obj, pageReq, allCnt);
            renderPagination(pageReq, allCnt);
        }
    };

    // 서버에 요청 전송
    xhr.open('GET', url + queryParams);
    xhr.send('');
}

// 테이블 작성 함수
var buildTable = function (data, page, allCnt) {
    var table = document.getElementById('notice').querySelector('tbody');
    var pageCount;
    var row = ``;

    if (Math.ceil(allCnt / num_get) === page)
        pageCount = allCnt % num_get;
    else
        pageCount = num_get;

    for (var i = 0; i < pageCount; i++) {
        row += `<tr>
                <td>${(i + 1) + (10 * (page - 1))}</td>
                <td>${data[1].dsList[i].BBS_WOU_DTTM}</td>
                <td>${data[1].dsList[i].AIS_TP_CD_NM}</td>
                <td>${data[1].dsList[i].BBS_TL}</td>
                <td>${data[1].dsList[i].LINK_URL}</td>
               </tr>`;
    }
    table.innerHTML = row;
}

// page 버튼 갯수
var blockCount = 5;

var renderPagination = function(page, allCnt) {
    var totalPage = Math.ceil(allCnt / num_get);
    var totalBlock = Math.ceil(totalPage / blockCount);
    var pagination = document.getElementById('pagination');
    var block = Math.floor((page - 1) / blockCount) + 1;
    var startPage = ((block - 1) * blockCount) + 1;
    var endPage = ((startPage + blockCount - 1) > totalPage) ? totalPage : (startPage + blockCount - 1);

    var paginationHTML = '';

    if (page !== 1) paginationHTML += "<a style='cursor:pointer' class='first_page'>First...</a>";
    if (block !== 1) paginationHTML += "<a style='cursor:pointer' class='back_page'>Prev</a>";

    for (var index = startPage; index <= endPage; index++) {
        paginationHTML += (parseInt(page) === parseInt(index)) ? "| <a style='color:#ff8400'>" + index + 
        "</a> |" : "| <a style='cursor: pointer' class='go_page' data-value='" + index + "'>" + index + "</a> |";
    }

    if (block < totalBlock) paginationHTML += "<a style='cursor:pointer' class='next_page'>   Next</a>";
    if (page < totalPage) paginationHTML += "<a style='cursor:pointer' class='last_page'>  ...Last</a>";

    pagination.innerHTML = paginationHTML;
    addEventPagination(startPage, endPage, totalPage);
}

var addEventPagination = function(startPage, endPage, totalPage) {
    if (!!document.querySelector(".first_page")) {
        document.querySelector(".first_page").addEventListener('click', () => {
            getApi(1);
        });
    }

    if (!!document.querySelector(".back_page")) {
        document.querySelector(".back_page").addEventListener('click', () => {
            getApi(startPage - 1);
        });
    }

    document.querySelectorAll(".go_page").forEach(goPage => {
        goPage.addEventListener('click', e => {
            var tmp = parseInt(e.target.getAttribute('data-value'));
            getApi(tmp);
        });
    });

    if (!!document.querySelector(".next_page")) {
        document.querySelector(".next_page").addEventListener('click', () => {
            getApi(endPage + 1);
        });
    }

    if (!!document.querySelector(".last_page")) {
        document.querySelector(".last_page").addEventListener('click', () => {
            getApi(totalPage);
        });
    }
}

getApi();