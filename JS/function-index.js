
/** @type {HTMLFormElement} */
const form = document.querySelector('#form');
const table = document.querySelector('#tableList').querySelector('tbody');

// --

var btnSave = ()=>{
    document.querySelector('#update').style.display='none';
    document.querySelector('#delete').style.display='none';

    document.querySelector('#save').style.display='block';
    document.querySelector('#cancel').style.display='block';
}

var btnCancel = ()=>{
    document.querySelector('#update').style.display='block';
    document.querySelector('#delete').style.display='block';

    document.querySelector('#save').style.display='none';
    document.querySelector('#cancel').style.display='none';
}

// --
// xử lý thêm dữ HS
var add = ()=>{
    constMaSV = document.querySelector('#MaSV');
    const TenSV = document.querySelector('#TenSV');
    const Email = document.querySelector('#Email');
    const SDT = document.querySelector('#Number');
    const Toan = document.querySelector('#Math');
    const Ly = document.querySelector('#Physic');
    const Hoa = document.querySelector('#Chemistry');

    let toan = parseFloat(Toan.value) || 0.0;
    let ly = parseFloat(Ly.value) || 0.0;
    let hoa = parseFloat(Hoa.value) || 0.0;

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

var Values = [];
// xử lý sửa chuyển dữ liệu sang text
var update = ()=>{
    const selected = document.querySelectorAll(".checkbox");

    selected.forEach((sl,index) =>{
        if(sl.checked){
            const td = sl.parentElement.parentElement.querySelectorAll('td');
            for(let i=1;i<td.length-2;i++){
                Values[i - 1] = td[i].innerText;
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
};

//lưu
var save = () => {
    document.querySelectorAll(".checkbox").forEach(sl => {
        if (sl.checked) {
            const td = sl.parentElement.parentElement.querySelectorAll('td');

            var toanInput = td[5].querySelector('input');
            const lyInput = td[6].querySelector('input');
            const hoaInput = td[7].querySelector('input');

            if (!toanInput || !lyInput || !hoaInput) return;

            const toan = parseFloat(toanInput.value) || 0;
            const ly = parseFloat(lyInput.value) || 0;
            const hoa = parseFloat(hoaInput.value) || 0;

            const diemTB = ((toan + ly + hoa) / 3).toFixed(1);
            const diem = parseFloat(diemTB);

            let mss = "";
            if (diem < 4) mss = "Yếu";
            else if (diem < 7) mss = "Trung bình";
            else if (diem < 8) mss = "Khá";
            else mss = "Giỏi";

            td[8].innerText = diemTB;
            td[9].innerText = mss;

            [5, 6, 7].forEach(i => {
                td[i].innerText = td[i].querySelector('input').value;
            });
        }
    });
};
// huỷ
function cancel(){
    document.querySelectorAll(".checkbox").forEach(sl => {
        if (sl.checked) {
            const td = sl.parentElement.parentElement.querySelectorAll('td');
            for(let i =1; i < td.length ; i++){
                td[i].innerText = Values[i-1];
            }
        }
    });
}

// add action to button
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
    document.querySelectorAll(".checkbox").forEach(sl=>{
        if(sl.checked){
            update();
            btnSave();
        }
    });
});

//lưu
document.querySelector('#save').addEventListener('click',()=>{
    save();
    btnSave();
})

// huỷ
document.querySelector('#cancel').addEventListener('click',()=>{
    cancel();
    btnCancel();
})