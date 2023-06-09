const express = require('express');
const req = require('express/lib/request');
const fs = require("fs");
const multer = require('multer');
const path = require('path');
const nunjucks = require('nunjucks');
const router = express.Router();
const env = require('dotenv').config();
const app = express();

let id;
let name;

let max1;
let min1;
let avg1;


/** 포트번호 55555번 */
app.set('port', process.env.PORT || 55555); 
app.set('view engine', 'html'); 

app.use(express.static('views'))


nunjucks.configure('views', {
    autoescape: true,
    express: app
});

const max = [];
const min = [];
const average1 = [];

/** 250개의 배열을 25개로 잘라주는 배열 */
var arrchannel = [
    [[], [], [], [], []],
    [[], [], [], [], []],
    [[], [], [], [], []],
    [[], [], [], [], []],
    [[], [], [], [], []]
];

function TwoArray(rows, columns) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(columns)
    }
    return arr;
}
var arr = TwoArray(50, 5);

/**  파일 업로드 multer  */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });

/** 파일 제출 화면인 files.html을 화면에 뿌려준다. */
app.get('', (req, res, next) => {
    res.sendFile(__dirname + '/files.html');
})

/** 인풋 파일을 제출하고 url 주소값을 받아와서 그에 맞는 응답을 해주는 Post */
app.post('/as/line_graph', upload.single('user'), (req, res, next) => {
    try {
        // 파일 읽어오기
        let data = fs.readFileSync('inputFile.txt', 'utf8');

        //파일 가공, 숫자 데이터만 추출.
        let arr = data.match(/\d+/g);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == 1) {
                arr.splice(i, 1);
                i--;
            } else if (arr[i] == 2) {
                arr.splice(i, 1);
                i--;
            } else if (arr[i] == 3) {
                arr.splice(i, 1);
                i--;
            } else if (arr[i] == 4) {
                arr.splice(i, 1);
                i--;
            } else if (arr[i] == 5) {
                arr.splice(i, 1);
                i--;
            }
        }
        //25개씩 배열에 넣어줌.
        for (let j = 0; j < 10; j++) {
            let newArray = arr.slice(j * 25, j * 25 + 25);
            for (let i = 0; i < 25; i++) {
                if (i % 5 === 0) {
                    arrchannel[parseInt(i / 5)][0].push(newArray[i]);
                }
                if (i % 5 === 1) {
                    arrchannel[parseInt(i / 5)][1].push(newArray[i]);
                }
                if (i % 5 === 2) {
                    arrchannel[parseInt(i / 5)][2].push(newArray[i]);
                }
                if (i % 5 === 3) {
                    arrchannel[parseInt(i / 5)][3].push(newArray[i]);
                }
                if (i % 5 === 4) {
                    arrchannel[parseInt(i / 5)][4].push(newArray[i]);
                }
            }
        }

        //평균 최대 최소값을 구해주는 함수. id값에 따라 최대 최소 평균값을 max min average1에 각각 넣어줌.
        if (req.params.id == '0') {
            for (let i = 0; i < arrchannel.length; i++) {
                max1 = Math.max.apply(null, arrchannel[0][i]);
                min1 = Math.min.apply(null, arrchannel[0][i]);
                avg1 = average(arrchannel[0][i]);
                max.push(max1);
                min.push(min1);
                average1.push(avg1);
            }
        } else if (req.params.id == '1') {
            for (let i = 0; i < arrchannel.length; i++) {
                max1 = Math.max.apply(null, arrchannel[0][i]);
                min1 = Math.min.apply(null, arrchannel[0][i]);
                avg1 = average(arrchannel[0][i]);
                max.push(max1);
                min.push(min1);
                average1.push(avg1);
            }
        } else if (req.params.id == '2') {
            for (let i = 0; i < arrchannel.length; i++) {
                max1 = Math.max.apply(null, arrchannel[0][i]);
                min1 = Math.min.apply(null, arrchannel[0][i]);
                avg1 = average(arrchannel[0][i]);
                max.push(max1);
                min.push(min1);
                average1.push(avg1);
            }
        } else if (req.params.id == '3') {
            for (let i = 0; i < arrchannel.length; i++) {
                max1 = Math.max.apply(null, arrchannel[0][i]);
                min1 = Math.min.apply(null, arrchannel[0][i]);
                avg1 = average(arrchannel[0][i]);
                max.push(max1);
                min.push(min1);
                average1.push(avg1);
            }
        } else if (req.params.id == '4') {
            for (let i = 0; i < arrchannel.length; i++) {
                max1 = Math.max.apply(null, arrchannel[0][i]);
                min1 = Math.min.apply(null, arrchannel[0][i]);
                avg1 = average(arrchannel[0][i]);
                max.push(max1);
                min.push(min1);
                average1.push(avg1);
            }
        } else if (req.params.id == '5') {
            for (let i = 0; i < arrchannel.length; i++) {
                max1 = Math.max.apply(null, arrchannel[i][0]);
                min1 = Math.min.apply(null, arrchannel[i][0]);
                avg1 = average(arrchannel[i][0]);
                max.push(max1);
                min.push(min1);
                average1.push(avg1);
            }
        } else if (req.params.id == '6') {
            for (let i = 0; i < arrchannel.length; i++) {
                max1 = Math.max.apply(null, arrchannel[i][0]);
                min1 = Math.min.apply(null, arrchannel[i][0]);
                avg1 = average(arrchannel[i][0]);
                max.push(max1);
                min.push(min1);
                average1.push(avg1);
            }
        } else if (req.params.id == '7') {
            for (let i = 0; i < arrchannel.length; i++) {
                max1 = Math.max.apply(null, arrchannel[i][0]);
                min1 = Math.min.apply(null, arrchannel[i][0]);
                avg1 = average(arrchannel[i][0]);
                max.push(max1);
                min.push(min1);
                average1.push(avg1);
            }
        } else if (req.params.id == '8') {
            for (let i = 0; i < arrchannel.length; i++) {
                max1 = Math.max.apply(null, arrchannel[i][0]);
                min1 = Math.min.apply(null, arrchannel[i][0]);
                avg1 = average(arrchannel[i][0]);
                max.push(max1);
                min.push(min1);
                average1.push(avg1);
            }
        } else if (req.params.id == '9') {
            for (let i = 0; i < arrchannel.length; i++) {
                max1 = Math.max.apply(null, arrchannel[i][0]);
                min1 = Math.min.apply(null, arrchannel[i][0]);
                avg1 = average(arrchannel[i][0]);
                max.push(max1);
                min.push(min1);
                average1.push(avg1);
            }
        }

        //넌적스을 이용, line_graph.html에 값 전달.
        res.render('line_graph.html', { max: max, min: min, average1: average1, id: id });
    } catch (err) {
        console.log(err);
    }
});

