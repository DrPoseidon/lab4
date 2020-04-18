            const btnCreate = document.querySelector('.btnCreateVertex');
            const btnOutMatrix = document.querySelector('.outMatrixs');
            const dataEntry = document.querySelector('.dataEntry');
            const td = document.querySelectorAll('td');
            const tableB = document.querySelector('.tableOfMatrixB');
            const vertexValue = document.querySelector('.vertexInput');
            const containerForG = document.querySelector('.container_for_G')
            const inputOfNum = document.querySelector('.inputOfNumbers')
            btnCreate.addEventListener('click', getValue);
            //btnCreate.addEventListener('click', test);
            function getValue() {
            dataEntry.textContent = ''
            tableB.textContent =''
            const valueOfInput = vertexValue.value;
            if (!valueOfInput) {
            alert('Поле пустое');
            return;
            }
            dataEntry.textContent = '';
            for (let i = valueOfInput; i > 0; i--) {
            dataEntry.insertAdjacentHTML('afterbegin',
            `
            <div class="first">
            <div>G<sup>-</sup>(${i}) </div>
            <input type="text" class="inputOfNumbers">
            </div>
            `
            )
            }
            btnOutMatrix.style.display = 'block';
            btnOutMatrix.addEventListener('click', test);
            }


            


            function test(){
            btnOutMatrix.style.display = 'none';
            let dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);
            let a = [];
            let sumOfArcs;
            for (let t = 0; t < dataOfInputs.length; t++) {
            a[t] = dataOfInputs[t].split(' ');
            }
            for (let el in a) {
            a[el] = a[el].map(parseFloat);
            a[el] = a[el].filter(Number);
            }
            //let a = [[],[0,6,8],[1,5],[1,4,5],[9],[7],[0,7,9],[9],[9],[]];
            //a = [[3],[1,5,7],[],[5,7],[3],[2,4],[3]]



            console.log(a);
            //a = [[2,5],[1,3],[],[3,7],[1,3,6],[1],[5,8,9],[6,10],[4],[6,8]]
            //a = [[2,7],[6],[2,6],[3],[1,4,8],[7],[],[7]]
            console.log('G-:',a);
            let Gm = [];
            for(let i = 0; i < a.length; i++){
            Gm.push([]);
            for(let j = 0; j < a.length; j++){
            Gm[i][j] = 0;
            }
            }
            let c = [];
            for(let i = 0; i < a.length; i++){
            c.push([]);
            }
            let Gp = [];
            for(let i = 0; i < a.length; i++){
            Gp.push([]);
            for(let j = 0; j < a.length; j++){
            Gp[i][j] = 0;
            }
            }


            for(let i = 0; i < a.length; i++){//преобразование множества G- в G+
            for(let j = 0; j < a[i].length; j++){
            for(let k = 0; k < a.length; k++){
            if(a[i][j] - 1 == k){
            c[k].push(i+1)
            }
            }
            }
            }

            for(let i = 0; i < c.length; i++){//преобразование множества G+ в матрицу смежности
            for(let j = 0; j < c[i].length+1; j++){
            for(let k = 0; k < Gp.length+1; k++){
            if(c[i][j] == k){
            Gp[i][k-1] = 1;
            }
            }
            }
            }
            console.log('G+:',c);
            console.log('Матрица смежности G+:',Gp);
            
            let not_null = [];
            for(let i = 0; i < Gp.length; i++){
                not_null.push([]);
                for(let j = 0; j < Gp[i].length; j++){
                    if(Gp[i][j] > 0){
                    not_null[i].push(j+1);
                    }
                }
            }
            console.log(not_null);//матрица смежности из G-, только без нулей

            let new_arr = [];
            let tmp_arr = [];
            let finish_arr = [];
       











for(let y = 0; y < not_null.length; y++){
    new_arr.push(not_null[y]);
            for(let x = 0; x < 20; x++){
                for(let i = 0; i < not_null.length; i++){
                    if(new_arr.flat().indexOf(i+1) != -1 ){
                    for(let j = 0; j < not_null[i].length; j++){
                        if(new_arr.flat().indexOf(not_null[i][j]) == -1 && not_null[i][j] != y + 1){
                            tmp_arr.push(not_null[i][j]);
                        }
                    }
                }
                }
                if(tmp_arr.length == 0){
                    break;
                }
                new_arr.push(tmp_arr);
                tmp_arr = [];
            }
            finish_arr.push(new_arr);
            new_arr = [];
            
}

console.log(finish_arr);//массив в в котором лежат массивы
//номер подстроки каждого массива - длина до определенной вершины

let G = [];
for(let i = 0; i < not_null.length; i++){
    G.push([]);
    for(let j = 0; j < not_null.length; j++){
        G[i][j] = 0;
    }
}

for(let i = 0; i < finish_arr.length; i++){
    value = 1;
    for(let j = 0; j < finish_arr[i].length; j++){
       for(let k = 0; k < finish_arr[i][j].length; k++){

        for(let t = 0; t < G.length; t++){
            if(finish_arr[i][j][k] == t+1){
                G[i][t] = value;
            }
        }
       }
       value++;
    }
}

for(let i = 0; i < G.length; i++){
    for(let j = 0; j < G[i].length; j++){
        if(G[i][j] == 0 && j != i){
            G[i][j] = 99;
        }
    }
}
for(let i = 0; i < G.length; i++){
    G[i].unshift(0);
}
G.unshift([]);
for(let i = 0; i < G.length; i++){
    for(let j = 0; j < G.length; j++){
        if(i == 0){
            G[i].push(0);
        }
    }
}
console.log(G)
outMatrixB(G)
            }

            /*function outMatrixB1(arr) {

                const fragment = document.createDocumentFragment();
                for (let i = 0; i < arr.length; i++) {
                    const tr = document.createElement('tr');
                    for (let c = 0; c < arr[i].length; c++) {
                                const td = document.createElement('td');
                                td.textContent = arr[i][c];
                                tr.appendChild(td);

                    }
                    fragment.appendChild(tr); 
                }
                tableB.textContent = '';
                tableB.appendChild(fragment);
            }*/






            function outMatrixB(arr) {

                const fragment = document.createDocumentFragment();
                for (let i = 0; i < arr.length; i++) {
                    const tr = document.createElement('tr');
                    for (let c = 0; c < arr[i].length; c++) {
                        if (i === 0) { 
                            const th = document.createElement('th');
                            if (c === 0) {
                                th.textContent = ' '; 
                            }
                            else {
                                th.textContent = c; 
                            }
                            tr.appendChild(th);
                        }
                        else { 
                            if (c == 0) { 
                                const th = document.createElement('th');
                                th.textContent = i;
                                tr.appendChild(th);
                            }
                            else {
                                const td = document.createElement('td');
                                td.textContent = arr[i][c];
                                tr.appendChild(td);
                                
                            }
                        }
                    }
                    fragment.appendChild(tr); 
                }
                tableB.textContent = '';
                tableB.appendChild(fragment);
            }