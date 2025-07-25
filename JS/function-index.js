
/** @type {HTMLFormElement} */
const form = document.querySelector('#form');
const table = document.querySelector('#tableList').querySelector('tbody');

// xử lý thêm dữ HS
var add = ()=>{
    this.MaSV = document.querySelector('#MaSV');
    this.TenSV = document.querySelector('#TenSV');
    this.Email = document.querySelector('#Email');
    this.SDT = document.querySelector('#Number');
    this.Toan = document.querySelector('#Math');
    this.Ly = document.querySelector('#Physic');
    this.Hoa = document.querySelector('#Chemistry');

    let toan = parseFloat(Toan.value) || 0;
    let ly = parseFloat(Ly.value) || 0;
    let hoa = parseFloat(Hoa.value) || 0;

    let diemTB = ((toan+ly+hoa)/3).toFixed(1);
    let diem = parseFloat(diemTB);

    if(diemTB < 4)
        var mss = "Yếu";
    else if(diemTB < 7)
            var mss = "Trung bình";
        else if(diemTB < 8)
                var mss = "Khá"
            else var mss = "Giỏi"

    const row = table.insertRow();

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);
    const cell8 = row.insertCell(7);
    const cell9 = row.insertCell(8);
    const cell10 = row.insertCell(9);

    const input = document.createElement('input');
    input.className = 'checkbox';
    input.type = 'checkbox';

    cell1.appendChild(input);
    cell2.append(MaSV.value);
    cell3.append(TenSV.value);
    cell4.append(Email.value);
    cell5.append(SDT.value);
    cell6.append(toan);
    cell7.append(ly);
    cell8.append(hoa);
    cell9.append(diem);
    cell10.append(mss);
}

// xử lý sửa
var update = ()=>{
    const selected = document.querySelectorAll(".checkbox");

    selected.forEach((sl,index) =>{
        if(sl.checked){
            const td = sl.parentElement.parentElement.querySelectorAll('td');
            for(let i=1;i<td.length-2;i++){
                const input = document.createElement("input");
                input.type="text";
                input.style.width="60px";
                input.value=td[i].innerText;
                td[i].innerText = '';
                td[i].appendChild(input);
            }
        }
    });
}

// xử lý checkbox và xoá
var checkbox = ()=>{
    const selected = document.querySelectorAll(".checkbox");

    selected.forEach(sl =>{
        if(sl.checked)
            sl.parentElement.parentElement.remove();
    });
}

// add action to button
// check box

// thêm
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    if(!form.checkValidity()){
        return;
    }

    add();
    form.reset();
});

// xoá
document.querySelector('#delete').addEventListener('click',()=>{
    checkbox();
});

// sửa
document.querySelector('#update').addEventListener('click',()=>{
    console.log('test');
    update();
});