/** 꺾은선 그래프 버튼을 누를 때의 onclick 이벤트 리스너의 url 주소값을 받아와서 그에 맞는 응답을 해주는 Get */
app.get('/as/line_graph', (req, res) => {
    id = req.params.id;
    name = req.params.name;
    console.log(id, name);
    max.splice(0);
    min.splice(0);
    average1.splice(0);
    if (req.params.id == '0') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[0][i]);
            min1 = Math.min.apply(null, arrchannel[0][i]);
            avg1 = average(arrchannel[0][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '1') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[1][i]);
            min1 = Math.min.apply(null, arrchannel[1][i]);
            avg1 = average(arrchannel[1][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '2') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[2][i]);
            min1 = Math.min.apply(null, arrchannel[2][i]);
            avg1 = average(arrchannel[2][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '3') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[3][i]);
            min1 = Math.min.apply(null, arrchannel[3][i]);
            avg1 = average(arrchannel[3][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '4') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[4][i]);
            min1 = Math.min.apply(null, arrchannel[4][i]);
            avg1 = average(arrchannel[4][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '5') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][0]);
            min1 = Math.min.apply(null, arrchannel[i][0]);
            avg1 = average(arrchannel[i][0]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '6') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][1]);
            min1 = Math.min.apply(null, arrchannel[i][1]);
            avg1 = average(arrchannel[i][1]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '7') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][2]);
            min1 = Math.min.apply(null, arrchannel[i][2]);
            avg1 = average(arrchannel[i][2]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '8') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][3]);
            min1 = Math.min.apply(null, arrchannel[i][3]);
            avg1 = average(arrchannel[i][3]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '9') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][4]);
            min1 = Math.min.apply(null, arrchannel[i][4]);
            avg1 = average(arrchannel[i][4]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    }
    res.render('line_graph.html', { max: max, min: min, average1: average1, id: req.params.id, name: req.params.name });
});

/** 원형 그래프 버튼을 누를 때의 onclick 이벤트 리스너의 url 주소값을 받아와서 그에 맞는 응답을 해주는 Get */
app.get('/as/circle_graph', (req, res) => {
    id = req.params.id;
    name = req.params.name;
    console.log(id, name);
    max.splice(0);
    min.splice(0);
    average1.splice(0);
    if (req.params.id == '0') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[0][i]);
            min1 = Math.min.apply(null, arrchannel[0][i]);
            avg1 = average(arrchannel[0][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '1') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[1][i]);
            min1 = Math.min.apply(null, arrchannel[1][i]);
            avg1 = average(arrchannel[1][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '2') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[2][i]);
            min1 = Math.min.apply(null, arrchannel[2][i]);
            avg1 = average(arrchannel[2][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '3') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[3][i]);
            min1 = Math.min.apply(null, arrchannel[3][i]);
            avg1 = average(arrchannel[3][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '4') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[4][i]);
            min1 = Math.min.apply(null, arrchannel[4][i]);
            avg1 = average(arrchannel[4][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '5') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][0]);
            min1 = Math.min.apply(null, arrchannel[i][0]);
            avg1 = average(arrchannel[i][0]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '6') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][1]);
            min1 = Math.min.apply(null, arrchannel[i][1]);
            avg1 = average(arrchannel[i][1]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '7') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][2]);
            min1 = Math.min.apply(null, arrchannel[i][2]);
            avg1 = average(arrchannel[i][2]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '8') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][3]);
            min1 = Math.min.apply(null, arrchannel[i][3]);
            avg1 = average(arrchannel[i][3]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '9') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][4]);
            min1 = Math.min.apply(null, arrchannel[i][4]);
            avg1 = average(arrchannel[i][4]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    }
    res.render('circle_graph.html', { max: max, min: min, average1: average1, id: req.params.id, name: req.params.name });
});

/** 각 버튼을 눌렀을 때의 onclick 이벤트 리스너의 url 주소값을 받아와서 그에 맞는 응답을 해주는 Get */ 
/** 꺾은선 그래프의 화면을 보여줌 */
app.get('/as/line_graph/:id/:name', (req, res) => {
    id = req.params.id;
    name = req.params.name;
    console.log(id, name);
    max.splice(0);
    min.splice(0);
    average1.splice(0);
    if (req.params.id == '0') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[0][i]);
            min1 = Math.min.apply(null, arrchannel[0][i]);
            avg1 = average(arrchannel[0][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '1') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[1][i]);
            min1 = Math.min.apply(null, arrchannel[1][i]);
            avg1 = average(arrchannel[1][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '2') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[2][i]);
            min1 = Math.min.apply(null, arrchannel[2][i]);
            avg1 = average(arrchannel[2][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '3') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[3][i]);
            min1 = Math.min.apply(null, arrchannel[3][i]);
            avg1 = average(arrchannel[3][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '4') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[4][i]);
            min1 = Math.min.apply(null, arrchannel[4][i]);
            avg1 = average(arrchannel[4][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '5') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][0]);
            min1 = Math.min.apply(null, arrchannel[i][0]);
            avg1 = average(arrchannel[i][0]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '6') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][1]);
            min1 = Math.min.apply(null, arrchannel[i][1]);
            avg1 = average(arrchannel[i][1]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '7') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][2]);
            min1 = Math.min.apply(null, arrchannel[i][2]);
            avg1 = average(arrchannel[i][2]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '8') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][3]);
            min1 = Math.min.apply(null, arrchannel[i][3]);
            avg1 = average(arrchannel[i][3]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '9') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][4]);
            min1 = Math.min.apply(null, arrchannel[i][4]);
            avg1 = average(arrchannel[i][4]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    }
    res.render('line_graph.html', { max: max, min: min, average1: average1, id: req.params.id, name: req.params.name });
});

/** 각 버튼을 눌렀을 때의 onclick 이벤트 리스너의 url 주소값을 받아와서 그에 맞는 응답을 해주는 Get */ 
/** 원형 그래프의 화면을 보여줌 */
app.get('/as/circle_graph/:id/:name', (req, res) => {
    id = req.params.id;
    name = req.params.name;
    console.log(id, name);
    max.splice(0);
    min.splice(0);
    average1.splice(0);
    if (req.params.id == '0') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[0][i]);
            min1 = Math.min.apply(null, arrchannel[0][i]);
            avg1 = average(arrchannel[0][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '1') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[1][i]);
            min1 = Math.min.apply(null, arrchannel[1][i]);
            avg1 = average(arrchannel[1][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '2') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[2][i]);
            min1 = Math.min.apply(null, arrchannel[2][i]);
            avg1 = average(arrchannel[2][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '3') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[3][i]);
            min1 = Math.min.apply(null, arrchannel[3][i]);
            avg1 = average(arrchannel[3][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '4') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[4][i]);
            min1 = Math.min.apply(null, arrchannel[4][i]);
            avg1 = average(arrchannel[4][i]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '5') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][0]);
            min1 = Math.min.apply(null, arrchannel[i][0]);
            avg1 = average(arrchannel[i][0]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '6') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][1]);
            min1 = Math.min.apply(null, arrchannel[i][1]);
            avg1 = average(arrchannel[i][1]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '7') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][2]);
            min1 = Math.min.apply(null, arrchannel[i][2]);
            avg1 = average(arrchannel[i][2]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '8') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][3]);
            min1 = Math.min.apply(null, arrchannel[i][3]);
            avg1 = average(arrchannel[i][3]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    } else if (req.params.id == '9') {
        for (let i = 0; i < arrchannel.length; i++) {
            max1 = Math.max.apply(null, arrchannel[i][4]);
            min1 = Math.min.apply(null, arrchannel[i][4]);
            avg1 = average(arrchannel[i][4]);
            max.push(max1);
            min.push(min1);
            average1.push(avg1);
        }
    }
    res.render('circle_graph.html', { max: max, min: min, average1: average1, id: req.params.id, name: req.params.name });
});

/** 평균을 구해주는 함수 */
function average(arrchannel) {
    let average = 0;
    let sum = 0;
    for (let i = 0; i < arrchannel.length; i++) {
        sum += parseInt(arrchannel[i]);
    }
    average = sum / arrchannel.length;
    return average;
}

/** 서버를 실행할 때, 이벤트 리스너 */
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 에서 대기 중');
});